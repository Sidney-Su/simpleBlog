const mongoose = require('mongoose');
const Joi = require('joi');
// 模型规则类
const { Schema } = mongoose;
// 评论集合规则
const CommentSchema = new Schema({
    // 评论人
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 评论内容
    content: {
        type: String,
        minlength: 1,
        required: true
    },
    // 评论文章
    article: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Article',
        required: [true, '评论文章id不存在']
    },
    // 评论时间
    createAt: {
        type: Date,
        dafault: Date.now
    }
}, { versionKey: false });
// 应用规则
const Comment = mongoose.model('Comment', CommentSchema);

// 评论格式验证
const validateComment = comment => {
    // _id验证规则
    const objectIdReg = /^[0-9a-fA-F]{24}$/;
    // 定义对象验证规则
    const schema = {
        author: Joi.string().regex(objectIdReg).required().error(new Error('用户ID非法')),
        content: Joi.string().min(1).required().error(new Error('评论不符合格式要求')),
        article: Joi.string().regex(objectIdReg).required().error(new Error('评论文章ID非法'))
    };
    // 验证
    return Joi.validate(comment, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    });
}

// 导出模块成员
module.exports = {
    Comment,
    validateComment
}