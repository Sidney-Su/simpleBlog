// 导入用户集合与注册校验
const { User, validateUser } = require('../../../model/User');
// 密码加密模块
const bcrypt = require('bcryptjs');
// 辅助工具
const _ = require('lodash');
// 创建用户
module.exports = async(req, res) => {
    // 用户名、密码、邮箱、头像、角色、状态
    // 数据格式校验
    // console.log(req);
    // console.log(req.fields); //注意：req.fields的参数值是从body中传过来的
    // return;


    const { error } = validateUser(req.fields);
    // // 如果格式不符合要求 阻止向下执行 并响应错误信息
    if (error) return res.status(400).send({ message: error.message });

    // 格式符合要求 继续执行
    // 查询用户 看看邮箱是否被注册
    let user = await User.findOne({ email: req.fields.email });
    // 如果查询到了 说明用户已存在 邮箱已被使用
    if (user) return res.status(400).send({ message: '邮箱已被注册' });

    // 用户不存在 创建新用户
    // 生成盐
    const salt = await bcrypt.genSalt(10);
    // 使用盐对密码加密
    req.fields.password = await bcrypt.hash(req.fields.password, salt);
    // 创建新用户
    user = new User(req.fields);
    // 保存用户
    await user.save();
    // 将创建好的用户信息响应给客户端
    // _.pick(object, *keys) 返回一个只有列入挑选 key 属性的对象
    res.send(_.pick(user, ['_id', 'email', 'nickName', 'role', 'avatar', 'createTime', 'status']));
}