var ui = {

	switchToNormal: function() {
		document.getElementById('list').style.display = "block";
		document.getElementById('addform').style.display = "block";
		document.getElementById('login').style.display = "none";

		chrome.tabs.query({
		    active: true,                              // Select active tabs
		    windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
		}, function(array_of_Tabs) {
		    var tab = array_of_Tabs[0];
		    ui.setLoading();
		    api.getQaItems(tab.url, function(data) {
				ui.renderQaList(data);
				ui.stopLoading();
			});
		});
	},

	switchToLogin: function() {
		document.getElementById('list').style.display = "none";
		document.getElementById('addform').style.display = "none";
		document.getElementById('login').style.display = "block";
	},

	renderQaList: function(qaitems) {
		var list = document.getElementById("list");
		list.innerHTML = "";
		for (var i=0; i<qaitems.length; i++) {
			ui.renderQaItem(qaitems[i], list);
		}
	},

	renderQaItem: function(obj, DOMParent) {
		var container = document.createElement("div");
		container.className = "qaitem";
		
		var buttonsContainer = document.createElement("div");
		buttonsContainer.className = "qaBtnContainer";

		var contentContainer = document.createElement("div");
		contentContainer.className = "qaContentContainer";

		container.appendChild(buttonsContainer);
		container.appendChild(contentContainer);

		var question = document.createElement("div");
		question.className = "qaTitleQuestion";
		question.appendChild(document.createTextNode("Q: " + obj.question));
		contentContainer.appendChild(question);

		var answer = document.createElement("div");
		answer.className = "qaTitleAnswer";
		answer.appendChild(document.createTextNode("A: " + obj.answer));
		contentContainer.appendChild(answer);

		var actionBtn = document.createElement("a");
		actionBtn.className = obj.learning === true ? "qaUnlearn" : "qaLearn";
		actionBtn.addEventListener("click", function(e) {
			e.preventDefault();
			if (obj.learning) {
				api.forget(obj.id, function(data) {
					obj.learning = false;
					actionBtn.className = "qaLearn";
					actionBtn.innerHTML = "+";
					contentContainer.className = "qaContentContainer";
				});
			} else {
				api.learn(obj.id, function(data) {
					obj.learning = true;
					actionBtn.className = "qaUnlearn";
					actionBtn.innerHTML = "✓";
					contentContainer.className = "qaContentContainer added";
				});
			}
		});

		actionBtn.appendChild(document.createTextNode(obj.learning ? "✓" : "+"));
		if (obj.learning) {
			contentContainer.className = "qaContentContainer added";
		} else {
			contentContainer.className = "qaContentContainer";
		}
		actionBtn.href = "#";
		buttonsContainer.appendChild(actionBtn);

		DOMParent.insertBefore(container, DOMParent.firstChild);
	},

	setLoading: function() {
		document.body.style.background = "url(loading.gif) 25px 25px no-repeat";
	},

	stopLoading: function() {
		document.body.style.background = "#fff";
	}
}