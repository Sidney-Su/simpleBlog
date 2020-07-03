// 创建用户集合规则
const mongoose = require('mongoose');
// 引入验证模块joi
const Joi = require('joi');
// 密码加密 hash密码
const bcrypt = require('bcryptjs');

// 创建规则
const UserSchema = new mongoose.Schema({
    // 昵称、密码、邮箱、头像、角色、状态
    nickName: { //昵称
        type: String,
        required: true,
        minlength: 2,
        maxlength: 10
    },
    email: {
        type: String,
        require: true,
        unique: true //指定唯一索引
    },
    password: {
        type: String,
        required: true //对盐加密后长度会很长 所以不在插入数据库设置规则 只需要设置注册和登录时验证长度就行
    },
    role: {
        type: String,
        // admin 管理员 normal 普通用户
        default: 'normal',
        enum: ['admin', 'normal']
    },
    avatar: { //头像
        type: String,
        default: null
    },
    cretaeTime: {
        type: Date,
        default: Date.now
    },
    status: {
        // 0 未激活 1 激活
        type: Number,
        required: true,
        default: 1
    }
}, { versionKey: false }); //不自动生成_v版本信息

// 使用集合规则
const User = mongoose.model('User', UserSchema);

// 注册数据格式进行校验
const validateUser = user => {
    // 定义验证规则
    const schema = {
        nickName: Joi.string().min(2).max(10).required().error(new Error('用户名不符合验证规则')),
        email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱不符合验证规则')),
        password: Joi.string().regex(/^[\w]{3,16}$/).required().error(new Error('密码不符合验证规则')),
        status: Joi.number().valid(0, 1), //规定只能取0或1
        role: Joi.string().valid('normal', 'admin')
    };
    // 进行验证
    return Joi.validate(user, schema, {
        // 检测到所有错误
        abortEarly: false,
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    });
}

// 登录数据格式校验
const validateLogin = user => {
    // 定义对象验证规则
    const schema = {
        email: Joi.string().regex(/^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/).required().error(new Error('邮箱或密码错误')),
        password: Joi.string().regex(/^[\w]{3,16}$/).required().error(new Error('邮箱或密码错误'))
    };
    // 进行验证
    return Joi.validate(user, schema, {
        //检测到错误立即返回
        abortEarly: true
    });
}

// 如果数据库中没有账户 创建一个默认管理员账户
User.findOne({ 'email': 'sidney@qq.com' }).then(async result => {
    // 没查询到 说明没有此用户 创建一个默认的
    if (result == null) {
        // 生成盐 默认为10
        const salt = await bcrypt.genSalt(10);
        // 使用盐进行加密
        const password = await bcrypt.hash('123456', salt);

        // 创建默认管理员用户
        const user = await User.create({
            nickName: 'Sideny',
            email: 'sidney@qq.com',
            password: password,
            role: 'admin',
            avatar: null,
            cretaeTime: new Date,
            status: 1
        });
    }
});

// 导出对象
module.exports = {
    User,
    validateUser,
    validateLogin
}