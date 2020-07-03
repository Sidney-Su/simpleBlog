const { User } = require('../../../model/User');
module.exports = async(req, res) => {
    // 判断用户是否处于登录状态
    console.log(req.session);
    console.log(req.session.userInfo);

    // if(req.session.userInfo)
    // 根据id查询用户信息

}