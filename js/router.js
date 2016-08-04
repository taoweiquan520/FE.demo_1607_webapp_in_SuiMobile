/*
 * 路由方法集合
 *
 */
(function(window, $, undefined) {

	// ---------- rot codeBlock ---------
	var rot = {
		back: function() {
			$.router.back();
			setPage.init();
		},
		page: function() {
			$.router.load("page.html");
			getData.map("1000");
		},
		
		setting_page: function() {
			$.router.load("#settingPage",true);
			getData.show_cache();
		},
		user_logout: function() {
			$.toast('正在登出...',1000);
			setTimeout(function() {
				loginStatus.logout();
			}, 1000);
		},

		user_info: function() {
			$.router.load("user_info.html", true);
			getShopInfo.my_info();
		},
		reseting_tel: function() {
			$.router.load("reseting_tel.html", true);
			// getShopInfo.my_info();
		},
		reseting_pwd: function() {
			$.router.load("reseting_pwd.html", true);
			// getShopInfo.my_info();
		},
		editing_contacter: function() {
			$.router.load('#editContacterPage', true);
		},
		editing_tel: function() {
			$.router.load('#editTelPage', true);
		},
		binding_email: function() {
			$.router.load('#bindEmailPage', true);
		},

		tobesended_orders: function() {
			$.router.load("my_orders.html");
			pageEffects.tab_toggle('#tobesendedOrders');
			$(document).ready(function() {
				ordersData.my_orders();
			})
		},
		sended_orders: function() {
			$.router.load("my_orders.html");
			pageEffects.tab_toggle('#sendedOrders');
			$(document).ready(function() {
				ordersData.my_orders();
			})
		},
		my_orders: function() {
			$.router.load("my_orders.html");
			pageEffects.tab_toggle('#allOrders');
			$(document).ready(function() {
				ordersData.my_orders();
			})
		},
		order_details: function(orderId) {
			/* 使用外部html页面会导致在webkit内核下，setPage中的init后于back执行，从而导致订单页面下的内容显示为空 */
			/* 将订单详情内联写入到my_orders.html中 */
			//$.router.load('order_details.html');
			$.router.load('#orderDetails');
			ordersData.order_details(orderId);
		},
		confirm_deliver: function(orderId) {
			alert(orderId);
		},

		my_finance: function() {
			window.location.href = "my_finance.html";
		},

		my_clearance: function() {
			window.location.href = "my_clearance.html";
		},
		my_clearance_search: function() {
			clearanceData.clearance_search_list();
		},
		clearance_details: function(clearanceId) {
			$.router.load('clearance_details.html', true);
			clearanceData.clearance_details(clearanceId);
		},
		applying_clearance: function() {
			$.router.load('applying_clearance.html', true);
			financeData.finance_center();
			clearanceData.applying_clearance();
		}
	};

	window.rot = rot;

})(window, $);