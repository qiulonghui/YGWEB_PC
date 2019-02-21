$(function(){
	// 切换头部文字
	var ygTitle =  $("header .yg-title");
	if(ygTitle.length){
		$("header .yg-title span").text(curTitle);
	}
});