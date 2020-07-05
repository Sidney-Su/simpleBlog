var articleId = getUrlParams('articleId');
// 根据id获取文章
$.ajax({
    type: 'get',
    url: '/articles/' + articleId,
    success: function(response) {
        console.log(response);
        var html = template('articleTpl', response);
        $('#articleBox').html(html);
    }
});
// 点赞功能
$('#articleBox').on('click', '#likes', function() {
    $.ajax({
        type: 'post',
        url: '/articles/fabulous/' + articleId,
        success: function() {
            alert('感谢您的支持');
            location.reload();
        }
    });
});
// 评论渲染
$.ajax({
    type: 'get',
    url: '/comments/lasted/' + articleId,
    success: function(response) {
        $('#commentsCount').html(`全部评论(${response.length})`);
        console.log(response);

        // 渲染到评论区
        var comment = template('commentTpl', { data: response });
        $('#commentBox').html(comment);
    }
});
// 未登陆不能评论
if (!isLogin) {
    $('#hideComment').hide();
} else {
    $('#warning').hide();
}
// 开始评论
$('#commentForm').on('submit', function() {
    // 获取用户输入的评论内容
    var content = $(this).find('textarea').val();
    // 添加评论
    $.ajax({
        type: 'post',
        url: '/comments',
        data: {
            content: content,
            article: articleId
        },
        success: function(response) {
            alert('评论成功');
            // 刷新页面
            location.reload();
        },
        error: function(errInfo) {
            alert(errInfo.responseJSON.message);
        }
    });
    return false;
});