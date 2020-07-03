const { User } = require('../../../model/User');
const Joi = require('joi');

module.exports = async(req, res) => {
    // 获取id
    let id = req.params.id;
    // 对用户id进行验证
    let schema = Joi.string().required().regex(/^[0-9a-fA-F]{24}$/).error(new Error('用户id不符合格式'));
    // 进行验证
    const { error } = Joi.validate(id, schema);
    if (error) return res.status(400).send({ message: error.message });

    // 根据id查询用户信息
    let user = await User.findById(id).select('-password');
    res.send(user);
}