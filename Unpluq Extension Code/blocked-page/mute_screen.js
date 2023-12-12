// pulled from Biswas's background.js file
//everything in this file runs as soon as the extension is installed

//might not need this in the future
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url && (tab.url.includes("facebook.com") || tab.url.includes("youtube.com") ||
        tab.url.includes("tiktok.com") || tab.url.includes("instagram.com"))) {
      chrome.tabs.update(tabId, {muted: true});
    }
});
//Initializing chrome storage variable for checking if the extension should be blocking
chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.local.set({ isBlocking: false }, function() {
    console.log('IsBlocking was set to false.');
  });
});