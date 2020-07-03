const { Article } = require('../../../model/Article');
const Joi = require('joi');

module.exports = async(req, res) => {
    // 获取文章id
    const id = req.params['id'];
    // 对id进行验证
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id不符合格式'));
    const { error } = Joi.validate(id, schema);
    if (error) return res.status(400).send({ message: error.message });

    // 查询文章id
    const article = await Article.findById({ _id: id }).populate('author');
    // console.log(article);
    // 增加文章阅读量
    article.meta.views = article.meta.views + 1;
    // 保存
    await article.save();
    return res.send(article);
}