$(function () {
    // 切换头部文字
    var ygTitle = $("header .yg-title");
    if (ygTitle.length) {
        $("header .yg-title span").text(curTitle);
    }

    // 模态框关闭按钮事件绑定
    ygModalInit = function () {
        $(".yg-modal .modal-header .close").click(function () {
            $(".yg-modal").hide();
            $("body").css("overflow", "auto")
        })
    }
    ygModalInit();

    // 模态框 show 方法
    window.ygModalShow = function (selector) {
        var $dom = $(selector);
        $dom.show();
        $("body").css("overflow", "hide");
    }

    // 模态框 hide 方法
    window.ygModalHide = function (selector) {
        var $dom = $(selector);
        $dom.hide();
        $("body").css("overflow", "auto");
    }

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
    var $pg = $(".progress .pg");
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
        // show登陆模态框
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

    // 密码框初始化绑定事件
    // 可传入一个回调函数
    function pswModalInit() {
        $(".passw-modal #rel-psw").on('input', function () {
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

    pswModalInit();

    // 信息弹出提示
    // ygToast(content)
    window.ygToast = function (content) {
        var dom = '<div class="yg-toast">' + content + '</div>';
        $('body').append(dom);
        var ygToast = $(".yg-toast");
        ygToast.show().css('top', '188px');
        setTimeout(function () {
            $('body>.yg-toast').remove();
        }, 3500)
    }

    // 询问框
    window.ygConfirm = function (content, callback) {
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
            if(callback && callback instanceof Function) {
                callback();
            }
        })
    }

});