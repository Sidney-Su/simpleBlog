// 渲染用户到列表
$.ajax({
    type: 'get',
    url: '/users',
    success: function(response) {
        console.log(response);
        // 显示总数量
        $('#userCount').html(`找到 ${response.total} 个用户`);
        // 用户列表渲染
        var html = template('userTpl', response);
        $('#userTbody').html(html);
        // 分页渲染
        var page = template('userPage', response);
        $('#page').html(page);
    },
    error: function(response) {
        alert(response.responseJSON.message);
    }
});
// 删除按钮
$('#userTbody').on('click', '.delBtn', function() {
    // 询问管理员是否删除此用户 以免误点
    if (confirm('您真的要删除此用户嘛？')) {
        // 获取id
        var id = $(this).attr('data-id');
        // 删除用户
        $.ajax({
            type: 'delete',
            url: '/users/' + id,
            success: function() {
                location.reload();
            },
            error: function() {
                alert('删除用户失败');
            }
        });
    }
});
// 数据分页
function changePage(page) {
    // 像服务器发送请求 获取当前页用户数据
    $.ajax({
        type: 'get',
        url: '/users',
        data: { page: page },
        success: function(response) {
            // 用户列表渲染
            var html = template('userTpl', response);
            $('#userTbody').html(html);
            // 分页渲染
            var page = template('userPage', response);
            $('#page').html(page);
        }
    });
}