document.addEventListener('DOMContentLoaded', function() {
    // Function to get the current URL
    function getCurrentTabUrl(callback) {
        // Query the active tab
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            // Get the URL of the active tab
            var url = tabs[0].url;
            callback(url);
        });
    }

    // Function to handle the "Add current website" button click
    function addCurrentWebsite(url) {
        // Get the blockList container
        var blockList = document.getElementById('blockList');

        // Create a new websiteItem div
        var websiteItem = document.createElement('div');
        websiteItem.className = 'websiteItem';

        // Create a paragraph element for the website name
        var websiteItemName = document.createElement('p');
        websiteItemName.className = 'websiteItemName';
        websiteItemName.textContent = url;

        // Create an input element for the remove button
        var websiteItemSwitch = document.createElement('input');
        websiteItemSwitch.className = 'websiteItemSwitch';
        websiteItemSwitch.type = 'button';
        websiteItemSwitch.value = 'X';

        // Add click event listener to the remove button
        websiteItemSwitch.addEventListener('click', function() {
            // Remove the websiteItem div from the blockList container
            blockList.removeChild(websiteItem);

            // Remove the URL from storage
            chrome.storage.sync.get({ blockedWebsites: [] }, function(data) {
                var blockedWebsites = data.blockedWebsites;
                var index = blockedWebsites.indexOf(url);
                if (index !== -1) {
                    blockedWebsites.splice(index, 1);
                    chrome.storage.sync.set({ blockedWebsites: blockedWebsites });
                }
            });
        });

        // Append the elements to the websiteItem div
        websiteItem.appendChild(websiteItemName);
        websiteItem.appendChild(websiteItemSwitch);

        // Append the websiteItem div to the blockList container
        blockList.appendChild(websiteItem);
    }

    // Function to restore blocked websites from storage
    function restoreBlockedWebsites() {
        chrome.storage.sync.get({ blockedWebsites: [] }, function(data) {
            var blockedWebsites = data.blockedWebsites;
            for (var i = 0; i < blockedWebsites.length; i++) {
                addCurrentWebsite(blockedWebsites[i]);
            }
        });
    }

    // Add click event listener to the "Add current website" button
    var addWebsiteButton = document.getElementById('addWebsite');
    addWebsiteButton.addEventListener('click', function() {
        getCurrentTabUrl(function(url) {
            addCurrentWebsite(url);

            // Save the URL to storage
            chrome.storage.sync.get({ blockedWebsites: [] }, function(data) {
                var blockedWebsites = data.blockedWebsites;
                blockedWebsites.push(url);
                chrome.storage.sync.set({ blockedWebsites: blockedWebsites });
            });
        });
    });

    // Restore blocked websites when the extension is opened
    restoreBlockedWebsites();
});