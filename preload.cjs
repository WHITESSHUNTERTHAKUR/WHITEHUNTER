// Preload script for Cyber Warriors Defense Trainer
// Desktop bridge security initialization
const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  isElectron: true,
  openExternal: (url) => {
    if (url && (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:'))) {
      ipcRenderer.send('open-external-url', url);
    }
  },
  fetchRssFeed: (feedUrl) => {
    return ipcRenderer.invoke('fetch-rss-feed', feedUrl);
  }
});
