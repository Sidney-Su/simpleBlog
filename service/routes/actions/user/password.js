const { User } = require('../../../model/User');
const bcrypt = require('bcryptjs');

module.exports = async(req, res) => {
    // 判断用户是否处于登录状态
    console.log(req.session.userInfo);
    if (!req.session.userInfo) return res.status(400).send({ message: '请登录' })

    // 获取原始正确密码
    const originPass = req.session.userInfo.password;
    // 用户id
    const _id = req.session.userInfo._id;
    // 获取用户输入的旧密码、新密码以及确认密码
    const { userPass, newPass, confirmPass } = req.fields;

    // 判断用户输入的旧密码和原始密码是否一致
    if (await bcrypt.compare(userPass, originPass)) {
        // 判断新密码和确认密码是否一致
        if (newPass != confirmPass) return res.status(400).send({ message: '两次密码输入不一致' });
        // 更新密码 对新密码也要加密
        // 生成盐
        const salt = await bcrypt.genSalt(10);
        // 加密新密码
        const finalPass = await bcrypt.hash(newPass, salt);
        // 对用户密码更新到数据库
        let user = await User.findByIdAndUpdate(_id, { $set: { password: finalPass } });
        // 修改密码后 需要跳转登录页面进行重新登陆 所以需要将session的用户信息设置为空
        req.session.userInfo = null;
        res.send('密码修改成功');
    }


}