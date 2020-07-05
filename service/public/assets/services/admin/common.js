// 个人信息
$('#loginInfo').on('click', function() {
    $('#infoMenu').slideToggle(30);
});
// 获取url栏指定参数
function getUrlParams(name) {
    // substr(1)去掉? split('&')以&分割成数组 ['name=xiaoming','age=20']
    var paramsAry = location.search.substr(1).split('&');
    // 循环
    for (var i = 0; i < paramsAry.length; i++) {
        // 按=再次分割成数组 ['name','xiaoming'],['age','20']
        var tmp = paramsAry[i].split('=');
        if (tmp[0] == name)
            return tmp[1];
    }
    return -1;
}
// 退出登陆
$('#logout').on('click', function() {
    if (confirm('您真的要退出登陆嘛？')) {
        $.ajax({
            type: 'post',
            url: '/logout',
            success: function() {
                location.href = 'login.html';
            }
        });
    }
});
// 获取用户登陆信息
$.ajax({
    type: 'get',
    url: '/users/' + userId,
    success: function(response) {
        // console.log(response);
        // 设置用户登陆的头像
        if (response.avatar)
            $('.profile .avatar').attr('src', response.avatar);
        // 设置用户登陆的用户名
        $('.profile .name').html(response.nickName);
    }
});

// 处理日期时间格式
function formatDate(date) {
    // 将日期时间字符串转换成日期对象
    date = new Date(date);
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
}