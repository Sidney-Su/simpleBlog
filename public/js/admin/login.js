//  关闭页面，也可以显示用户名，所以用到localStorage
//  打开页面，先判断是否有这个用户名，如果有，就在表单里面显示用户名，并且勾选复选框
//  当复选框发生改变的时候 change事件
//  如果勾选，就存储，否则就移除
let email = $('#email');
let remember = $('#remember');
if (localStorage.getItem('email')) {
    email.val(localStorage.getItem('email'));
    remember.prop('checked', true);
}
remember.on('change', function() {
    if ($(this).prop('checked')) {
        localStorage.setItem('email', email.val());
    } else {
        localStorage.removeItem('email')
    }
});

var flag = true;
$('#pwd').on('click', function() {
    if (flag) {
        flag = false;
        $(this).html('');
        $(this).siblings('#password').attr('type', 'text');
    } else {
        flag = true;
        $(this).html('');
        $(this).siblings('#password').attr('type', 'password');
    }
});