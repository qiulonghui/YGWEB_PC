// // 切换头部文字
function titleInit() {
	var ygTitle = $("header .yg-title");
	if (ygTitle.length) {
		$("header .yg-title span").text(curTitle);
	}
}

// 模态框关闭按钮事件绑定
function ygModalInit() {
	$(".yg-modal .modal-header .close").click(function () {
		$(".yg-modal").hide();
		$("body").css("overflow", "auto")
	})
}
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

//用户经验长度初始化
function progress() {
	var $pg = $(".progress .pg");
	var level = $pg.data("pg");
	var percent = Number(level) / 5 * 100;
	$pg.width(percent + "%");
}

//游戏搜索推荐框初始化
function searchBox() {
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
}

// 公共头部登录注册模态框事件绑定 
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

// 密码框初始化绑定事件
function pswModalInit() {
	$(".passw-modal #rel-psw").on('keyup', function () {
		var pwd = $(this).val().trim();
		var $input = $(".pw-box>.item");
		var len = pwd.length;

		// input 输入值
		for (var i = 0; i < pwd.length; i++) {
			$input.eq(i).val(pwd[i])
		}

		// 将有值的当前input后的所有input清空
		$input.each(function () {
			var index = $(this).index();
			if (index >= len) {
				$(this).val("");
			}
		});
		// if (len === 6) {
		// 	//执行其他操作
		// 	if(callback&&callback instanceof Function){
		// 		callback();
		// 	}
		// }
	})

	$(".passw").click(function () {
		$("#rel-psw").focus();
	})
}

//用户是否选择记住密码
function rembPsw() {
	$(".rem_password").click(function () {
		if ($('.rem_password').prop('checked')) {
			$(this).prop('checked', true);
			$(this).val(1);
		} else {
			$(this).prop('checked', false);
			$(this).val(0);
		}

	});
}


/** 供外部调用的方法 */

// 模态框显示
function ygModalShow(selector) {
	var $dom = $(selector);
	$dom.show();
	$("body").css("overflow", "hide");
}

// 模态框隐藏
function ygModalHide(selector) {
	var $dom = $(selector);
	$dom.hide();
	$("body").css("overflow", "auto");
}

// 信息弹出提示方法
// ygToast(111)
function ygToast(content) {
	var dom = '<div class="yg-toast">' + content + '</div>';
	$('body').append(dom);
	var ygToast = $(".yg-toast");
	ygToast.show().css('top', '138px');
	setTimeout(function () {
		$('body>.yg-toast').remove();
	}, 3500)
}

// 询问框
function ygConfirm(content, callback) {
	var dom =
		`<div class="yg-modal yg-confirm" style="display:block">
		<div class="modal-dialog">
			<div class="modal-content">
				<div class="modal-header">
					<div class="modal-title">提示</div>
					<button class="close"></button>
				</div>
				<div class="modal-body">${content}</div>
				<div class="modal-footer">
					<button class="primary submit">确定</button>
					<button class="concal">取消</button>
				</div>
			</div>
		</div>
	</div>`

	$('body').append(dom);
	$("body").css("overflow", "hidden");
	// 取消
	$(".yg-confirm .concal, .yg-confirm .close").click(function () {
		var $ygConfirm = $('.yg-confirm');
		$ygConfirm.hide();
		$("body").css("overflow", "auto");
		$ygConfirm.remove();
	})

	// 确定
	$(".yg-confirm .submit").click(function () {
		var $ygConfirm = $('.yg-confirm');
		$ygConfirm.hide();
		$("body").css("overflow", "auto");
		$ygConfirm.remove();
		if (callback && callback instanceof Function) {
			callback();
		}
	})
}

// 错误信息
function errorInfo(text) {
	var dom = '<div class="yg-error">' + text + '</div>';
	return dom;
}

// 表单验证方法
// type: require验证必填   phone手机验证 email邮箱验证  passw密码验证
function verification(inputVal, type) {
	inputVal = inputVal || '';
	inputVal = inputVal.trim(); //去除多余空格
	var obj = {
		require: function () {
			if (inputVal === '') {
				return false;
			} else {
				return true;
			}
		},
		phone: function () {
			var reg = /^1[34578]\d{9}$/;
			if (!reg.test(inputVal)) {
				return false;
			} else {
				return true;
			}
		},
		email: function () {
			var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;
			if (!reg.test(inputVal)) {
				return false;
			} else {
				return true;
			}
		},
		passw: function () {
			var reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/;
			if (inputVal.length < 6 || inputVal.length > 20) {
				return false;
			} else if (!reg.test(inputVal)) {
				return false;
			} else {
				return true;
			}
		}
	}
	return obj[type]();
}


