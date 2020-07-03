const { Article } = require('../../../model/Article');
const Joi = require('joi');

// 文件模块
const fs = require('fs');
// 路径
const path = require('path');
// 将fs方法改造为promise方法 使其可以调用API
const { promisify } = require('util');
// 删除文件
const unlink = promisify(fs.unlink);

module.exports = async(req, res) => {
    // 获取到文章id
    const id = req.params['id'];
    // 验证id规则
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('id不符合格式'));
    // 验证
    const { error } = Joi.validate(id, schema);
    if (error) return res.status(400).send({ message: error.message });

    // 通过验证 删除文章信息
    let article = await Article.findByIdAndDelete(id);
    console.log(article);
    // 如果缩略图存在 也需要删除
    if (article.thumbnail) {
        // 删除缩略图
        await unlink(path.join(__dirname, '../', '../', 'public', article.thumbnail));
    }
    // 响应
    return res.send(article);
}