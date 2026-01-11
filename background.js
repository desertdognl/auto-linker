chrome.action.onClicked.addListener(() => {
  const optionsUrl = chrome.runtime.getURL('options.html');

  function openPopupWindow(url) {
    // Try to focus an existing options tab first
    chrome.tabs.query({}, (tabs) => {
      for (const t of tabs) {
        if (t && t.url && t.url.startsWith(url)) {
          chrome.windows.update(t.windowId, { focused: true });
          chrome.tabs.update(t.id, { active: true });
          return;
        }
      }
      // Create a popup window as a fallback
      chrome.windows.create({ url, type: 'popup', width: 1400, height: 700 }, (w) => {
        if (w && w.id) chrome.windows.update(w.id, { focused: true });
      });
    });
  }

  // Prefer a browser-managed popup (Arc opens this in a closable popup).
  if (chrome.action && typeof chrome.action.openPopup === 'function') {
    chrome.action.openPopup().catch(() => {
      openPopupWindow(optionsUrl);
    });
    return;
  }

  // If openPopup isn't available, fall back to a popup window.
  openPopupWindow(optionsUrl);
});