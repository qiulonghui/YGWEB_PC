$(function () {
	// 切换头部文字
	var ygTitle = $("header .yg-title");
	if (ygTitle.length) {
		$("header .yg-title span").text(curTitle);
	}

	//关闭模态框
	window.closeModal = function (callback) {
		$(".yg-modal .modal-header .close").click(function () {
			$(".yg-modal").hide();
			$("body").css("overflow", "auto")
	
			if(callback&&callback instanceof Function){
				callback();
			}
		})
	}
	closeModal();

	//搜索推荐框
	$(".search-wrap input").focus(function () {
		$(".search-wrap .search-rec").show();
	})
	$(".search-wrap input").blur(function () {
		$(".search-wrap .search-rec").hide();
	})
	$(".search-rec .s-item").hover(function () {
		$(this).siblings("li").find("a").hide();
		$(this).siblings("li").find(".s-text").show();
		$(this).find('a').show();
		$(this).find('.s-text').hide();
	})

	//等级经验长度
	var $pg = $(".user-info .pg");
	var level = $pg.data("pg");
	var percent = Number(level) / 5 * 100;
	$pg.width(percent + "%");

	//顶部导航
	function nav() {
		if ($('.nav-list').length) {
			var $liCur = $(".nav-list>li.active"),
				curP = $liCur.position().left,
				curW = $liCur.outerWidth(true),
				$slider = $(".nav-line"),
				$targetEle = $(".nav-list>li:not('.last')"),
				$navBox = $(".nav-list");

			$slider.stop(true, true).animate({
				"left": curP,
				"width": curW
			});
			$targetEle.mouseenter(function () {
				var $_parent = $(this); //.parent(),
				_width = $_parent.outerWidth(true),
					posL = $_parent.position().left;
				$slider.stop(true, true).animate({
					"left": posL,
					"width": _width
				}, "fast");
			});
			$navBox.mouseleave(function (cur, wid) {
				cur = curP;
				wid = curW;
				$slider.stop(true, true).animate({
					"left": cur,
					"width": wid
				}, "fast");
			});
		}
	};
	nav();

	function regAndLogin() {
		// 登陆模态框
		$("header .login-btn").click(function () {
			$(".login-modal").show();
			$("body").css("overflow", "hidden")
		})
		// show注册模态框
		$("header .regist-btn").click(function () {
			$(".regist-modal").show();
			$("body").css("overflow", "hidden")
		})

		$(".regist-modal .input").focus(function () {
			$(this).parent(".input-box").addClass("pressed");
		})
		$(".regist-modal .input").blur(function () {
			$(this).parent(".input-box").removeClass("pressed");
		})
	}

	regAndLogin();

});