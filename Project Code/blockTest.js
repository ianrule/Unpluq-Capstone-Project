let blockedWebsites = [];

function addElement(myURL){
    var blockedWebsite = document.createElement('div');
    var blockedWebsiteP = document.createElement('p');
    var blockedWebsiteI = document.createElement('input');


    blockedWebsiteP.innerHTML = myURL.href;
    blockedWebsiteP.classList.add("websiteItemName");
    blockedWebsite.appendChild(blockedWebsiteP);

    blockedWebsiteI.type = "button";
    blockedWebsiteI.value = "X";
    blockedWebsiteI.classList.add("websiteItemSwitch");
    blockedWebsite.appendChild(blockedWebsiteI);

    blockedWebsite.classList.add("websiteItem");
    return blockedWebsite;
}

function loadData(){
    for(i in blockedWebsites){
        addElement(blockedWebsites[i]);
    }
}

function addToList(){
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        const currentWebsite = new URL(tabs[0].url).hostname;

        if (!blockedWebsites.includes(currentWebsite)) {
            blockedWebsites.push(currentWebsite);
            chrome.storage.sync.set({ blockedWebsites: blockedWebsites }, function () {
                // console.log(`${currentWebsite} has been added to the blocked list.`);
            });
            document.getElementById("blockList").appendChild(addElement(currentWebsite));
        }
    });
}

loadData(); //not sure why this isnt working rn
document.getElementById('addWebsite').addEventListener('click', addToList);