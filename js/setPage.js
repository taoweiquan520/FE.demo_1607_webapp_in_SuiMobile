/*
 * URLquery取值
 *
 */
(function(window,$,undefined){

// -------- setPage codeBlock ---------

	var setPage = {
		pathData : function(){
			var path,pathId,id,id2;
			path = window.location.pathname.split('/')[2];//页面的名称
			pathId = window.location.search.split("&");
			if(pathId[0]){
			id = pathId[0].split("=")[1];//查询id
			}
			if(pathId[1]){
			id2 = pathId[1].split("=")[1];//查询id2
			}
			return {path:path,id:id,id2:id2};
		},
        init : function (){
        	var pathData = new this.pathData();
            var path = pathData.path,
                pathId = pathData.id,
				pathId_extra = pathData.id2;
			// console.log("path = " + path);
			// console.log("pathId = " + pathId);
			// console.log("pathId_extra = " + pathId_extra);

			switch(path){
				case 'index.html' :
					$.init();
					getData.ShopInfo();
					ordersData.orders_count();
					break;
				case 'user_info.html' :
					$.init();
					getShopInfo.my_info();
					break;
				case 'my_orders.html' :
					$.init();
					ordersData.my_orders();
					break;
				case 'my_finance.html' :
					$.init();
					financeData.finance_center();
					break;
				case 'my_clearance.html' :
					$.init();
					clearanceData.clearance_list();
					break;
				case 'applying_clearance.html' :
					$.init();
					financeData.finance_center();
					clearanceData.applying_clearance();
					break;
				default :
					$.init();
			}
		}
	}
    window.setPage = setPage;
})(window,$);


