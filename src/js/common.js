$(function(){
	// 切换头部文字
	var ygTitle =  $("header .yg-title");
	if(ygTitle.length){
		$("header .yg-title span").text(curTitle);
	}

	//关闭模态框
	$(".yg-modal .modal-header .close").click(function(){
		$(".yg-modal").hide();
		$("body").css("overflow","auto")
	})
});