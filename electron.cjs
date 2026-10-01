const { app, BrowserWindow, ipcMain, shell } = require("electron");
const path = require("path");
try {
  require("dotenv").config();
} catch (e) {
  // Dotenv is optional in standalone packaged environment
}

let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 920,
    minWidth: 1100,
    minHeight: 720,
    title: "CYBER WARRIORS LEARNING ACADEMY",
    icon: path.join(__dirname, "icon.ico"),
    autoHideMenuBar: true,
    backgroundColor: "#020712",
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false
    }
  });

  // Open external links (YouTube, docs) in default browser
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('http:') || url.startsWith('https:')) {
      shell.openExternal(url);
      return { action: 'deny' };
    }
    return { action: 'allow' };
  });

  const devUrl = process.env.VITE_DEV_SERVER_URL;
  if (devUrl) {
    mainWindow.loadURL(devUrl);
  } else {
    mainWindow.loadFile(path.join(__dirname, "dist", "index.html"));
  }

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

// IPC handler to open external links reliably in OS default browser
ipcMain.on('open-external-url', (event, url) => {
  if (url && (url.startsWith('http:') || url.startsWith('https:') || url.startsWith('mailto:'))) {
    shell.openExternal(url);
  }
});

// IPC handler to fetch live RSS feeds without browser CORS restrictions
ipcMain.handle('fetch-rss-feed', async (event, feedUrl) => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 9000);
    const res = await fetch(feedUrl, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36',
        'Accept': 'application/rss+xml, application/xml, text/xml, application/atom+xml, */*'
      }
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      return { ok: false, error: `HTTP ${res.status}` };
    }
    const xml = await res.text();
    return { ok: true, xml };
  } catch (err) {
    return { ok: false, error: err.message || 'Fetch failed' };
  }
});

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
