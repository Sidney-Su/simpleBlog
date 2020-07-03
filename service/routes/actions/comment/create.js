const { Comment, validateComment } = require('../../../model/Comment');
const { Article } = require('../../../model/Article');

module.exports = async(req, res) => {
    // 要求：用户登陆状态才能评论
    if (req.session.userInfo) {
        // 存储评论人信息 登陆用户的id
        req.fields.author = req.session.userInfo._id;
        // 数据校验
        const { error } = validateComment(req.fields);
        if (error) return res.status(400).send({ message: error.message });
        // 创建评论
        const comment = new Comment(req.fields);
        // 保存评论
        await comment.save();
        // 找到被评论的文章
        let article = await Article.findOne({ _id: req.fields.article });
        // 修改评论数量
        article.meta.comments = article.meta.comments + 1;
        // 保存文章数据
        await article.save();
        // 响应
        res.send(comment);
    } else {
        res.status(400).send({ message: '请登录后再评论' });
    }
}