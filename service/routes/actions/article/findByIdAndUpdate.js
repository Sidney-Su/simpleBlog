const { Article } = require('../../../model/Article');
const Joi = require('joi');

module.exports = async(req, res) => {
    // 获取文章id
    const id = req.params['id'];
    // 验证id格式
    if (!/^[0-9a-fA-F]{24}$/.test(id)) return res.status(400).send({ message: '文章ID不合法' })
        /* const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id不符合格式'));
        const { error } = Joi.validate(id, schema);
        if (error) return res.status(400).send({ message: error.message }); */


    // 更改文章信息
    let article = await Article.findByIdAndUpdate(id, { $set: req.fields }, { new: true });
    return res.send(article);
}