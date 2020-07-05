const { Article, validateArticle } = require('../../../model/Article');

module.exports = async(req, res) => {
    // 文章格式验证
    console.log(req.fields);
    const { error } = validateArticle(req.fields);

    if (error) return res.status(400).send({ message: error.message });
    // 添加作者 登陆状态的_id
    req.fields.author = req.session.userInfo._id;
    // 创建文章
    const article = new Article(req.fields);
    // 保存
    await article.save();
    // 响应
    res.send(article);
}