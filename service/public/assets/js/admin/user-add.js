// 表单验证
var requser = /^[\u4e00-\u9fa5]{2,8}|[\w]{2,10}$/;
var reqemail = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
var reqpwd = /^[\w]{6,16}$/;

// 匹配规则
regexp(requser, $('#username'));
regexp(reqemail, $('#email'));
regexp(reqpwd, $('#password'));

// 表单验证的函数
function regexp(reg, ele) {
    ele.on('blur', function() {
        var spans = $(this).siblings('span');
        if (reg.test($(this).val())) {
            // console.log('正确');
            spans.removeClass().addClass('success success_icon');
            spans.html('<i style="font-style: normal;"></i> 恭喜您输入正确');
        } else {
            // console.log('错误');
            spans.removeClass().addClass('error error_icon');
            spans.html('<i style="font-style: normal;"></i> 格式不正确');
        }
    });
}