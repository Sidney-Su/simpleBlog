// 查询所有文章信息
$.ajax({
    type: 'get',
    url: '/articles',
    success: function(response) {
        console.log(response);
        // 显示总数量
        $('#articleCount').html(`一共发布了 ${response.total} 篇文章`);
        // 渲染文章信息
        var html = template('articleTpl', response);
        $('#articleTbody').html(html);
        // 渲染分页
        var page = template('articlePageTpl', response);
        $('#articlePage').html(page);
    }
});
// 数据分页
function changePage(page) {
    console.log(page);
    // 像服务器发送请求 获取当前页用户数据
    $.ajax({
        type: 'get',
        url: '/articles',
        data: { page: page },
        success: function(response) {
            // 渲染文章信息
            var html = template('articleTpl', response);
            $('#articleTbody').html(html);
            // 渲染分页
            var page = template('articlePageTpl', response);
            $('#articlePage').html(page);
        }
    });
}
// 删除
$('#articleTbody').on('click', '.delBtn', function() {
    if (confirm('您真的要删除此文章码？')) {
        // 获取id
        var id = $(this).attr('data-id');
        // 删除
        $.ajax({
            type: 'delete',
            url: '/articles/' + id,
            success: function(response) {
                location.reload();
            }
        });
    }
});