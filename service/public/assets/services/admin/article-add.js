// 文章提交事件
$('#articleForm').on('submit', function() {
    // 获取用户输入数据
    var formData = $(this).serialize();
    $.ajax({
        type: 'post',
        url: '/articles',
        data: formData,
        success: function(response) {
            location.href = '/admin/article.html';
        }
    });
    return false;
});
// 图片上传
$('#articleBox').on('change', '#thumbnail', function() {
    // 创建表单提交对象
    var formData = new FormData();
    // 获取用户选中的图片
    formData.append('thumbnail', this.files[0]);
    // 发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(response) {
            console.log(response);
            // 预览
            $('#preview').attr('src', response[0].thumbnail);
            // 将图片地址存储在隐藏域中
            $('#hiddenThumbnail').val(response[0].thumbnail);
        }
    });
});

// 文章修改 获取文章id
var id = getUrlParams('id');
if (id != -1) {
    // 根据id查询文章
    $.ajax({
        type: 'get',
        url: '/articles/' + id,
        success: function(response) {
            console.log(response);
            var html = template('modifyArticleTpl', response);
            $('#articleBox').html(html);
        }
    });
}
// 修改提交
$('#articleBox').on('submit', '#articleModifyForm', function() {
    // 获取到输入内容
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/articles/' + id,
        data: formData,
        success: function(response) {
            // 修改完成 跳转文章列表页面
            location.href = '/admin/article.html';
        }
    });
    return false;
});