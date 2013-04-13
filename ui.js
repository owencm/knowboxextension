var ui = {
	switchToList: function() {
		document.getElementById('addform').style.display = "none";
		document.getElementById('list').style.display = "block";
		chrome.tabs.query({
		    active: true,                              // Select active tabs
		    windowId: chrome.windows.WINDOW_ID_CURRENT // In the current window
		}, function(array_of_Tabs) {
		    var tab = array_of_Tabs[0];
		    api.getQaItems(tab.url, function(data) {
				ui.renderQaList(data);
			});
		});
		document.getElementById('login').style.display = "none";
	},

	switchToAdd: function() {
		document.getElementById('list').style.display = "none";
		document.getElementById('addform').style.display = "block";
		document.getElementById('login').style.display = "none";
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
		var title = document.createElement("h2");
		title.appendChild(document.createTextNode(obj.question));
		container.appendChild(title);

		var answerStatus = document.createElement("div");
		var answerDiv = document.createElement("div");
		var answerShow = document.createElement("a");

		answerShow.appendChild(document.createTextNode("Show answer"));
		answerShow.href = "#";
		answerShow.addEventListener("click", function(e) {
			e.preventDefault();
			answerShow.style.display = "none";
			answerStatus.style.display = "block"
			answerStatus.innerHTML = "<strong>" + obj.answer + "</strong>";
			
			var answerButtons = document.createElement("aside");
			var answerRight = document.createElement("a");
			var answerWrong = document.createElement("a");

			answerRight.href = "#";
			answerWrong.href = "#";

			answerRight.appendChild(document.createTextNode("Right"));
			answerWrong.appendChild(document.createTextNode("Wrong"));

			answerRight.addEventListener("click", function(e) {
				e.preventDefault();
				api.addAnswer({"id": obj.id, "right": true}, function(data) {
					console.log("Success");
				});
			});

			answerWrong.addEventListener("click", function(e) {
				e.preventDefault();
				api.addAnswer({"id": obj.id, "right": true}, function(data) {
					console.log("Success");
				});
			});

			answerButtons.appendChild(answerRight);
			answerButtons.appendChild(answerWrong);

			answerStatus.appendChild(answerButtons);
		});

		answerStatus.style.display = "none";

		answerDiv.appendChild(answerStatus);
		answerDiv.appendChild(answerShow);
		container.appendChild(answerDiv);
		DOMParent.appendChild(container);
	}
}