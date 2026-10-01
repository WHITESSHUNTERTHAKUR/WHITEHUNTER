// External URL launcher utility with Electron IPC & browser fallback
export function openExternalUrl(url) {
  if (!url) return;
  
  try {
    if (window.electronAPI && typeof window.electronAPI.openExternal === 'function') {
      window.electronAPI.openExternal(url);
      return;
    }
  } catch (e) {
    console.warn('Electron IPC bridge error:', e);
  }

  // Fallback for standard browser
  try {
    const opened = window.open(url, '_blank', 'noopener,noreferrer');
    if (!opened || opened.closed || typeof opened.closed === 'undefined') {
      // If popup blocker intervened, create a temporary anchor element
      const a = document.createElement('a');
      a.href = url;
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  } catch (err) {
    console.error('Failed to open external url:', err);
  }
}
