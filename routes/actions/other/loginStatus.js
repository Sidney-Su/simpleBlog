module.exports = (req, res) => {
    // session存在 且 userInfo(用户信息)存在
    console.log(req.session.userInfo);
    if (req.session && req.session.userInfo) {
        const result = `var isLogin = true;var userId=\"${req.session.userInfo._id}\";var admin=\"${req.session.userInfo.role}\"`;
        res.send(result);
    } else {
        res.send('var isLogin = false');
    }
}