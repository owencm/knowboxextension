// all callbacks receive the JSON parsed data as the first argument
// and the XMLHttpRequest object as the second one: callback(data, req)

var api = {
	getQaItems: function(url, callback) {
		ajax.get("/qaitems/url/" + encodeURIComponent(url) , callback);
	},

	postQuestion: function(form, callback) {
		ajax.post("/qaitems/", ajax.paramStringFromForm(form), callback);
	},

	addAnswer: function(data, callback) {
		ajax.post("/users/qaitems/" + data.id + "/", ajax.paramString(data), callback);
	},

	login: function(form, callback) {
		ajax.post("/login/", ajax.paramStringFromForm(form), callback);
	},

	register: function(form, callback) {
		ajax.post("/register/", ajax.paramStringFromForm(form), callback);
	}
}

var ajax = {
	url: "http://kbx.local:8000",

	paramStringFromForm: function(obj) {
		var parameters = [];

		for ( var i = 0; i < obj.elements.length; i++ ) {
			var e = obj.elements[i];
			if (e && e.name && e.value)
				parameters.push(encodeURIComponent(e.name) + "=" + encodeURIComponent(e.value));
		}

		return parameters.join("&");
	},

	paramString: function(data) {
		var params = [];
		for (i in data) {
			params.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
		}
		return params.join("&");
	},

	get: function(url, callback) {
		url = ajax.url + url;
		var req = new XMLHttpRequest();
		req.onload = function() {
			try {
				var data = JSON.parse(this.responseText);
				callback(data, this);
			} catch (e) {
			}
		};
		req.open("GET", url, true);
		req.send();
	},

	post: function(url, paramString, callback) {
		url = ajax.url + url;

		var req = new XMLHttpRequest();
		req.onload = function() {
			try {
				var data = JSON.parse(this.responseText);
				callback(data, this);
			} catch(e) {
			}
		}

		req.open("POST", url, true);
		req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

		req.send(paramString);
	}
}


