$(window).scroll(function () {
    var scrollTop = $(document).scrollTop();
    if (scrollTop >= 40) {
        $("#back_up").show();
    } else {
        $("#back_up").hide();
    }
});
$("#back_up").click(function () { //注意这里要把返回顶部按钮点击事件放在
    $('html,body').animate({ //scroll方法外面,否则点击后会持续调用
        scrollTop: 0
    }, 300);
})