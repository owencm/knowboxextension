window.addEventListener("load", function() {
    chrome.tabs.query({
        active: true,                              // Select active tabs
        windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
    }, function(array_of_Tabs) {
        var tab = array_of_Tabs[0];
        var url = tab.url;

        document.getElementById("url").value = url;

        var form = document.getElementById("addQaItemForm");
        form.addEventListener("submit", function(e) {
            e.preventDefault();
            api.postQuestion(form, function(data) {
                var list = document.getElementById('list');
                ui.renderQaItem(data, list);
                form.reset();
            });
        });

        user.addListenersToForms();

        if (user.isLoggedIn()) {
            ui.switchToNormal();
        } else {
            ui.switchToLogin();
        }
    });
});