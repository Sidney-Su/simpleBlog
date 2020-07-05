$.ajax({
    type: 'get',
    url: 'articles/lasted',
    success: function(response) {
        console.log(response);
        var html = template('lastedTpl', { data: response });
        $('#lastedBox').html(html);
    }
});