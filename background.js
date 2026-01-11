chrome.action.onClicked.addListener(() => {
  const optionsUrl = chrome.runtime.getURL('options.html');

  // Try to find an existing options tab and focus it; otherwise open in a new tab.
  chrome.tabs.query({}, (tabs) => {
    for (const t of tabs) {
      if (t && t.url && t.url.startsWith(optionsUrl)) {
        chrome.windows.update(t.windowId, { focused: true });
        chrome.tabs.update(t.id, { active: true });
        return;
      }
    }

    chrome.tabs.create({ url: optionsUrl, active: true }, (tab) => {
      if (tab && tab.windowId) chrome.windows.update(tab.windowId, { focused: true });
    });
  });
});