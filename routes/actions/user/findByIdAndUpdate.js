const { User } = require('../../../model/User');
// 工具
const _ = require('lodash');
// 验证模块
const Joi = require('joi');

module.exports = async(req, res) => {
    // 修改个人信息 有几个是不能修改的：id值、密码(单独修改)、邮箱
    // console.log(req.fields);
    // 将密码、邮箱字段抛除
    req.fields = _.pick(req.fields, ['nickName', 'role', 'avatar', 'status']);
    // console.log(req.fields._id); //拿不到_id 用户根本不会输入_id

    // 获取到id req.params['id'] 也可以
    req.fields._id = req.params.id;
    // 定义规则验证id
    const schema = {
        _id: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id非法'))
    };
    // 验证
    const { error } = Joi.validate(req.fields, schema, {
        // 允许对象包含被忽略的未知键
        allowUnknown: true
    });
    //如果没通过验证 阻止向下运行
    if (error) return res.status(400).send({ message: error.message });

    // 更新用户信息 根据id修改数据库中数据 不能修改密码和邮箱
    // $set	设置字段值
    // new: true 返回修改后的文档 默认值为false 返回原始文档
    // fields: '-password'} 从返回值中抛除密码字段
    let user = await User.findByIdAndUpdate(req.fields._id, { $set: req.fields }, { new: true, fields: '-password' });
    res.send(user);
}