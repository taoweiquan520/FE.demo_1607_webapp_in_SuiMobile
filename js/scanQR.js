/*扫描二维码*/
function scan_callback_f(data){}

$('#scanBtn').on('click', function() {
	app_open_scan("scan_callback_f");
})