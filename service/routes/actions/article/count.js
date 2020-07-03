const { Article } = require('../../../model/Article');

module.exports = async(req, res) => {
    // 查询所有文章数量
    const articleCount = await Article.countDocuments();
    // 注意：要响应一个对象
    res.send({ articleCount });
}