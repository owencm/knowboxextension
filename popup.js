chrome.tabs.query({
    active: true,                              // Select active tabs
    windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
}, function(array_of_Tabs) {
    var tab = array_of_Tabs[0];
    var url = tab.url;
    
    var span = document.createElement('span');
    span.innerHTML = url;
    document.body.appendChild(span);

    document.getElementById("url").value = url;

    api.postQuestion({"hello": "world", "Foo": "bar", "blah": "bla"}, function(data, xml) {
    	console.log(data, xml);
    });
});