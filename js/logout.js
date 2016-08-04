/*退出*/
(function(window, $, undefined) {
	var loginStatus = {
		logout: function() {
			app_show_login_f('login_callback_f');
		},
		check_login: function(data) {
			var result    = data.result,
            	errorCode = parseInt(data.errorCode);

	        if (result == 'faild') {
	            $.toast(data.message);
	            if (errorCode <= 20) {
	            	loginStatus.logout();
	            	setTimeout(function() {
	            		window.location.href = 'login.html';
	            	}, 1000);
	            }
	        }
		}
	}

	function login_callback_f(data) {};
	
	window.loginStatus = loginStatus;
	
})(window, $)

// function login_callback_f(data){}

// $('#logoutBtn').on('click', function() {
// 	app_show_login_f("login_callback_f");
// })