// 获取时间getDate()，格式YYYY-MM-DD。
// 默认以美东时间计算 北京时间+12小时
// 客户端时间-（用户时区+4）= 美东时间
// nowDayStart nowDayEnd 当天开始结束时间
// weekStartDate weekEndDate 本周开始结束时间
// lastWeekStartDate lastWeekEndDate 上周开始结束时间
// lastMonthStartDate lastMonthEndDate 上月开始结束时间
// nowMonthStartDate nowMonthEndDate 本月开始结束时间
function getDate(type,zone) {
	zone = zone||"md"; //默认计算时间为美东时间
	var now = new Date();
	var nowDayOfWeek = now.getDay() - 1; // 今天是本周的第几天 以周一为第一天
	var nowYear = now.getFullYear(); // 当前年
	var nowMonth = now.getMonth(); // 当前月
	var nowDay = now.getDate(); // 当前日
	var nowHour = now.getHours() // 当前时区 小时
	var lastMonthDate = new Date(); //上月日期
	lastMonthDate.setDate(1);
	lastMonthDate.setMonth(lastMonthDate.getMonth() - 1);
	var lastMonth = lastMonthDate.getMonth();
	var nTimezone = -now.getTimezoneOffset() / 60; // 获取当前时区

	if (zone==="md") {
		var mdHour = nowHour - (nTimezone + 4); // 根据当前时区 小时 转换成 美东时区 小时

		if (mdHour < 0) {
			nowDay = nowDay - 1; //mdHour < 0,美东时间要减一天
		}
		if (mdHour >= 24) {
			nowDay = nowDay + 1; //mdHour > 24 美东时间要加一天
		}
	}

	if (zone==="bj") {
		var bjHour = mdHour + 12; // 美东时区 小时 加12小时 为北京时间 小时
		
		if (bjHour >= 24) {
			nowDay = nowDay + 1; //bjHour > 24 北京时间要加一天
		}
	}


	// 格式化YYYY-MM-DD
	function formatDate(date) {
		var myyear = date.getFullYear();
		var mymonth = date.getMonth() + 1;
		var myweekday = date.getDate();
		var myHour = date.getHours();
		var myMinutes = date.getMinutes();
		var mySeconds = date.getSeconds();
		if (mymonth < 10) {
			mymonth = "0" + mymonth;
		}
		if (myweekday < 10) {
			myweekday = "0" + myweekday;
		}
		if (myHour < 10) {
			myHour = "0" + myHour;
		}
		if (myMinutes < 10) {
			myMinutes = "0" + myMinutes;
		}
		if (mySeconds < 10) {
			mySeconds = "0" + mySeconds;
		}
		return (myyear + "-" + mymonth + "-" + myweekday + " " + myHour + ":" + myMinutes + ":" + mySeconds);
	}

	//获得某月的天数
	function getMonthDays(myMonth) {
		var monthStartDate = new Date(nowYear, myMonth, 1);
		var monthEndDate = new Date(nowYear, myMonth + 1, 1);
		var days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
		return days;
	}

	var obj = {
		nowDayStart: function () {
			var nowDayStart = new Date(nowYear, nowMonth, nowDay, 0, 0, 0);
			return formatDate(nowDayStart);
		},
		nowDayEnd: function () {
			var nowDayEnd = new Date(nowYear, nowMonth, nowDay, 23, 59, 59);
			return formatDate(nowDayEnd);
		},
		weekStartDate: function () {
			var weekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek, 0, 0, 0);
			return formatDate(weekStartDate)
		},

		weekEndDate: function () {
			var weekEndDate = new Date(nowYear, nowMonth, nowDay + (6 - nowDayOfWeek), 23, 59, 59);
			return formatDate(weekEndDate);
		},
		lastWeekStartDate: function () {
			var lastWeekStartDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 7, 0, 0, 0);
			return formatDate(lastWeekStartDate);
		},
		lastWeekEndDate: function () {
			var lastWeekEndDate = new Date(nowYear, nowMonth, nowDay - nowDayOfWeek - 1, 23, 59, 59);
			return formatDate(lastWeekEndDate);
		},
		lastMonthStartDate: function () {
			var lastMonthStartDate = new Date(nowYear, lastMonth, 1, 0, 0, 0);
			return formatDate(lastMonthStartDate);
		},
		lastMonthEndDate: function () {
			var lastMonthEndDate = new Date(nowYear, lastMonth, getMonthDays(lastMonth), 23, 59, 59);
			return formatDate(lastMonthEndDate);
		},
		nowMonthStartDate: function () {
			var nowMonthStartDate = new Date(nowYear, nowMonth, 1, 0, 0, 0);
			return formatDate(nowMonthStartDate);
		},
		nowMonthEndDate: function () {
			var nowMonthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth), 23, 59, 59);
			return formatDate(nowMonthEndDate);
		}

	}
	return obj[type]();
}


/** 供外部调用的方法END */

$(function () {
	// 一些初始化方法调用
	titleInit();

	ygModalInit();

	searchBox();

	nav();

	progress();

	regAndLogin();

	pswModalInit();

	rembPsw();
});