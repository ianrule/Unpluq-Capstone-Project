// pulled from Biswas's background.js file

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url && (tab.url.includes("facebook.com") ||
        tab.url.includes("tiktok.com") || tab.url.includes("instagram.com"))) {
      chrome.tabs.update(tabId, {muted: true});
    }
});