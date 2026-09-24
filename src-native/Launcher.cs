using System;
using System.Diagnostics;
using System.IO;
using System.Net;
using System.Threading;
using System.Windows.Forms;

namespace CyberOpsLauncher
{
    static class Program
    {
        [STAThread]
        static void Main()
        {
            try
            {
                string baseDir = AppDomain.CurrentDomain.BaseDirectory;
                string appUrl = "http://127.0.0.1:5174/";

                // 1. Check if server is already responding
                bool isRunning = IsServerOnline(appUrl);
                if (!isRunning)
                {
                    // Start server in background with hidden window
                    // Use production preview server if dist/ exists for ultra-stability without file-locking
                    string distDir = Path.Combine(baseDir, "dist");
                    string serverArgs = Directory.Exists(distDir)
                        ? "/c \"npx vite preview --port 5174 --host 127.0.0.1\""
                        : "/c \"npx vite --port 5174 --host 127.0.0.1\"";

                    ProcessStartInfo serverPsi = new ProcessStartInfo();
                    serverPsi.FileName = "cmd.exe";
                    serverPsi.Arguments = serverArgs;
                    serverPsi.WorkingDirectory = baseDir;
                    serverPsi.WindowStyle = ProcessWindowStyle.Hidden;
                    serverPsi.CreateNoWindow = true;
                    serverPsi.UseShellExecute = false;
                    Process.Start(serverPsi);

                    // Wait up to 6 seconds for server to respond
                    for (int i = 0; i < 20; i++)
                    {
                        Thread.Sleep(300);
                        if (IsServerOnline(appUrl)) break;
                    }
                }

                // 2. Locate Microsoft Edge or Google Chrome for clean borderless App Mode
                string edge64 = @"C:\Program Files\Microsoft\Edge\Application\msedge.exe";
                string edge32 = @"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe";
                string chrome64 = @"C:\Program Files\Google\Chrome\Application\chrome.exe";
                string chrome32 = @"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe";

                string targetBrowser = null;
                if (File.Exists(edge64)) targetBrowser = edge64;
                else if (File.Exists(edge32)) targetBrowser = edge32;
                else if (File.Exists(chrome64)) targetBrowser = chrome64;
                else if (File.Exists(chrome32)) targetBrowser = chrome32;

                if (targetBrowser != null)
                {
                    string dataDir = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.LocalApplicationData), "CyberOpsDesktopApp");
                    ProcessStartInfo appPsi = new ProcessStartInfo();
                    appPsi.FileName = targetBrowser;
                    appPsi.Arguments = string.Format("--app=\"{0}\" --window-size=1380,880 --user-data-dir=\"{1}\"", appUrl, dataDir);
                    Process.Start(appPsi);
                }
                else
                {
                    Process.Start(appUrl);
                }
            }
            catch (Exception ex)
            {
                MessageBox.Show("Error starting CYBEROPS Desktop: " + ex.Message, "CYBEROPS Launch Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        static bool IsServerOnline(string url)
        {
            try
            {
                HttpWebRequest req = (HttpWebRequest)WebRequest.Create(url);
                req.Timeout = 800;
                req.Method = "HEAD";
                using (HttpWebResponse resp = (HttpWebResponse)req.GetResponse())
                {
                    return (resp.StatusCode == HttpStatusCode.OK);
                }
            }
            catch
            {
                return false;
            }
        }
    }
}
