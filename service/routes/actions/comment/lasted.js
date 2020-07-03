const { Comment } = require('../../../model/Comment');

module.exports = async(req, res) => {
    // 查询评论信息并排序 限制每次只能显示5条
    const comments = await Comment.find().populate('author', '-password').sort('-createAt').limit(5);
    res.send(comments);
}