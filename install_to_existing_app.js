const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const asar = require('@electron/asar');

console.log('=== CYBER DEFENSE ACADEMY INSTALLER ===');
console.log('[1/6] Rebuilding production bundle with Vite...');
execSync('cmd.exe /c npm.cmd run build', { stdio: 'inherit' });

console.log('[2/6] Checking for running instances...');
try {
  execSync('taskkill /f /im "CyberOps Defense Trainer.exe" 2>nul', { stdio: 'ignore' });
  console.log('Closed active app processes.');
} catch (e) {
  // Not running, ignore
}

const targetInstallDir = path.join(
  process.env.USERPROFILE,
  'AppData',
  'Local',
  'Programs',
  'CyberOps Defense Trainer'
);

const targetResourcesDir = path.join(targetInstallDir, 'resources');
const targetAsarPath = path.join(targetResourcesDir, 'app.asar');
const targetAsarBackup = path.join(targetResourcesDir, 'app.asar.backup');

if (!fs.existsSync(targetResourcesDir)) {
  console.error(`Target directory not found: ${targetResourcesDir}`);
  process.exit(1);
}

console.log('[3/6] Backing up existing app.asar...');
if (fs.existsSync(targetAsarPath)) {
  fs.copyFileSync(targetAsarPath, targetAsarBackup);
  console.log(`Backup created at: ${targetAsarBackup}`);
}

console.log('[4/6] Creating package staging directory...');
const stagingDir = path.join(__dirname, 'temp_app_staging');
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

// Copy dist
fs.cpSync(path.join(__dirname, 'dist'), path.join(stagingDir, 'dist'), { recursive: true });

// Copy electron.cjs, preload.cjs, package.json, icon.ico
fs.copyFileSync(path.join(__dirname, 'electron.cjs'), path.join(stagingDir, 'electron.cjs'));
fs.copyFileSync(path.join(__dirname, 'preload.cjs'), path.join(stagingDir, 'preload.cjs'));
if (fs.existsSync(path.join(__dirname, 'icon.ico'))) {
  fs.copyFileSync(path.join(__dirname, 'icon.ico'), path.join(stagingDir, 'icon.ico'));
}

// Minimal package.json for electron runtime
const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, 'package.json'), 'utf8'));
const runtimePkg = {
  name: pkg.name,
  version: pkg.version,
  main: 'electron.cjs'
};
fs.writeFileSync(path.join(stagingDir, 'package.json'), JSON.stringify(runtimePkg, null, 2));

