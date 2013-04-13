var user = {
	isLoggedIn: function() {
		if (!(!isNaN(parseFloat(localStorage.userId)) && isFinite(localStorage.userId))) {
			return false;
		}
		return true;
	},

	currentUser: function() {
		if (user.isLoggedIn()) {
			return localStorage.userId;
		} else {
			return false;
		}
	},

	login: function(userdata) {
		localStorage.userId = userdata.id;
	},

	addListenersToForms: function() {
		var loginFrm = document.getElementById("loginForm");
		loginFrm.addEventListener("submit", function(e) {
			e.preventDefault();
			api.login(loginFrm, function(data) {
				if (data.ok) {
					user.login(data);
				} else {
					console.log("try again");
				}
			});
		});

		var registrationFrm = document.getElementById("registerForm");
		registrationFrm.addEventListener("submit", function(e) {
			e.preventDefault();
			api.register(registrationFrm, function(data) {
				if (data.ok) {
					user.login(data);
				} else {
					console.log("error. try again");
				}
			});
		});
	}
}