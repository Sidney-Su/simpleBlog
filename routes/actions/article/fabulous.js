const { Article } = require('../../../model/Article');

module.exports = async(req, res) => {
    // 获取文章id
    const id = req.params['id'];
    // 查询用户信息 只查询meta信息
    const article = await Article.findOne({ _id: id }).select('meta');
    // console.log(article);
    // 文章的赞数量+1
    article.meta.likes = article.meta.likes + 1;
    // 保存
    await article.save();
    res.send(article);
}