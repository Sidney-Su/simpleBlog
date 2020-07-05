$('#modifyPwdForm').on('submit', function() {
    // 获取用户在表单中输入的内容
    var formData = $(this).serialize();
    $.ajax({
        type: 'put',
        url: '/users/password',
        data: formData,
        success: function() {
            location.href = '/admin/login.html';
        },
        error: function(response) {
            alert(response.responseJSON.message);
        }
    });
    return false;
});