// 设置文章集合路由
const article = require('express').Router();

// 添加文字信息
article.post('/', require('./actions/article/create'));
// 根据id删除文章
article.delete('/:id', require('./actions/article/findByIdAndDelete'));
// 查询所有文章
article.get('/', require('./actions/article/find'));
// 查询文章数量
article.get('/count', require('./actions/article/count'));
// 文章点赞
article.post('/fabulous/:id', require('./actions/article/fabulous'));
// 文章搜索
article.get('/search/:key', require('./actions/article/search'));
// 根据文章id获取文章信息
article.get('/:id', require('./actions/article/findById'));
// 根据id修改文章
article.put('/:id', require('./actions/article/findByIdAndUpdate'));

// 导出
module.exports = article;