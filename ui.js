var ui = {
	switchToList: function() {
		document.getElementById('addform').style.display = "none";
		document.getElementById('list').style.display = "block";

		api.getQaItems(function(data) {
			ui.renderQaList(data);
		});
	},

	switchToAdd: function() {
		document.getElementById('list').style.display = "none";
		document.getElementById('addform').style.display = "block";
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

		var answerForm = document.createElement("form");
		var answerField = document.createElement("input");
		var answerStatus = document.createElement("div");

		answerStatus.style.display = "none";

		container.appendChild(answerStatus);

		answerField.type = "text";
		answerField.name = "answer";
		answerField.action = "/users/qaitems/" + obj.id + '/';

		answerForm.addEventListener("submit", function(e) {
			e.preventDefault();
			api.addAnswer(answerForm, function(data) {
				answerStatus.innerHTML = data.message;
				answerForm.style.display = "none";
				answerStatus.style.display = "block";
			});
		});

		answerForm.appendChild(answerField);
		container.appendChild(answerForm);

		DOMParent.appendChild(container);
	}
}