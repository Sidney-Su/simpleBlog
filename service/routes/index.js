// 路由集合
module.exports = app => {
    // 用户路由集合 所有访问/users的路由全部交给user.js处理
    app.use('/users', require('./user'));
    // 文章路由集合 
    app.use('/articles', require('./article'));
    // 评论
    app.use('/comments', require('./comment'));

    // 其他
    // 用户登录
    app.post('/login', require('./actions/other/login'));
    // 用户退出
    app.post('/logout', require('./actions/other/logout'));
    // 判断用户是否登录
    app.get('/login/status', require('./actions/other/loginStatus'));
    // 图片文件上传
    app.post('/upload', require('./actions/other/upload'));
}