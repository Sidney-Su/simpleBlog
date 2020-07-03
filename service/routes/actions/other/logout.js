module.exports = (req, res) => {
    // 删除session
    req.session.destroy(err => {
        // 成功删除session
        if (err == null) {
            // 删除客户端的cookie
            res.clearCookie('connect-sid');
            res.send({ message: '退出成功' });
        } else {
            res.send({ message: '退出失败' });
        }
    });
}