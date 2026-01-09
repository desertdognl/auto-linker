chrome.storage.sync.get(['enabledSites', 'openNewWindow'], (prefs) => {
  const currentHost = window.location.hostname;
  const sites = prefs.enabledSites ? prefs.enabledSites.split('\n').map(s => s.trim()) : [];

  // Only run if the current site is in the user's list
  if (sites.some(site => currentHost.includes(site))) {
    linkify(document.body);
  }

  function linkify(element) {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    
    // Iterate through text nodes to avoid breaking existing HTML tags
    const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
    let node;
    const nodesToReplace = [];

    while (node = walker.nextNode()) {
      if (node.parentElement.tagName !== 'A' && node.parentElement.tagName !== 'SCRIPT' && node.parentElement.tagName !== 'STYLE') {
        if (urlRegex.test(node.nodeValue)) {
          nodesToReplace.push(node);
        }
      }
    }

    nodesToReplace.forEach(node => {
      const span = document.createElement('span');
      span.innerHTML = node.nodeValue.replace(urlRegex, (url) => {
        const target = prefs.openNewWindow ? 'target="_blank"' : '';
        return `<a href="${url}" ${target} style="color: #0000EE; text-decoration: underline;">${url}</a>`;
      });
      node.parentNode.replaceChild(span, node);
    });
  }
});