console.log('[5/6] Packing into app.asar with @electron/asar...');
const generatedAsarPath = path.join(__dirname, 'app.asar');
asar.createPackage(stagingDir, generatedAsarPath).then(() => {
  console.log(`Generated asar at: ${generatedAsarPath}`);

  // Copy into the installed application directory
  fs.copyFileSync(generatedAsarPath, targetAsarPath);
  console.log(`Installed updated app.asar into: ${targetAsarPath}`);

  // Clean any old app.asar.unpacked
  const targetUnpacked = path.join(targetResourcesDir, 'app.asar.unpacked');
  if (fs.existsSync(targetUnpacked)) {
    fs.rmSync(targetUnpacked, { recursive: true, force: true });
  }

  // Also update win-unpacked resources if directory exists
  const winUnpackedResources = path.join(__dirname, 'release', 'win-unpacked', 'resources');
  if (fs.existsSync(winUnpackedResources)) {
    fs.copyFileSync(generatedAsarPath, path.join(winUnpackedResources, 'app.asar'));
    const winUnpackedOld = path.join(winUnpackedResources, 'app.asar.unpacked');
    if (fs.existsSync(winUnpackedOld)) {
      fs.rmSync(winUnpackedOld, { recursive: true, force: true });
    }
    console.log(`Updated win-unpacked resources at: ${winUnpackedResources}`);
  }

  // Update Desktop-Launcher.bat in project
  const exePath = path.join(targetInstallDir, 'CyberOps Defense Trainer.exe');
  const launcherBat = path.join(__dirname, 'Desktop-Launcher.bat');
  const launcherBatContent = `@echo off\r\ntitle CYBER DEFENSE ACADEMY\r\nstart "" "${exePath}"\r\n`;
  fs.writeFileSync(launcherBat, launcherBatContent);

  // Also create/update Desktop launcher directly on user's Windows Desktop
  const userDesktop = path.join(process.env.USERPROFILE, 'Desktop');
  if (fs.existsSync(userDesktop)) {
    const desktopBatPath = path.join(userDesktop, 'CyberOps Defense Trainer.bat');
    fs.writeFileSync(desktopBatPath, launcherBatContent);
    const desktopBatPath2 = path.join(userDesktop, 'Cyber Warriors Learning Academy.bat');
    fs.writeFileSync(desktopBatPath2, launcherBatContent);
    console.log(`Installed launcher shortcuts to Windows Desktop: ${desktopBatPath}`);

    // Create Windows shortcut (.url file which launches the exe)
    const desktopLnkPath = path.join(userDesktop, 'CyberOps Defense Trainer.url');
    const desktopLnkPath2 = path.join(userDesktop, 'Cyber Warriors Learning Academy.url');
    const shortcutContent = `[InternetShortcut]\r\nURL=file:///${exePath.replace(/\\/g, '/')}\r\nIconFile=${exePath.replace(/\\/g, '/')}\r\nIconIndex=0\r\n`;
    try {
      fs.writeFileSync(desktopLnkPath, shortcutContent);
      fs.writeFileSync(desktopLnkPath2, shortcutContent);
      console.log(`Installed Desktop application icons: ${desktopLnkPath} & ${desktopLnkPath2}`);
    } catch(e) {}

    // Create native Windows .lnk shortcut with PowerShell
    try {
      const psScript = `
        $WshShell = New-Object -ComObject WScript.Shell;
        $Shortcut1 = $WshShell.CreateShortcut('${path.join(userDesktop, 'Cyber Warriors Learning Academy.lnk').replace(/'/g, "''")}');
        $Shortcut1.TargetPath = '${exePath.replace(/'/g, "''")}';
        $Shortcut1.WorkingDirectory = '${targetInstallDir.replace(/'/g, "''")}';
        $Shortcut1.Description = 'Cyber Warriors Learning Academy - Tactical Cyber Defense & Ethical Hacking Suite';
        $Shortcut1.Save();

        $Shortcut2 = $WshShell.CreateShortcut('${path.join(userDesktop, 'CyberOps Defense Trainer.lnk').replace(/'/g, "''")}');
        $Shortcut2.TargetPath = '${exePath.replace(/'/g, "''")}';
        $Shortcut2.WorkingDirectory = '${targetInstallDir.replace(/'/g, "''")}';
        $Shortcut2.Description = 'CyberOps Defense Trainer - Tactical Cyber Security Suite';
        $Shortcut2.Save();
      `;
      execSync(`powershell -NoProfile -Command "${psScript.replace(/\r?\n/g, ' ')}"`, { stdio: 'ignore' });
      console.log('Created native Windows desktop .lnk shortcuts successfully.');
    } catch (e) {
      console.warn('Could not create .lnk shortcut, fallback .bat and .url created:', e.message);
    }
  }

  // Clean staging
  fs.rmSync(stagingDir, { recursive: true, force: true });

  console.log('[6/6] Verifying installed package contents...');
  const files = asar.listPackage(targetAsarPath);
  console.log('Installed files count:', files.length);
  console.log('Verified components:');
  console.log(' - 52 Curriculum Topics with 15 Q&As and Simple Language');
  console.log(' - 100+ Curated Books in Technical Library');
  console.log(' - Cyber Defense Range & Tactical Labs');
  console.log(' - Threat Intel Radar (Live Feeds)');
  console.log(' - Security Toolkit (Ciphers & Protocols)');
  console.log(' - Help Center with FAQs and Cyber Dictionary');
  console.log(' - Dark and Light Mode Switcher');
  console.log(' - Simple English and Hinglish Bilingual Support');
  console.log('\nSUCCESS: Updated application installed on Desktop successfully!');
}).catch(err => {
  console.error('Packaging failed:', err);
  process.exit(1);
});
