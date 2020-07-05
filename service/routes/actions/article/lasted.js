const { Article } = require('../../../model/Article');

module.exports = async(req, res) => {
    // 查询文章信息
    const article = await Article.find().sort().populate('author', '-password').limit(5);
    res.send(article);
}