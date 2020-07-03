const { Comment } = require('../../../model/Comment');
const Joi = require('joi');

module.exports = async(req, res) => {
    // 获取评论id
    const id = req.params['id'];
    // 验证
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('评论id不符合格式'));
    const { error } = Joi.validate(id, schema);
    if (error) return res.status(400).send({ message: error.message });

    // 删除评论
    let comment = await Comment.findByIdAndDelete(id);
    res.send(comment);
}