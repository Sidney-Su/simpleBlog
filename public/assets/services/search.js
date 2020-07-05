// 获取到浏览器地址栏中的搜索关键字
var key = getUrlParams('key');

$.ajax({
    type: 'get',
    url: '/articles/search/' + key,
    success: function(response) {
        console.log(response);
        var html = template('searchTpl', { data: response });
        $('#lastedBox').html(html);
    },
    error: function(result) {
        alert('您的输入有误');
    }
});