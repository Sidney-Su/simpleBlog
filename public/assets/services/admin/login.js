// 选择登录按钮并为其添加点击事件
$('#loginBtn').on('click', function() {
    // 获取用户输入的邮箱地址和密码
    var email = $('#email').val();
    var pwd = $('#password').val();
    // 判断用户是否输入了邮箱地址和密码
    if (email.trim().length == 0) {
        alert('请输入邮箱地址');
        return;
    }
    if (pwd.trim().length == 0) {
        alert('请输入登陆密码');
        return;
    }

    // 向服务器发送请求
    $.ajax({
        type: 'post',
        url: '/login',
        data: {
            email: email,
            password: pwd
        },
        success: function(response) {
            // 登录成功  对用户的角色进行判断 如果是管理员就跳转到数据管理的首页面
            // 如果是普通用户 就跳转到网站的首页面
            if (response.role == 'admin')
                location.href = '/admin/user.html';
            else
                location.href = '/index.html';
        },
        error: function(response) {
            // console.log(response);
            // console.log(response.responseJSON.message); //返回的是JSON格式

            // 登录失败
            alert('用户名或者密码错误');
        }
    });
    return false;
});