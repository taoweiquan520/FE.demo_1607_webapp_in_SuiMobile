/* 手机号登录 */

function sendCode(){
	// alert(1)
	var mobile=$('#mobile').val();
	if(!mobile){$.toast('请输入手机号');return;}
	var s={'mobile':mobile}
	Ajax.action('console', 'UserLoginCheckByMobile', JSON.stringify(s), sendCode_callBack);
	$.showIndicator();
}


function sendCode_callBack(data){
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
			$('#send').css({color:"#ff6632"});
		    validCode=true;
		    $('#send').attr("disabled",false);
		        
				}
			},1000);

}

$('#loginBtn').on('click',function(){
	var mobile=$('#mobile').val();
	var msgNum=$('#msgNum').val();
	var checkCode=$('#checkCode').val();
	var user={'mobile':mobile,'msgNum':msgNum,'checkCode':checkCode}
	var s={'user':user}
	Ajax.action('sayogi', 'UserLoginForWX', JSON.stringify(s), submit_callBack);
	$.showIndicator();
});



/* 账号密码登录 */
$('#loginBtn2').on('click', function() {
	var loginName = $("#loginName").val();
	if (loginName == "") {
		$.toast("请输入用户名");
		$("#loginName").css("border","1px solid red");
		return;
	}

	var loginPwd = $("#loginPwd").val();
	if (loginPwd == "") {
		$.toast("请输入密码");
		$("#loginPwd").css("border","1px solid red");
		return;
	}

	submit(loginName, loginPwd);
})

function submit(loginName, loginPwd){
	var s = {
			'loginName': loginName,
			'password': loginPwd
		},
	info = JSON.stringify(s);

	Ajax.action('scm', 'ShopLoginForWeb', info, submit_callBack);
	$.showIndicator();
}

function submit_callBack(data){
	console.info(data);
	$.hideIndicator();
	var jsb = data;
	var result = jsb.result;
	if (result == "faild") {
		$("#mask").hide();
		$.toast(jsb.message);
		return;
	}
	window.location.href = "index.html";
}

document.onkeydown=function(event){
	var e = event || window.event || arguments.callee.caller.arguments[0];
	if(e && e.keyCode==13){ // enter 键
		submit();
	}
};

var pageEffects = {
	login_toggle: function(selector) {
        var anotherPage = (selector == '#loginPage') ? '#loginPage2' : '#loginPage';
        $(selector).addClass('page-current');
        $(anotherPage).removeClass('page-current');
    }
}

window.pageEffects = pageEffects;