window.addEventListener("load", function() {
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

        var form = document.getElementById("addQaItemForm");
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            api.postQuestion(form, function(data) {
                console.log(data);
            });
        });

        document.getElementById("lnkList").addEventListener("click", ui.switchToList);
        document.getElementById("lnkAdd").addEventListener("click", ui.switchToAdd);

        user.addListenersToForms();

        if (user.isLoggedIn()) {
            ui.switchToAdd();
        } else {
            ui.switchToLogin();
        }
    });
});