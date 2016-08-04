/*====================
    业务js集合
====================*/
(function(window, $, undefined) {

    /*====================================
        index.html
    ====================================*/
    /* get shopInfo for index.html */
    var getData = {
        ShopInfo: function() {
            var ticket = window.location.search.split("?ticket=")[1];
            var s = ticket ? JSON.stringify({
                'ticket': ticket
            }) : '';
            $.showIndicator();
            Ajax.action('sayogi', 'ShopInfoShow', s, function(data) {
                $.hideIndicator();
                console.log(data);
                //if (!$.setError(data)) return;

                loginStatus.check_login(data);

                if (!data.obj) {
                    return
                }

                var info = data.obj;
                var su = data.SU,
                    imgUrl,
                    qcodeSrc = '/qrCode?className=com.powerbos.application.bos.model.Company&idValue=';

                imgUrl = info._photoId_url ? info._photoId_url : './public/img/avatar.GIF';
                qcodeSrc += su.companyId;
                $("#userAvatar img").attr("src", imgUrl);
                $("#shopName").text(info.name ? info.name : '未设置');
                $("#userName").text(info.linkMan ? info.linkMan : '未填写');
                $("#telNum").text(info.linkPhone ? info.linkPhone : '未填写');                
                $("#qrcodePopup #qrcodeImg img").attr('src', qcodeSrc);
            });
        },
        show_cache: function() {
        	showCache();
        },
        clear_cache: function() {
            /* 清理缓存 */
            app_clear_cache(clearCachecallback);
        }
    };
    
    var showCache = function() {
    	app_show_cache(showCachecallback);
    }

    /* index.html callback Functions */
    function showCachecallback(data) {
        var $cacheDOM = $('#cache'),
       	    result    = data.result,
       	    cacheSize = data.param.cacheSize;
        
        $cacheDOM.empty().append('<div class="preloader" style="margin-right:0.25rem"></div>');
        
        if (result == 'success') {
        	cacheSize = parseFloat(cacheSize/1024).toFixed(2);
        	setTimeout(function() {
        		$cacheDOM.empty().append(cacheSize + ' MB');
        	}, 1000);
        }
        else {
        	setTimeout(function() {
        		$cacheDom.empty().append('--');
        	}, 1000);
        }
    }

    function clearCachecallback(data) {
        $.hideIndicator();
    	var $cacheDOM = $('#cache'),
   		    result    = data.result;
    	
    	$.toast('清理中...', 1000);
    	if (result == 'success') {
    		setTimeout(function() {
    			$.toast('清理成功', 1000);
    			$cacheDOM.empty().text('0.00 MB');
    		}, 1000);
    	}
    	else {
    		setTimeout(function() {
    			$.toast('清理失败，请稍后再清理', 1000);
    		}, 1000);
    	}
    }


    /*====================================
        user_info.html
    ====================================*/
    /* get userInfo for user_info.html */
    var getShopInfo = {
        sendCode_mail:function(){
            var mail=$('#emailInput').val();
            if(!mail){$.toast('请输入邮箱号');return;}
            var s={'mail':mail}
            $.showIndicator();
            Ajax.action('console', 'UserBindingMailSendCode', JSON.stringify(s), function(data){
                    console.log(data)
                    $.hideIndicator();
                    var jsb = data;
                    if (!$.setError(jsb)) return;
                    if(data.obj.msgNum){$('#mail_msgNum').val(data.obj.msgNum)}
                    $.toast('已发送，请去邮箱查看');

                    $('#send_mail').attr('disabled',true);
                    $('#send_mail').css({color:"#bbb"});
                    var time=60;
                    var t=setInterval(function  () {
                        time--;
                        $('#send_mail').text(time+" 秒后重新获取");
                        if (time==0) {
                            clearInterval(t);
                            $('#send_mail').text("未收到？重新获取");    
                            $('#send_mail').css({color:"#f60"});
                            validCode=true;
                            $('#send_mail').attr("disabled",false);
                                
                                }
                            },1000);
                           
                })
        },
        sendCode_r:function(){
            var mobile=$('#mobile').val();
            if(!mobile){$.toast('请输入手机号');return;}
            var s={'mobile':mobile}
            $.showIndicator();
            Ajax.action('console', 'UserResetPwdByMobile', JSON.stringify(s), function(data){
                    console.log(data)
                    $.hideIndicator();
                    var jsb = data;
                if (!$.setError(jsb)) return;
                    if(data.obj.msgNum){$('#msgNum').val(data.obj.msgNum)}
                    
                    $('#send').attr('disabled',true);
                    $('#send').css({color:"#bbb"});
                    var time=60;
                    var t=setInterval(function  () {
                        time--;
                        $('#send').text(time+" 秒后重新获取");
                        if (time==0) {
                            clearInterval(t);
                            $('#send').text("未收到？重新获取");    
                            $('#send').css({color:"#f60"});
                            validCode=true;
                            $('#send').attr("disabled",false);
                                
                                }
                            },1000);
                            });
        },
        sendCode_m:function(){
            var mail=$('#mail').val();
            if(!mail){$.toast('请输入邮箱号');return;}
            var s={'mail':mail}
            $.showIndicator();
            Ajax.action('console', 'UserResetPwdByMail', JSON.stringify(s), function(data){
                    console.log(data)
                    $.hideIndicator();
                    var jsb = data;
                    if (!$.setError(jsb)) return;
                    if(data.obj.msgNum){$('#mail_msgNum').val(data.obj.msgNum)}
                    $.toast('已发送，请去邮箱查看');

                    $('#send_mail').attr('disabled',true);
                    $('#send_mail').css({color:"#bbb"});
                    var time=60;
                    var t=setInterval(function  () {
                        time--;
                        $('#send_mail').text(time+" 秒后重新获取");
                        if (time==0) {
                            clearInterval(t);
                            $('#send_mail').text("未收到？重新获取");    
                            $('#send_mail').css({color:"#f60"});
                            validCode=true;
                            $('#send_mail').attr("disabled",false);
                                
                                }
                            },1000);
                           
                })
        },
        change_tel:function(){
            var mail=$('#mail').val();
            // if(!mail){$.toast('请输入邮箱号');}
            var s={'mail':mail}
             Ajax.action('console', 'UserChangeMobileByMailUrl', JSON.stringify(s), function(data) {
                console.log(data);
                var jsb = data;
                if (!$.setError(jsb)) return;
                $.toast('发送成功')
             })

        },
        change_pwd_byTel:function(){
            var mobile=$('#mobile').val();
            var msgNum=$('#msgNum').val();
            var checkCode=$('#checkCode').val();
            var passWord=$('#byTel .pass_word').val().trim();
            var passWordAgain=$('#byTel .pass_word_again').val().trim();
            
            if(passWord!=passWordAgain){$.toast('两次输入的密码不一致');return;}
            var check={'mobile':mobile,'msgNum':msgNum,'checkCode':checkCode,'pwd':passWord}

            var s={'check':check}
             Ajax.action('console', 'UserResetPwd', JSON.stringify(s), function(data) {
                console.log(data);
                var jsb = data;
                if (!$.setError(jsb)) return;
                $.toast('重置成功');
                window.location.href = "login.html";

             })

        },
        change_pwd_byMail:function(){
            var mail=$('#mail').val();
            var msgNum=$('#mail_msgNum').val();
            var checkCode=$('#mail_checkCode').val();
            var passWord=$('#byEmail .pass_word').val().trim();
            var passWordAgain=$('#byEmail .pass_word_again').val().trim();
            
            if(passWord!=passWordAgain){$.toast('两次输入的密码不一致');return;}
            var check={'mail':mail,'msgNum':msgNum,'checkCode':checkCode,'pwd':passWord}

            var s={'check':check}
             Ajax.action('console', 'UserResetPwd', JSON.stringify(s), function(data) {
                console.log(data);
                var jsb = data;
                if (!$.setError(jsb)) return;
                $.toast('重置成功');
                window.location.href = "login.html";

             })

        },
        binding_mail:function(){
             var mail=$('#emailInput').val();
            var msgNum=$('#mail_msgNum').val();
            var checkCode=$('#mail_checkCode').val();
           
            var check={'mail':mail,'msgNum':msgNum,'checkCode':checkCode}

            var s={'check':check}
             Ajax.action('console', 'UserBindingMailSubmit', JSON.stringify(s), function(data) {
                console.log(data);
                var jsb = data;
                if (!$.setError(jsb)) return;
                $.toast('绑定成功');
                window.location.href = "user_info.html";

             })

        },
        my_info: function() {
            Ajax.action('sayogi', 'ShopInfoShow', '', function(data) {
                $.hideIndicator();
                console.log(data);

                loginStatus.check_login(data);

                var jsb = data,
                    info = jsb.obj;
                if (!$.setError(jsb)) return;

                var imgUrl = info._photoId_url ? info._photoId_url : './public/img/avatar.GIF';

                $('#avatarImg img').attr("src", imgUrl);

                $("#shopName").text(jsb.SU.companyName ? jsb.SU.companyName : '未设置');
                $("#shopAddress").text(info.address ? info.address : '未填写');
                $("#registerDate").text('--');

                $("#userName").text(info.linkMan ? info.linkMan : '未填写');
                $("#userTel").text(info.linkPhone ? info.linkPhone : '未填写');
                $("#userEmail").text(jsb.SU.mail ? jsb.SU.mail : '未填写');
            });
        },
        edit_contacter: function() {
            var contacter = $('#contacterInput').val();

            if (contacter == null || contacter == "") {
                $.toast("请输入联系人！");
            }
            else {
                var s = {
                        "obj": {
                            "linkMan": contacter
                        }
                    };
                Ajax.action('sayogi', 'ShopInfoSave', JSON.stringify(s), function(data) {
                    $('#userName').empty().text(contacter);
                    rot.back();
                });               
            }
        },
        edit_tel: function() {
            var telNumber = $('#telInput').val();

            if (telNumber == null || telNumber == "") {
                $.toast('请输入联系电话');
            }
            else {
                var s = {
                        "obj": {
                            "linkPhone": telNumber
                        }
                    };
                Ajax.action('sayogi', 'ShopInfoSave', JSON.stringify(s), function(data) {
                    $('#userTel').empty().text(telNumber);
                    rot.back();
                });
            }
        },
        edit_email: function() {
            // TODO
        }
    }


    /*====================================
        my_orders
    ====================================*/
    /* all_orders , tobesended_orders , sended_orders */
    /* 10——tobesended ， 20——sended */
    var ordersData = {
        my_orders: function() {
            $('#allOrders').empty();
            $('#tobesendedOrders').empty();
            $('#sendedOrders').empty();

            /* 采用无限滚动加载 */
            myOrdersInfiniteScroll();
        },
        orders_count: function() {
            var tobesendedStatus = {
                    'searchType': 10
                },
                sendedStatus = {
                    'searchType': 20
                };
            Ajax.action('scmMall', 'SupplyOrderFetch', JSON.stringify(tobesendedStatus), function(data) {
                $('#tobesendedCount').text(data.page.maxRecord);
            });
            Ajax.action('scmMall', 'SupplyOrderFetch', JSON.stringify(sendedStatus), function(data) {
                $('#sendedCount').text(data.page.maxRecord);
            });
            Ajax.action('scmMall', 'SupplyOrderFetch', '', function(data) {
                $('#allCount').text(data.page.maxRecord);
            });
        },
        order_details: function(orderId) {
            var viewOrderId = {
                    'id': orderId
                };
            Ajax.action('scmMall', 'SupplyOrderInfo', JSON.stringify(viewOrderId), viewOrderDetailscallback);
        }
    }

    /* my orders functions */
    var getOrderItemDOM = function(orderItem, itemStatus, statusDesc) {
        if (orderItem) {
            var orderItemDOM,
                orderHeader,
                orderContent,
                orderFooter,
                moreItems,
                //TODO
                mediaSrc    = './public/img/avatar.GIF',
                orderName   = '飞利浦xx车载xxxx',
                codeNum     = orderItem.codeNum ? orderItem.codeNum : '--',
                itemDescription = orderItem.itemDescription ? orderItem.itemDescription : '蓝色 5寸（测试）',
                price       = orderItem.itemList[0].price ? orderItem.itemList[0].price : '100',
                total       = orderItem.total ? orderItem.total : '100'

            /* order-header */
            orderHeader =   '<div class="order-header">' +
                                '<span class="order-number">订单编号：' + codeNum + '</span>' +
                                '<span class="order-status ' + itemStatus +'">' + statusDesc + '</span>' +
                            '</div>';

            /* order-content */
            if (orderItem.itemList.length == 1) {
                moreItems = '';
                orderContent =  '<div class="order-content">' +
                                    '<div class="order-media">' +
                                        '<img src="' + mediaSrc + '">' +
                                    '</div>' +
                                    '<div class="order-info">' +
                                        '<p class="info-title">' + orderItem.itemList[0].productName + '</p>' +
                                        '<p class="info-options">' + itemDescription + '</p>' +
                                        '<p class="info-amount">' +
                                            '<span class="per-price">¥' + price + '</span>' +
                                            '<span class="amount-num">×' + orderItem.itemList[0].orderNum + '</span>' +
                                        '</p>' +
                                    '</div>' +
                                '</div>';
            }
            else {
                var moreMedia = (orderItem.itemList.length == 2) ? '' : 'more-media';
                moreItems = 'more-items';
                orderContent =  '<div class="order-content">' +
                                    '<div class="order-media">' +
                                        '<img src="' + mediaSrc + '">' +
                                    '</div>' +
                                    '<div class="order-media ' + moreMedia + '">' +
                                        '<img src="' + mediaSrc + '">' +
                                    '</div>' +
                                    '<div class="order-info">' +
                                        '共' +
                                        '<span class="item-count">' + orderItem.itemList.length + '</span>' +
                                        '件' +
                                        '<i class="icon icon-right"></i>' +
                                    '</div>' +
                                '</div>';
            }

            /* order-footer */
            orderFooter =   '<div class="order-footer">' +
                                '<span class="total-price">合计：¥' + total + '</span>' +
                            '</div>';

            /* order-item */
            orderItemDOM =  '<div class="order-item ' + moreItems + '" id="' + orderItem.orderId + '" onclick="rot.order_details(' + '\'' + orderItem.orderId + '\'' + ')">' +
                                orderHeader + orderContent + orderFooter +
                            '</div>';
        }
        else {
            orderItemDOM = '<div class="nomore-item"></div>';
        }
        
        return orderItemDOM;
     }

    var orderStatusCheck = function(statusVal) {
        var statusClass,
            statusDesc;

        switch (statusVal) {
            case '10' :
                statusClass = 'status-tobesended';
                statusDesc  = '未发货';
                break;
            case '20' :
                statusClass = 'status-sended';
                statusDesc  = '待收货';
                break;
            case '30' :
                statusClass = 'status-tobefeedbacked';
                statusDesc  = '待评价';
                break;
            case '40' :
                statusClass = 'status-feedbacked';
                statusDesc  = '已评价';
                break;
            case '50' :
                statusClass = 'status-toberefunded';
                statusDesc  = '退货中';
                break;
            case '60' :
                statusClass = 'status-refunded';
                statusDesc  = '退货完成';
                break;
            default :
                statusClass = '';
                statusDesc  = '未设置';
        }

        return [statusClass, statusDesc];
     }

    var allOrdersListmap = function(list, maxRecordCount) {
        var allCount      = 0,
            allOrdersList = [];

        if (maxRecordCount) {
            allCount = list ? list.length : 0;
            for (var i = 0; i < allCount; i ++) {
                var orderStatus = orderStatusCheck(list[i].status)[0],
                    statusDesc  = orderStatusCheck(list[i].status)[1],
                    orderItem;

                orderItem = getOrderItemDOM(list[i], orderStatus, statusDesc);

                allOrdersList.push(orderItem);
            }
        }
        else {
            allOrdersList = ['<div class="no-item"></div>'];
            allCount = 0;
        }
        
        return [allOrdersList, allCount];
    };

    var tobesendedOrdersListmap = function(list, maxRecordCount) {
        var tobesendedCount      = 0,
            tobesendedOrdersList = [];

        if (maxRecordCount) {
            tobesendedCount = list ? list.length : 0;
            for (var i = 0; i < tobesendedCount; i ++) {
                if (list[i].status == 10) {
                    var orderStatus = orderStatusCheck(list[i].status)[0],
                        statusDesc  = orderStatusCheck(list[i].status)[1],
                        orderItem;

                    orderItem = getOrderItemDOM(list[i], orderStatus, statusDesc);

                    tobesendedOrdersList.push(orderItem);
                }
            }
        }
        else {
            tobesendedOrdersList = ['<div class="no-item"></div>'];
        }

        return [tobesendedOrdersList, tobesendedCount];
    };

    var sendedOrdersListmap = function(list, maxRecordCount) {
        var sendedCount      = 0,
            sendedOrdersList = [];
        if (maxRecordCount) {
            sendedCount = list ? list.length : 0;
            for (var i = 0; i < sendedCount; i ++) {
                if (list[i].status != 10) {
                    var orderStatus = orderStatusCheck(list[i].status)[0],
                        statusDesc  = orderStatusCheck(list[i].status)[1],
                        orderItem;

                    orderItem = getOrderItemDOM(list[i], orderStatus, statusDesc);

                    sendedOrdersList.push(orderItem);
                }
            }
        }
        else {
            sendedOrdersList = ['<div class="no-item"></div>'];
        }

        return [sendedOrdersList, sendedCount];
    };

    var getOrderDetailsDOM = function(orderObj, orderStatus, statusDesc, productArr) {
        var productCount = productArr.length,
            orderItem,

            orderHeader, 

            orderContent, 
            receiveInfo,

            productsList,
            productItem,
            productHeader,
            productContent,
            productFooter,
            totalPrice,

            expressInfo,
            feedbackInfo;

        /* 订单头部：订单号、状态 */
        orderHeader =   '<div class="order-header">' +
                            '<span class="order-number">订单编号：' + 
                                '<span id="orderNumber">' + orderObj.codeNum + '</span>' +
                            '</span>' +
                            '<span class="order-status ' + orderStatus + '" id="orderStatus">' + statusDesc + '</span>' +
                        '</div>';

        /* 收货信息 */
        receiveInfo =   '<div class="receive-info">' +
                            '<p>' +
                                '收货商户：<span class="receive-shop" id="receiveShop">' + orderObj.orderMember.name + '</span>' +
                            '</p>' +
                            '<p>' +
                                '收货人：<span class="receive-person" id="receiveLinkMan">' + orderObj.orderMember.linkMan + '</span>&nbsp;&nbsp;' +
                                '<span class="receive-tel" id="receiveLinkTel">' + orderObj.orderMember.linkPhone + '</span>' +
                            '</p>' +
                            '<p>' +
                                '<i class="fa fa-map-marker"></i>送货地址：' +
                                '<span class="receive-address" id="receiveAddress">' + orderObj.orderMember.address + '</span>' +
                            '</p>' +
                        '</div>';

        /* 产品div */
        productItem = '';
        for (var i = 0; i < productCount; i ++) {
            var productImgSrc = orderObj.itemList[i].img ? orderObj.itemList[i].img : './public/img/avatar.GIF';
            productHeader = '<div class="product-header">' +
                                '<span class="product-name">商品' + (i + 1) + '</span>' +
                            '</div>';

            productContent =    '<div class="product-content">' +
                                    '<div class="product-media">' +
                                        '<img src="' + productImgSrc +'">' +
                                    '</div>' +
                                    '<div class="product-info">' +
                                        '<p class="info-title">' + orderObj.itemList[i].productName + '</p>' +
                                        '<p class="info-options">' + orderObj.itemList[i].note + '</p>' +
                                        '<p class="info-amount">' +
                                            '<span class="per-price">¥' + orderObj.itemList[i].price + '</span>' +
                                            '<span class="amount-num">×' + orderObj.itemList[i].orderNum + '</span>' +
                                        '</p>' +
                                    '</div>' +
                                '</div>';

            productFooter = '<div class="product-footer">' +
                                '小计：<span class="sum-price">¥' + orderObj.itemList[i].subTotal + '</span>' +
                            '</div>';

            productItem +=  '<div class="product-item">' +
                                productHeader + productContent + productFooter +
                            '</div>';
        }

        /* 合计 */
        totalPrice =    '<div class="total-price-container">' +
                            '合计：<span class="total-price">¥' + orderObj.total + '</span>' +
                        '</div>';

        /* 产品列表 */
        productsList =  '<div class="product-list">' +
                            productItem + totalPrice +
                        '</div>';

        /* 快递 */
        expressInfo = getExpressInfoDOM(orderObj);

        //TODO，暂无各个评价的评分
        /* 评价 */
        feedbackInfo = getFeedbackInfoDOM(-1, -1, -1, -1);

        /* 订单详情主体 */
        orderContent =  '<div class="order-content">' +
                            receiveInfo + productsList + expressInfo + feedbackInfo +
                        '</div>';

        orderItem = orderHeader + orderContent;

        return orderItem;
    };

    var getExpressInfoDOM = function(orderObj) {
    	var express_info = '';
		var deliveryName = '其他快递';
        if (orderObj.status == 10) {
			/* 订单发货方式 */
        	express_info = "<div class='express-info'>\
                <div class='content-block-title'>选择配送方式</div>\
                <div class='list-block'>\
                    <ul>\
                        <li>\
							<label class='label-checkbox item-content no-padding'>\
								<div class='item-media'>\
									<img src='./public/img/icon_deliver.png'>\
								</div>\
								<div class='item-inner'>\
									<div class='item-title'>送货</div>\
									<div class='item-after'>\
										<div class='circle-check-container'>\
											<input type='radio' name='express-type' value='1'>\
											<div class='item-media'><i class='icon icon-form-checkbox' ></i></div>\
										</div>\
									</div>\
								</div>\
							</label>\
                        </li>\
						<li>\
							<label class='label-checkbox item-content no-padding'>\
								<div class='item-media'>\
									<img src='./public/img/icon_express.png'>\
								</div>\
								<div class='item-inner'>\
									<div class='item-title'>快递</div>\
									<div class='item-after'>\
										<div class='circle-check-container'>\
											<input type='radio' name='express-type' value='2'>\
											<div class='item-media'><i class='icon icon-form-checkbox' ></i></div>\
										</div>\
									</div>\
								</div>\
							</label>\
                        </li>\
                        <li class='item-content item-link' style='display:none'>\
                            <div class='item-inner'>\
                                <div class='item-title'>选择快递公司</div>\
                                <div class='item-after'>\
                                    <input type='text' value='顺丰速运' id='expressPicker'>\
                                </div>\
                            </div>\
                        </li>\
                        <li class='item-content' style='display:none'>\
                            <div class='item-inner'>\
                                <div class='item-title'>输入快递单号</div>\
                                <div class='item-after'>\
                                    <input type='text' Placeholder='1231231231' id='expressNo'>\
                                </div>\
                            </div>\
                        </li>\
                    </ul>\
                </div>\
            </div> ";
            $('#sendBtnContainer #sendBtn').on('click', function() {
                /* 确认发货点击时间绑定 */
 				var	deliveryInfo 	= {
					'deliveryBillNum': $.trim($('#expressNo').val()),
					'deliveryName'	 : $('#expressPicker').val(),
					'deliveryId'	 : '-1',
					'deliveryType'	 : $('input[name="express-type"]:checked').val() ,
					'id'			 : orderObj.orderId
				}
				/* 物流公司 */
				switch(deliveryInfo.deliveryName)
				{
					case '圆通快递':
						deliveryInfo.deliveryId = '123';
						break;
					case '顺丰速运':
						deliveryInfo.deliveryId = '1234';
						break;
					case '中通快递':
						deliveryInfo.deliveryId = '145249053762240001';
						break;
					default:
						deliveryInfo.deliveryId = -1;
				}
				if(deliveryInfo.deliveryType == 1)
				{
					deliveryInfo.deliveryBillNum = '';
					deliveryInfo.deliveryId		= '';
				}
				confirmDeliver(deliveryInfo, deliveryInfo.id);
            })
        	return express_info;
        }
        else{
			/* 订单物流信息*/
			deliveryName = getDeliveryCompany(orderObj.deliveryId);
			express_info = "<div class='express-info'>\
							<div class='list-block'>\
								<ul>\
									<li class='item-content'>\
										<div class='item-inner'>\
											<div class='item-title'>配送方式</div>\
											<div class='item-after'>快递</div>\
										</div>\
									</li>\
									<li class='item-content'>\
										<div class='item-inner'>\
											<div class='item-title'>快递公司</div>\
											<div class='item-after'>"+deliveryName+"</div>\
										</div>\
									</li>\
									<li class='item-content'>\
										<div class='item-inner'>\
											<div class='item-title'>快递单号</div>\
											<div class='item-after'>"+orderObj.deliveryBillNum+"</div>\
										</div>\
									</li>\
								</ul>\
							</div>\
						</div>";
			$('#sendBtnContainer').remove();
			if (orderObj.status == 20) {
				return express_info;
			}
			else if (orderObj.status == 30) {
				/* 订单物流信息 、 评价详情 */
				deliveryName = getDeliveryCompany(orderObj.deliveryId);
				express_info += "\
							<div class='feedback-info'>\
								<div class='content-block-title'>评价详情</div>\
								<div class='list-block'>\
									<ul>\
										<li class='item-content'>\
											<div class='item-inner'>\
												<div class='item-title'>暂无评价</div>\
											</div>\
										</li>\
									</ul>\
								</div>\
							</div>";
				$('#sendBtnContainer').remove();
				return express_info;
			}
			else if (orderObj.status == 40) {
				/* 订单物流信息 、 评价详情 */
				express_info += "\
							<div class='feedback-info'>\
								<div class='content-block-title'>评价详情</div>\
								<div class='list-block'>\
									<ul>\
										<li class='item-content'>\
											<div class='item-inner'>\
												<div class='item-title'>商品满意度</div>\
												<div class='item-after' id='productEvaluate'></div>\
											</div>\
										</li>\
										<li class='item-content'>\
											<div class='item-inner'>\
												<div class='item-title'>配送速度满意度</div>\
												<div class='item-after' id='expressEvaluate'></div>\
											</div>\
										</li>\
										<li class='item-content'>\
											<div class='item-inner'>\
												<div class='item-title'>配送人员服务满意度</div>\
												<div class='item-after' id='expresserEvaluate'></div>\
											</div>\
										</li>\
									</ul>\
								</div>\
							</div>";
				$('#sendBtnContainer').remove();
				return express_info;
			}
			else {
				$('#sendBtnContainer').remove();
				//TODO 缺少关键字段信息
				return '';
			}        			
		}
    }

    var getFeedbackInfoDOM = function(statusVal, productEvaluate, expressEvaluate, expresserEvaluate) {
        //TODO
        return '';
    }

    var myOrdersAllScroll = function(maxPage, dataInfiTag) {
        if (dataInfiTag == 0) {
            /* 如果置为0，表示内容已加载完 */
            return;
        }
        
        var currentPage = $('#allOrders').attr('data-page');
            page = {
                'currentPage': currentPage,
                'pageSize': 10
            },
            s    = { 'page': page };
        /* 如果正在加载，则退出 */
        if (globalScope.ordersLoadingTag) return;

        /* 设置flag */
        globalScope.ordersLoadingTag = true;

        /* 模拟1s的加载过程 */
        setTimeout(function() {
            s.page.currentPage ++;

            /* 重置flag */
            globalScope.ordersLoadingTag = false;

            if (s.page.currentPage > maxPage) {
                /* 加载完毕，注销无限加载事件 */
                /* 因为有3个标签页，任意一个标签页加载完毕后，都不适合注销无限加载事件 */
                /* $.detachInfiniteScroll($('.infinite-scroll')); */
                /* 删除加载提示符 */
                $('#allOrders .infinite-scroll-preloader').remove();
                /* 添加没有更多记录提示 */
                if ($('#sendedOrders .nomore-item')) {
                    $('#sendedOrders .nomore-item').remove();
                }
                $('#allOrders').attr('data-infi', 0).append('<div class="nomore-item"></div>');

                return;
            }

            /* 添加新的记录 */
            $('#allOrders .infinite-scroll-preloader').remove();

            /* 设置flag */
            globalScope.ordersLoadingTag = true;
            Ajax.action('scmMall', 'SupplyOrderFetch', JSON.stringify(s), function (data) {
                myOrdersAllcallback(data);
                
                $('#allOrders').attr('data-page', data.page.currentPage);
                
                /* 重置flag */
                globalScope.ordersLoadingTag = false;
            });

            /* 容器发生改变，如果是js滚动，需要刷新滚动 */
            $.refreshScroller();
        }, 1000);
    }

    var tobesendedOrdersScroll = function(maxPage, dataInfiTag) {
        if (dataInfiTag == 0) {
            /* 如果置为0，表示内容已加载完 */
            return;
        }
        
        var currentPage = $('#tobesendedOrders').attr('data-page');
            page = {
                'currentPage': currentPage,
                'pageSize': 10
            },
            s    = { 'page': page };
        /* 如果正在加载，则退出 */
        if (globalScope.ordersLoadingTag) return;

        /* 设置flag */
        globalScope.ordersLoadingTag = true;

        /* 模拟1s的加载过程 */
        setTimeout(function() {
            s.page.currentPage ++;

            /* 重置flag */
            globalScope.ordersLoadingTag = false;

            if (s.page.currentPage > maxPage) {
                /* 加载完毕，注销无限加载事件 */
                /* 因为有3个标签页，任意一个标签页加载完毕后，都不适合注销无限加载事件 */
                /* $.detachInfiniteScroll($('.infinite-scroll')); */
                /* 删除加载提示符 */
                $('#tobesendedOrders .infinite-scroll-preloader').remove();
                /* 添加没有更多记录提示 */
                if ($('#sendedOrders .nomore-item')) {
                    $('#sendedOrders .nomore-item').remove();
                }
                $('#tobesendedOrders').attr('data-infi', 0).append('<div class="nomore-item"></div>');

                return;
            }

            /* 添加新的记录 */
            $('#tobesendedOrders .infinite-scroll-preloader').remove();

            /* 设置flag */
            globalScope.ordersLoadingTag = true;
            Ajax.action('scmMall', 'SupplyOrderFetch', JSON.stringify(s), function (data) {
                tobesendedOrderscallback(data);
                
                $('#tobesendedOrders').attr('data-page', data.page.currentPage).append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
                
                /* 重置flag */
                globalScope.ordersLoadingTag = false;
            });

            /* 容器发生改变，如果是js滚动，需要刷新滚动 */
            $.refreshScroller();
        }, 1000);
    }

    var sendedOrdersScroll = function(maxPage, dataInfiTag) {
        if (dataInfiTag == 0) {
            /* 如果置为0，表示内容已加载完 */
            return;
        }
        
        var currentPage = $('#sendedOrders').attr('data-page');
            page = {
                'currentPage': currentPage,
                'pageSize': 10
            },
            s    = { 'page': page };
        /* 如果正在加载，则退出 */
        if (globalScope.ordersLoadingTag) return;

        /* 设置flag */
        globalScope.ordersLoadingTag = true;

        /* 模拟1s的加载过程 */
        setTimeout(function() {
            s.page.currentPage ++;

            /* 重置flag */
            globalScope.ordersLoadingTag = false;

            if (s.page.currentPage > maxPage) {
                /* 加载完毕，注销无限加载事件 */
                /* 因为有3个标签页，任意一个标签页加载完毕后，都不适合注销无限加载事件 */
                /* $.detachInfiniteScroll($('.infinite-scroll')); */
                /* 删除加载提示符 */
                $('#sendedOrders .infinite-scroll-preloader').remove();
                /* 添加没有更多记录提示 */
                if ($('#sendedOrders .nomore-item')) {
                    $('#sendedOrders .nomore-item').remove();
                }
                $('#sendedOrders').attr('data-infi', 0).append('<div class="nomore-item"></div>');

                return;
            }

            /* 添加新的记录 */
            $('#sendedOrders .infinite-scroll-preloader').remove();

            /* 设置flag */
            globalScope.ordersLoadingTag = true;
            Ajax.action('scmMall', 'SupplyOrderFetch', JSON.stringify(s), function (data) {
                sendedOrderscallback(data);
                
                $('#sendedOrders').attr('data-page', data.page.currentPage).append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
                
                /* 重置flag */
                globalScope.ordersLoadingTag = false;
            });

            /* 容器发生改变，如果是js滚动，需要刷新滚动 */
            $.refreshScroller();
        }, 1000);
    }

    var myOrdersInfiniteScroll = function() {
        $.showIndicator();
        /* 由于content内容滚动，各个标签页会同时收影响，因此将三个tab的无限加载分开 */

        var tobesendedStatus = {
                'searchType': 10
            },
            sendedStatus = {
                'searchType': 20
            };

        /* 先预先加载3个标签页各10条数据 */
        Ajax.action('scmMall', 'SupplyOrderFetch', '', myOrdersAllcallback);        

        Ajax.action('scmMall', 'SupplyOrderFetch', JSON.stringify(tobesendedStatus), tobesendedOrderscallback);

        Ajax.action('scmMall', 'SupplyOrderFetch', JSON.stringify(sendedStatus), sendedOrderscallback);

        /* loading采用全局变量 */
        globalScope.ordersLoadingTag = false;
        /* 注册'infinite'事件处理函数 */
        $(document).on('infinite', '.infinite-scroll-bottom', function() {
            var $activeTab  = $('.tab.active'),
                activeId    = $activeTab.attr('id'),
                theMaxPage  = $activeTab.attr('data-maxpage'),
                dataInfiTag = $activeTab.attr('data-infi');

            switch (activeId) {
                case 'allOrders' :
                    myOrdersAllScroll(theMaxPage, dataInfiTag);
                    break;
                case 'tobesendedOrders' :
                    tobesendedOrdersScroll(theMaxPage, dataInfiTag);
                    break;
                case 'sendedOrders' :
                    sendedOrdersScroll(theMaxPage, dataInfiTag);
                    break;
                default :;
            }
        })
    }

    var confirmDeliver = function(deliveryData, orderId) {
		/* 发货信息提交 */
		console.log(deliveryData);
		Ajax.action('scmMall', 'SupplyDeliver', JSON.stringify(deliveryData), function(data) {
			$.toast(data.message);
			if(data.errorCode == "0"){
				setPage.init();
				$('.order-item').empty();
				rot.order_details(orderId);
			}
		});
    };	
	
	var getDeliveryCompany = function(deliveryId) {
		/* 物流公司 */
		var deliveryName = '其他快递';
		switch(deliveryId)
		{
			case '123':
				deliveryName = '圆通快递';
				break;
			case '1234':
				deliveryName = '顺丰速运';
				break;
			case '145249053762240001':
				deliveryName = '中通快递';
				break;
			default:
				deliveryName = '其他快递';
		}
		return deliveryName;
	}
	
    /* my_orders callback Functions */
    var myOrdersAllcallback = function(data) {
        console.info(data);

        loginStatus.check_login(data);

        $('#allOrders').attr({
            'data-page': 1,
            'data-infi': 1,
            'data-maxpage': data.page.maxPage
        });
        /* all orders */
        var maxRecord = data.page.maxRecord;
        var allOrdersList  = allOrdersListmap(data.list, maxRecord)[0],
            allOrdersCount = allOrdersListmap(data.list, maxRecord)[1];
        if (allOrdersCount == 0) {
            $('#allOrders').append('<div class="no-item"></div>')
        }
        else {
            for (var i = 0; i < allOrdersCount; i ++) {
                $('#allOrders').append(allOrdersList[i]);
            }
            /* 当第一页显示的内容不足2条时，可以不添加预加载的图标 */
            if (!($('#allOrders').attr('data-page') == 1 && allOrdersCount <= 2)) {
            	$('#allOrders').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
            }
        }
    };

    var tobesendedOrderscallback = function(data) {
        console.info(data);
        $('#tobesendedOrders').attr({
            'data-page': 1,
            'data-infi': 1,
            'data-maxpage': data.page.maxPage
        });
        /* tobesended orders */
        var maxRecord = data.page.maxRecord;
        var tobesendedOrdersList  = tobesendedOrdersListmap(data.list, maxRecord)[0],
            tobesendedOrdersCount = tobesendedOrdersListmap(data.list, maxRecord)[1];
        if (tobesendedOrdersCount == 0) {
            $('#tobesendedOrders').append('<div class="no-item"></div>')
        }
        else {
            for (var i = 0; i < tobesendedOrdersCount; i ++) {
                $('#tobesendedOrders').append(tobesendedOrdersList[i]);
            }
            /* 当第一页显示的内容不足2条时，可以不添加预加载的图标 */
            if (!($('#tobesendedOrders').attr('data-page') == 1 && tobesendedOrdersCount <= 2)) {
            	$('#tobesendedOrders').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
            }
        }
    }

    var sendedOrderscallback = function(data) {
        console.info(data);
        $('#sendedOrders').attr({
            'data-page': 1,
            'data-infi': 1,
            'data-maxpage': data.page.maxPage
        });
        /* sended orders */
        var maxRecord = data.page.maxRecord;
        var sendedOrdersList  = sendedOrdersListmap(data.list, maxRecord)[0],
            sendedOrdersCount = sendedOrdersListmap(data.list, maxRecord)[1];
        if (sendedOrdersCount == 0) {
            $('#sendedOrders').append('<div class="no-item"></div>')
        }
        else {
            for (var i = 0; i < sendedOrdersCount; i ++) {
                $('#sendedOrders').append(sendedOrdersList[i]);
            }
            /* 当第一页显示的内容不足2条时，可以不添加预加载的图标 */
            if (!($('#sendedOrders').attr('data-page') == 1 && sendedOrdersCount < 5)) {
            	$('#sendedOrders').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');
            }
        }
    }

    /* order_details callback Functions */
    function viewOrderDetailscallback(data) {
        $.hideIndicator();

        loginStatus.check_login(data);

        var jsb         = data,
            orderObj    = jsb.obj,
            itemList    = orderObj.itemList,
            orderStatus = orderStatusCheck(orderObj.status)[0],
            statusDesc  = orderStatusCheck(orderObj.status)[1],
            orderItem;
        console.info(orderObj);
        if (orderObj) {
            orderItem = getOrderDetailsDOM(orderObj, orderStatus, statusDesc, itemList);
            $('#orderDetails .order-item').empty().attr('id', orderObj.orderId).append(orderItem);
			pageEffects.effects_init();
			/* 送货方式单选按钮绑定（送货/快递） */
			var deliveryCompany = $('#orderDetails .express-info ul li').eq(2);
			var deliveryBillNum = $('.express-info ul li').eq(3);
			$('#orderDetails .express-info ul li .label-checkbox').eq(0).on('click',function(){
				deliveryCompany.css('display','none');
				deliveryBillNum.css('display','none');
				$('#orderDetails #expressNo').val('');
			})
			$('#orderDetails .express-info ul li .label-checkbox').eq(1).on('click',function(){
				deliveryCompany.css('display','flex');
				deliveryBillNum.css('display','flex');
			})
		}
		if (orderObj.status==40) {
			pageEffects.evaluateFunc_init($('#orderDetails #productEvaluate'), orderObj.salerEvaluate);
			pageEffects.evaluateFunc_init($('#orderDetails #expressEvaluate'), orderObj.salerEvaluate);
			pageEffects.evaluateFunc_init($('#orderDetails #expresserEvaluate'), orderObj.salerEvaluate);
		}
	}


    /*====================================
    	finance_center
	====================================*/
    var financeData = {
    	finance_center: function() {
    		Ajax.action('powerBalance', 'MemberIntegralFlowSummary', '', financeOverviewcallback);

            /* 采用无限滚动加载 */
    		financeInfiniteScroll();
    	}
    }

    var getFinanceListDOM = function(list) {
        var financeList = '',
            financeItem,
            financeStatus,
            statusDesc,
            listCount;
        if (list) {
            listCount = list.length;
            for (var i = 0; i < listCount; i ++) {
                financeStatus = (list[i].status == 1) ? 'status-cleared' : '';
                statusDesc = (list[i].status == 1) ? '已清算' : '冻结';
                financeItem =   '<div class="row no-gutter finance-item">' +
                                    '<div class="col-100 item-amount">' +
                                        '金&nbsp;额：<span class="item-value">¥' + list[i].amountMoney + '</span>' +
                                    '</div>' +
                                    '<div class="col-50 item-status">' +
                                        '状&nbsp;&nbsp;态：<span class="item-value ' + financeStatus + '">' + statusDesc + '</span>' +
                                    '</div>' +
                                    '<div class="col-50 item-type">' +
                                        '类型：<span class="item-value">' + list[i]._flowType + '</span>' +
                                    '</div>' +
                                    '<div class="col-50 item-payer">' +
                                        '付款人：<span class="item-value">' + list[i].fromName + '</span>' +
                                    '</div>' +
                                    '<div class="col-50 item-date">' +
                                        '时间：<span class="item-value">' + list[i].flowTime + '</span>' +
                                    '</div>' +
                                    '<div class="col-50 item-payee">' +
                                        '收款人：<span class="item-value">' + list[i].toName + '</span>' +
                                    '</div>' +
                                '</div>';
                financeList += financeItem;
            }
        }
        else {
            financeList = '<div class="nomore-item"></div>';
        }

        return financeList;
    };

    /* 财务中心，无限加载 */
    var financeInfiniteScroll = function() {
        $('#financeList').attr({
            'data-page': 1,
            'data-infi': 1
        });

        var page = {
                'currentPage': 1,
                'pageSize': 10
            },
            s    = { 'page': page },
            maxPage;

        var loading = false;
        /* 预先加载10条 */
        Ajax.action('powerBalance', 'MemberIntegralFlowFetch', JSON.stringify(s), function (data) {
            maxPage   = data.page.maxPage;
            financeListcallback(data);
        });

        /* 注册'infinite'事件处理函数 */
        $(document).on('infinite', '.infinite-scroll-bottom', function() {
            /* 如果正在加载，则退出 */
            if (loading) return;

            $('#financeList').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');

            /* 设置flag */
            loading = true;

            /* 模拟1s的加载过程 */
            setTimeout(function() {
                s.page.currentPage ++;

                /* 重置flag */
                loading = false;

                if (s.page.currentPage > maxPage) {
                    /* 加载完毕，注销无限加载事件 */
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    /* 删除加载提示符 */
                    $('.infinite-scroll-preloader').remove();
                    /* 添加没有更多记录提示 */
                    $('#financeList').append('<div class="nomore-item"></div>');

                    return;
                }

                /* 添加新的记录 */
                $('.infinite-scroll-preloader').remove();

                /* 设置flag */
                loading = true;
                Ajax.action('powerBalance', 'MemberIntegralFlowFetch', JSON.stringify(s), function (data) {
                    financeListcallback(data);
                    
                    $('#financeList').attr('data-page', data.page.currentPage);
                    
                    /* 重置flag */
                    loading = false;
                });

                /* 容器发生改变，如果是js滚动，需要刷新滚动 */
                $.refreshScroller();
            }, 1000);
        })
    }

    /* my_finance callback Functions */
    function financeOverviewcallback(data) {
    	if (!$.setError(data)) return;

        loginStatus.check_login(data);

        var jsb = data;
        var cash = jsb.obj;
        $("#totalIncomeVal").text(cash.totalIncome ? cash.totalIncome : '0');
        $("#availableVal").text(cash.availableAmount ? cash.availableAmount : '0');
        $("#totalPayVal").text(cash.totalOutcome ? cash.totalOutcome : '0');
        $("#lockedVal").text(cash.frozenAmount ? cash.frozenAmount : '0');
        $("#remainingVal").text((cash.totalIncome - cash.totalOutcome) ? cash.totalIncome : '0');
    }

    function financeListcallback(data) {
        console.info(data);
        $.hideIndicator();
        var dataList       = data.list,
            maxRecordCount = data.page.maxRecord,
            financeList;

        if (maxRecordCount != 0) {
            financeList = getFinanceListDOM(dataList);
        }
        else {
            financeList = '<div class="no-finance-item"></div>';
        }

        $('#financeList').append(financeList);
    }

    /*====================================
        my_clearance.html
    ====================================*/
    var clearanceData = {
        clearance_list: function() {
            /* 采用无限滚动加载 */
            clearanceInfiniteScroll();
        },

        clearance_search_list: function() {
            var keyWord = $('#searchContainer input').val(),
                search  = { 'keyWord': keyWord },
                s       = { 'search': search };
            if (keyWord == '') {
                $.toast('请输入关键字！',1000);
            }
            else {
                $('#clearanceContainer').removeClass('active');
                $('#clearanceSearchContainer').addClass('active').attr('data-page', 1);
                $('#clearanceSearchList').empty().append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');

                $('#searchContainer input').blur();
                /* 添加搜索结果节点 */
                Ajax.action('powerBalance', 'MemberBalanceApplyFetch', JSON.stringify(s), clearanceSearchListcallback);
            }
        },
        clearance_details: function(clearanceId) {
            var s = {
                    'id': clearanceId
                };
            Ajax.action('powerBalance', 'MemberBalanceApplyInfo', JSON.stringify(s), clearanceDetailscallback);
        },
        applying_clearance: function() {
            Ajax.action('powerBalance','MemberBalanceApplyWaitOrderAllList','',applyingOrdersListcallback);
        },
        selectAll_toggle: function() {
            /* 全选 */
            $('#selectAllBtn').on('click', function() {
                var $thisBtn       = $(this),
                    $checkboxList = $('input[type="checkbox"]');

                if ($thisBtn.hasClass('selected')) {
                    $checkboxList.prop('checked', false);
                    $thisBtn.removeClass('selected');
                }
                else {
                    $checkboxList.prop('checked', true);
                    $thisBtn.addClass('selected');
                }
            });
        },
        selectAll_check: function() {
            /* 点选任意一条订单后 */
            /* 若全部订单被选中，【全选】按钮变为被选中状态 */
            /* 从全选状态退出，【全选】按钮取消选中状态 */
            var itemCount = $('.orders-list').attr('data-itemcount');

            $('.orders-item').on('click','input[type=checkbox]' , function() {
                var $selectAllBtn  = $('#selectAllBtn'),
                    $checkboxList  = $('input[type="checkbox"]'),
                    checkedCount   = 0,
                    uncheckedCount = 0;

                $checkboxList.each(function() {
                    if ($(this).prop('checked')) {
                        checkedCount ++;
                    }
                    else {
                        uncheckedCount ++;
                    }
                })

                if ($selectAllBtn.hasClass('selected')) {
                    $selectAllBtn.removeClass('selected');
                }
                else {
                    if (checkedCount == itemCount) {
                        $selectAllBtn.addClass('selected');
                    }
                }
            })
        },
        submit_applyingOrders: function() {
            var $checkboxList  = $('input[type="checkbox"]'),
                balanceTotal   = 0,
                applyingOrders = [],
                checkedCount   = 0;

            $checkboxList.each(function() {
                if ($(this).prop('checked')) {
                    var thisOrderId = $(this).attr('id'),
                        thisBalance = $(this).attr('data-balance'),
                        obj         = { 'orderId': thisOrderId };

                    applyingOrders.push(obj);
                    balanceTotal += parseFloat(thisBalance);
                    checkedCount ++;
                }
            });

            balanceTotal = parseFloat(balanceTotal).toFixed(2);

            if (checkedCount == 0) {
                $.alert('没有可提交的订单！');
            }
            else {
                $.confirm('确定提交吗?', '当前选中' + checkedCount +'个订单，结算总额为' + balanceTotal, function(){
                    var s={ "itemList": applyingOrders };
                    Ajax.action('powerBalance', 'MemberBalanceApplySubmitForOrderList', JSON.stringify(s), subApplyListcallback);
                });
            }
        }
    };

    var getClearanceListDOM = function(list) {
        var clearanceList = '',
            clearanceItem,
            clearanceStatus,
            statusDesc,
            listCount;

        if (list) {
            listCount = list.length;
            for (var i = 0; i < listCount; i ++) {
                clearanceStatus = clearanceStatusCheck(list[i].status)[0];
                statusDesc = clearanceStatusCheck(list[i].status)[1];
                var itemCount = list[i].itemList ? list[i].itemList.length : 0;
                clearanceItem = '<div class="clearance-item horizontal-division" onclick="rot.clearance_details(' + '\'' + list[i].applyId + '\'' + ')">' +
                                    '<p class="clearance-no">' +
                                        '申请编号：<span class="no-val">' + list[i].codeNum + '</span>' +
                                    '</p>' +
                                    '<p class="clearance-data">' +
                                        '申请时间：<span class="data-val">' + list[i].submitDate + '</span>' +
                                    '</p>' +
                                    '<p class="clearance-remark">' +
                                        '备&nbsp;&nbsp;&nbsp;&nbsp;注：<span class="remark-val">' + itemCount + '个订单，共' + list[i].total + '元</span>' +
                                    '</p>' +
                                    '<p class="clearance-status">' +
                                        '状&nbsp;&nbsp;&nbsp;&nbsp;态：<span class="status-val ' + clearanceStatus + '">' + statusDesc + '</span>' +
                                    '</p>' +
                                '</div>';
                clearanceList += clearanceItem;
            }
        }
        else {
            clearanceList = '<div class="nomore-item"></div>';
        }

        return clearanceList;
    }

    var getClearanceDetailsDOM = function(data) {
        var clearanceObj = data.obj,
            ordersArr    = clearanceObj.itemList,
            clearanceRemark,
            clearanceStatus,
            statusDesc,
            ordersCount,

            ordersList,
            orderItem;

        ordersCount     = ordersArr ? ordersArr.length : 0;
        clearanceStatus = clearanceStatusCheck(clearanceObj.status)[0];
        statusDesc      = clearanceStatusCheck(clearanceObj.status)[1];
        clearanceRemark = ordersCount + '个订单，共' + (clearanceObj.total ? clearanceObj.total : '--') + '元';

        $('#applyNo').text(clearanceObj.codeNum ? clearanceObj.codeNum : '--');
        $('#applyDate').text(clearanceObj.createDate ? clearanceObj.createDate : '--');
        $('#clearanceTotalPrice').text('¥' + (clearanceObj.total ? clearanceObj.total : '0.00'));
        $('#clearanceStatus').addClass(clearanceStatus).text(statusDesc);
        $('#clearanceRemark').text(clearanceRemark)

        if (ordersArr) {
            ordersItem = '';
            ordersList = '';
            var tempOrder;
            for (var i = 0; i < ordersCount; i ++) {
                tempOrder = '<div class="order-item horizontal-division row no-gutter">' +
                                '<div class="order-header text-size-m">' +
                                    '订单编号：' + ordersArr[i].codeNum +
                                '</div>' +
                                '<div class="row no-gutter order-content text-size-m">' +
                                    '<div class="col-50">' +
                                        '下&nbsp;单&nbsp;人：<span class="order-person">' + ordersArr[i]._orderUserId + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '状&nbsp;&nbsp;态：<span class="order-status">' + ordersArr[i]._balanceStatus + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '订单金额：<span class="order-price">¥' + ordersArr[i].balanceTotal + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        //TODO缺少联系方式
                                        '联系方式：<span class="order-contact">--</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        //TODO缺少下单时间
                                        '下单时间：<span class="order-date">--</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '结算金额：<span class="order-clearance-price">¥' + ordersArr[i].total + '</span>' +
                                    '</div>' +
                                '</div>' +
                            '</div>';
                ordersItem += tempOrder;
            }
            ordersList =    '<div class="orders-list">' +
                                ordersItem +
                            '</div>';
        }
        else {
            ordersList =    '<div class="orders-list">' +
                                '<div class=""nor-order-item></div>' +
                            '</div>';
        }

        return ordersList;
    }

    var clearanceStatusCheck = function(statusVal) {
        var statusClass,
            statusDesc;

        switch (statusVal) {
            case '-1' :
                statusClass = 'status-rejected';
                statusDesc  = '驳回';
                break;
            case '0' :
                statusClass = 'status-tobesubmit';
                statusDesc  = '未提交';
                break;
            case '1' :
                statusClass = 'status-beingchecked';
                statusDesc  = '审核中';
                break;
            case '2' :
                statusClass = 'status-checked';
                statusDesc  = '审核通过';
                break;
            case '3' :
                statusClass = 'status-payed';
                statusDesc  = '付款完毕';
                break;
            default :
                statusClass = '';
                statusDesc  = '未设置';
        }

        return [statusClass, statusDesc];
    }

    /* 清算中心，无限加载 */
    var clearanceInfiniteScroll = function() {
        $('#clearanceList').attr({
            'data-page': 1,
            'data-infi': 1
        });

        var page = {
                'currentPage': 1,
                'pageSize': 10
            },
            s    = { 'page': page },
            maxPage;

        var loading = false;
        /* 预先加载10条 */
        Ajax.action('powerBalance', 'MemberBalanceApplyFetch', JSON.stringify(s), function (data) {

            loginStatus.check_login(data);

            maxPage = data.page.maxPage;
            clearanceListcallback(data);
        });

        /* 注册'infinite'事件处理函数 */
        $(document).on('infinite', '.infinite-scroll-bottom', function() {
            /* 如果正在加载，则退出 */
            if (loading) return;

            $('#clearanceList').append('<div class="infinite-scroll-preloader"><div class="preloader"></div></div>');

            /* 设置flag */
            loading = true;

            /* 模拟1s的加载过程 */
            setTimeout(function() {
                s.page.currentPage ++;

                /* 重置flag */
                loading = false

                if(s.page.currentPage > maxPage) {
                    /* 加载完毕，注销无限加载事件 */
                    $.detachInfiniteScroll($('.infinite-scroll'));
                    /* 删除加载提示符 */
                    $('.infinite-scroll-preloader').remove();
                    /* 添加没有更多记录提示 */
                    $('#clearanceList').append('<div class="nomore-item"></div>');

                    return;
                }

                /* 添加新的记录 */
                $('.infinite-scroll-preloader').remove();

                /* 设置flag */
                loading = true;
                Ajax.action('powerBalance', 'MemberBalanceApplyFetch', JSON.stringify(s), function (data) {
                    clearanceListcallback(data);

                    $('#clearanceList').attr('data-page', data.page.currentPage);

                    /* 重置flag */
                    loading = false;
                });

                /* 容器发生改变，如果是js滚动，需要刷新滚动 */
                $.refreshScroller();
            }, 1000);
        })
    }

    /* 清算申请，搜索结果 */
    var clearanceSearchListcallback = function(data) {
        console.log(data);
        var searchList = data.list,
            maxPage    = data.page.maxPage,
            maxRecord  = data.page.maxRecord,
            resultList = '',

            page = {
                'currentPage': 1,
                'pageSize': 10
            },
            s = {'page': page};

        $('#clearanceSearchContainer .infinite-scroll-preloader').remove();

        if (maxRecord == 0) {
            $('#clearanceSearchList').append('<div class="no-search-item"></div>');
            return ;
        }
        else {
            /* 先加载10条记录 */
            resultList = getClearanceListDOM(searchList);
            $('#clearanceSearchList').empty().append(resultList);

            /* 往后每隔0.5s加载后续10条 */
            for (var i = 1; i < maxPage; i ++) {
                s.page.currentPage++;

                setTimeout(function() {
                    //TODO
                    Ajax.action('powerBalance', 'MemberBalanceApplyFetch', JSON.stringify(s), function (data) {
                        console.log(data);
                        searchList = data.list;
                        resultList = getClearanceListDOM(searchList);
                        $('#clearanceSearchList').append(resultList);
                    });
                },500)
            }
        }
    }

    var getApplyingListDOM = function(list) {
        var applyingList = list,
            ordersList   = '',
            ordersItem   = '',
            orderHeader,
            orderContent;

        if (applyingList) {
            var listCount = applyingList.length;
            for (var i = 0; i < listCount; i ++) {
                orderHeader =   '<div class="order-header text-size-m">' +
                                    '<div class="circle-checkbox-container">' +
                                        '<input type="checkbox" name="appyingOrders" id="' + applyingList[i].orderId + '" data-balance="' + applyingList[i].total + '">' +
                                        '<div class="icon-container"><i class="icon icon-check"></i></div>' +
                                    '</div>' +
                                    '订单编号：' + applyingList[i].codeNum +
                                '</div>';

                orderContent =  '<div class="order-content row no-gutter text-size-m">' +
                                    '<div class="col-50">' +
                                        '下&nbsp;单&nbsp;人：<span class="order-person">' + applyingList[i].orderUserName + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '状&nbsp;&nbsp;态：<span class="order-status">' + applyingList[i]._balanceStatus + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '订单金额：<span class="order-price">¥' + applyingList[i].balanceTotal + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '联系方式：<span class="order-contact">' + applyingList[i].linkTel + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '下单时间：<span class="order-date">' + applyingList[i].orderTime + '</span>' +
                                    '</div>' +
                                    '<div class="col-50">' +
                                        '结算金额：<span class="order-clearance-price">¥' + applyingList[i].total + '</span>' +
                                    '</div>' +
                                '</div>';

                ordersItem +=    '<div class="orders-item horizontal-division row no-gutter"><label>' +
                                    orderHeader + orderContent +
                                '</label></div>';
            }

            ordersList +=   '<div class="orders-list" data-itemcount="' + listCount + '">' +
                                ordersItem +
                            '</div>';
        }
        else {
            ordersList = '<div class="orders-list" data-itemcount="0"><div class="no-item"></div></div>';
        }

        return ordersList;
    }

    /* clearance callback Functions */
    function clearanceListcallback(data) {
        console.info(data);
        var dataList       = data.list,
            maxRecordCount = data.page.maxRecord,
            clearanceList;
        
        if (maxRecordCount != 0) {
            clearanceList = getClearanceListDOM(dataList);
        }
        else {
            clearanceList = '<div class="no-clearance-item"></div>';
        }
        $('#clearanceList').append(clearanceList);
    }

    function clearanceDetailscallback(data) {
        console.info(data);

        loginStatus.check_login(data);

        var ordersList = getClearanceDetailsDOM(data);
        $('#ordersContainer .orders-list').append(ordersList);
    }

    function applyingOrdersListcallback(data) {
        console.info(data);
        var ordersList = getApplyingListDOM(data.list);
        $('#ordersContainer').append(ordersList);

        clearanceData.selectAll_toggle();
        clearanceData.selectAll_check();
    }

    function subApplyListcallback(data) {
        console.info(data);
        var jsb    = data,
            result = jsb.result;

        if (result == "faild") {
            if (jsb.message.slice(0,2) == "本次") {
                $.toast("申请的结算金小于300元 ！");
            }
            else {
                $.toast(jsb.message);
            }

            var errorCode = parseInt(jsb.errorCode);

            if (errorCode <= 20) {
//                openAppLogin_f();
            	loginStatus.check_login(data);
            };

            return false;
        }
        else {
            $.toast("提交成功，请耐心等待审核");
            $.router.back();
        }
    }

    /*====================================
        页面交互js
    ====================================*/
    var pageEffects = {
        effects_init: function() {
            $('#expressPicker').picker({
                toolbarTemplate: '<header class="bar bar-nav" style="height:2rem;line-height:2rem;padding:0 0.5rem;background-color:#ffffff;">\
                                    <button class="button button-link pull-left close-picker" style="color:#000000;">取消</button>\
                                    <button class="button button-link pull-right close-picker" style="color:#000000;">确定</button>\
                                  </header>',
                cols: [
                    {
                        textAlign: 'center',
                        values: ['顺丰速运', '中通快递', '圆通快递', '申通快递', 'EMS']
                    }
                ]
            });
            $('.picker-modal').attr('background','#fff');
        },
        preloader_init: function() {
            $.showPreloader('数据加载中...');
        },
        preloader_hide: function() {
            $.hidePreloader();
        },
        tab_toggle: function(selector) {
            $('.tab-link.active').removeClass('active');
            $('.tab.active').removeClass('active');
            $('.tab-link[href="' + selector + '"]').addClass('active');
            $(selector).addClass('active');
        },
        searchbar_show: function() {
            $('#searchContainer').addClass('active');
            $('#searchContainer input').val('').focus().on('blur', function() {
                if (!($('#clearanceSearchContainer').hasClass('active'))) {
                    pageEffects.searchbar_hide();
                }
            })
        },
        searchbar_hide: function() {
            $('#searchContainer').removeClass('active');
            $('#clearanceSearchContainer').removeClass('active');
            $('#clearanceContainer').addClass('active');
        },
		evaluateFunc_init: function(selector, markVal) {
			/* 评价详情显示 */
			var starArr = [
				"<i class='fa fa-star' style='color:#ff6632;'></i>&nbsp;",
				"<i class='fa fa-star' style='color:#ff6632;'></i>&nbsp;",
				"<i class='fa fa-star' style='color:#ff6632;'></i>&nbsp;",
				"<i class='fa fa-star' style='color:#ff6632;'></i>&nbsp;",
				"<i class='fa fa-star' style='color:#ff6632;'></i>&nbsp;",
				"<i class='fa fa-star-o' style='color:#848484;'></i>&nbsp;",
				"<i class='fa fa-star-o' style='color:#848484;'></i>&nbsp;",
				"<i class='fa fa-star-o' style='color:#848484;'></i>&nbsp;",
				"<i class='fa fa-star-o' style='color:#848484;'></i>&nbsp;",
				"<i class='fa fa-star-o' style='color:#848484;'></i>&nbsp;"
			],
				result = starArr.slice((5 - markVal), (10 - markVal));
			for (var i = 0; i < 5; i ++){
				$(selector).append(result[i]);
			}
		}
	};

    /*====================================
        设置全局变量
    ====================================*/
    var globalScope = {
        'ordersLoadingTag': false
    }

    // --------- exports ---------
    window.getData = getData;
    window.getShopInfo = getShopInfo;

    window.ordersData = ordersData;

    window.financeData = financeData;

    window.clearanceData = clearanceData;

    window.pageEffects = pageEffects;

    window.globalScope = globalScope;

})(window, $);

//-------------- 页面初始化 --------------------

$(function() {
    setPage.init();
    getData.ShopInfo();
});