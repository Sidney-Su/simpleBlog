const mongoose = require('mongoose');
const Joi = require('joi');

// 创建文章集合规则
const ArticleSchema = new mongoose.Schema({
    // 标题
    title: {
        type: String,
        minlength: 2,
        maxlength: 50,
        required: [true, '请输入文章标题']
    },
    // 作者
    author: {
        // 文件作者就是User集合中的用户 需要关联
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // 创建时间
    createAt: {
        type: Date,
        default: Date.now
    },
    // 修改时间
    updateAt: {
        type: Date,
        default: Date.now
    },
    // 内容
    content: {
        type: String,
        default: null
    },
    // 缩略图
    thumbnail: {
        type: String,
        default: null
    },
    // 统计
    meta: {
        // 看过人数
        views: { type: Number, default: 0 },
        // 喜欢数量
        likes: { type: Number, default: 0 },
        // 收藏数量
        collection: { type: Number, default: 0 }
    }
}, { versionKey: false });
// 应用集合规则
const Article = mongoose.model('Article', ArticleSchema);

// 修改时间更新
ArticleSchema.pre('findOneAndUpdate', function(next) {
    this.findOneAndUpdate({}, { updateAt: Date.now() });
    next();
});

// 文章格式验证
const validateArticle = article => {
    // 定义对象验证规则
    const schema = {
        title: Joi.string().min(2).max(50).required().error(new Error('文章标题不符合规则')),
        //指定为任意类型 any()任意类型 empty()允许为空
        thumbnail: Joi.any().empty(),
        content: Joi.string()
    };
    //验证
    return Joi.validate(article, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    });
}

// 导出模块成员
module.exports = {
    Article,
    validateArticle
}