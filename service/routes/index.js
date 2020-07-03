// 路由集合
module.exports = app => {
    // 用户路由集合 所有访问/users的路由全部交给user.js处理
    app.use('/users', require('./user'));
}