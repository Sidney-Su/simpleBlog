// 添加用户
$('#userForm').on('submit', function() {
    // 获取用户在表单输入的内容
    var formData = $(this).serialize();
    // console.log(formData);
    // 发生请求
    $.ajax({
        type: 'post',
        url: '/users',
        data: formData,
        success: function(response) {
            location.href = '/admin/user.html';
        },
        error: function(response) {
            alert(response.responseJSON.message);
        }
    });

    return false;
});
// 当用户上传头像 修改用户也需要图片设置
$('#userBox').on('change', '#avatar', function() {
    // 创建表单提交对象
    var formData = new FormData();
    // 获取用户选中的图片
    formData.append('avatar', this.files[0]);

    // 发送请求
    $.ajax({
        type: 'post',
        url: '/upload',
        data: formData,
        // 告诉$ajax()不要解析请求参数
        processData: false,
        // 告诉$.ajax()不要设置请求参数类型
        contentType: false,
        success: function(response) {
            // console.log(response);
            // 头像预览
            $('#preview').attr('src', response[0].avatar);
            // 将图片地址存储在隐藏域中
            $('#hiddenAvatar').val(response[0].avatar);
        },
        error: function(response) {
            alert(response.responseJSON.message);
        }
    });
});
// 修改用户 当url栏有id值说明是修改
var id = getUrlParams('id');
console.log(id);

if (id != -1) {
    console.log(11);

    // 修改用户信息
    // 根据id值获取到数据
    $.ajax({
        type: 'get',
        url: '/users/' + id,
        success: function(response) {
            // console.log(response);
            // 将修改用户信息渲染到页面
            var html = template('modifyTpl', response);
            $('#userBox').html(html);
        }
    });
}
// 当修改文章信息表单发生提交行为的时候
$('#userBox').on('submit', '#modifyForm', function() {
    // 获取用户在表单输入的内容
    var formData = $(this).serialize();
    // 获取要修改的那个用户的id值
    var id = $(this).attr('data-id');
    // 发生请求
    $.ajax({
        type: 'put',
        url: '/users/' + id,
        data: formData,
        success: function(response) {
            location.href = '/admin/user.html';
        },
        error: function(response) {
            alert(response.responseJSON.message);
        }
    });
    return false;
});