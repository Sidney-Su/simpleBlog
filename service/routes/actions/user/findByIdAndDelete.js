const { User } = require('../../../model/User');
// 验证模块
const Joi = require('joi');
const path = require('path');
// 文件模块 
const fs = require('fs');
// util.promisify()。他将一个接收回调函数参数的函数转换成一个返回 Promise 的函数。
const { promisify } = require('util');

// 删除文件 程序使用 promisify() 转换基于回调函数的方法 fs.unlink() 成一个返回 promise 的一个函数
const unlink = promisify(fs.unlink);

module.exports = async(req, res) => {
    // 获取用户id
    // console.log(req.params); //是个对象
    const id = req.params['id'];
    // 对用户id进行验证 万一随便输个id
    const schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id不符合格式'));
    // 进行验证
    const { error } = Joi.validate(id, schema);
    // 没有通过验证 阻止程序执行
    if (error) return res.status(400).send({ message: error.message });

    // 通过验证 删除用户
    let user = await User.findByIdAndDelete(id);
    // 如果缩略图存在 删除缩略图(头像)
    if (user.avatar)
        await unlink(path.join(__dirname, '../', '../', 'public', user.avatar));
    // 将删除用户信息响应给客户端
    res.send(user);
}