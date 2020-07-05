const { Comment } = require('../../../model/Comment');
const Joi = require('joi');

module.exports = async(req, res) => {
    // 获取文章id
    const id = req.params['id'];

    // 验证
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('文章id不符合格式'));
    const { error } = Joi.validate(id, schema);
    if (error) return res.status(400).send({ message: error.message });
    // // 查询评论信息并排序 限制每次只能显示5条
    // const comments = await Comment.find().populate('author', '-password').sort('-createAt').limit(5);
    const comments = await Comment.find({ article: id }).populate('author', '-password').sort('-createAt').limit(5);
    // console.log(comments);

    res.send(comments);

}