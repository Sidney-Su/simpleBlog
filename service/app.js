// 导入express
const express = require('express');
// 导入路径模块
const path = require('path');
// 导入mongoose数据库
const mongoose = require('mongoose');
// 处理文件上传
const formidable = require('express-formidable');
const session = require('express-session');
// 创建web服务器
const app = express();
// 开放静态资源
app.use(express.static(path.join(__dirname, 'public')));

// session配置
app.use(session({
    secret: 'keyboard cat',
    //resave: 是指每次请求都重新设置 session cookie
    resave: false,
    //saveUninitialized: 是指无论有没有 session cookie ，每次请求都设置个 session cookie ，默认给的标示为 connect.sid。
    saveUninitialized: false,
    cookie: { // 有效期，单位是毫秒
        maxAge: 1000 * 60 * 60 * 24
    }
}));

// 处理post参数
app.use(formidable({
    // 文件上传目录
    uploadDir: path.join(__dirname, 'public', 'uploads'),
    // 最大上传文件为2M
    maxFilesSize: 2 * 1024 * 1024,
    // 保留文件扩展名
    keepExtensions: true
}));

// 连接数据库
mongoose.connect('mongodb://Sidney:123456@localhost:27017/jiandanBlog', {
        useFindAndModify: false,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log('数据库连接成功'))
    .catch(() => console.log('数据库连接失败'))

// 导入路由
require('./routes')(app);
/* 不能 require 一个文件夹。
    require (’./routes’); 默认指向的是 routes 下的 index.js 文件 如果这个文件不存在的话就会报错
    其实本质还是 require 文件的 */
/* 应该类似 模块将导出一个函数，该函数接受您的快速应用程序实例。 它立即调用该函数并传递app
var func = require('./app/routes.js');
func(app); */

// 监听端口
app.listen(3002, () => console.log('网站服务器启动成功'));