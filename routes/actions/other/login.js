// 用户集合 用户登录验证
const { User, validateLogin } = require('../../../model/User');
// hash密码对登录密码进行验证
const bcrypt = require('bcryptjs');
const _ = require('lodash');

module.exports = async(req, res) => {
    // 对用户传过来的数据格式进行验证
    const { error } = validateLogin(req.fields);
    if (error) return res.status(400).send({ message: error.message });
    // 格式符合要求 查找用户是否存在
    let user = await User.findOne({ email: req.fields.email });
    // 用户不存在 响应错误信息给客户端
    if (!user) return res.status(400).send({ message: '邮箱地址或密码错误' });
    // console.log(user);

    // 用户存在 对密码进行验证
    const valiPassword = await bcrypt.compare(req.fields.password, user.password);
    // 密码错误
    if (!valiPassword) return res.status(400).send({ message: '邮箱地址或密码错误' });
    // 将用户信息存储在session中
    req.session.userInfo = user;
    // console.log(req.session.userInfo);
    // 将登录用户信息响应给用户
    res.send(_.pick(user, ['nickName', 'email', 'role', 'avatar', '_id', 'status', 'createTime']));
}