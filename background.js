function update_icon() {
    chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT}, function(tabs){
    	var tab = tabs[0];
        var url = tab.url;

        api.getQaItems(url, function(data) {
        	console.log("something", data.length);
        	if (data.length > 0) {
			    chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 230]});
			    chrome.browserAction.setBadgeText({text:data.length.toString()});
			} else {
				chrome.browserAction.setBadgeBackgroundColor({color:[190, 190, 190, 0]});
				chrome.browserAction.setBadgeText({text:""});
			}
        });
    });
}

//listen for new tab to be activated
chrome.tabs.onActivated.addListener(function(activeInfo) {
    update_icon();
});

//listen for current tab to be changed
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    update_icon();
});