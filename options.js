const saveOptions = () => {
  const openNewWindow = document.getElementById('openNewWindow').checked;
  const enabledSites = document.getElementById('enabledSites').value;

  chrome.storage.sync.set({ openNewWindow, enabledSites }, () => {
    const status = document.getElementById('status');
    status.textContent = 'Settings saved!';
    setTimeout(() => { status.textContent = ''; }, 1500);
  });
};

const restoreOptions = () => {
  chrome.storage.sync.get({ openNewWindow: true, enabledSites: '' }, (items) => {
    document.getElementById('openNewWindow').checked = items.openNewWindow;
    document.getElementById('enabledSites').value = items.enabledSites;
  });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);