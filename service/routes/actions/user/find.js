const { User } = require('../../../model/User');
module.exports = async(req, res) => {
    // 查询用户信息
    // select('-password')不查询password字段信息 sort('-createTime')时间按降序排序
    const users = await User.find().select('-password').sort('-createTime');
    // 响应
    res.send(users);
}