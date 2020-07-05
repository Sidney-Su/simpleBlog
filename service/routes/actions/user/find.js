const { User } = require('../../../model/User');
// 分页
const pagination = require('mongoose-sex-page');
const _ = require('lodash');

module.exports = async(req, res) => {
    // 获取到当前页
    let page = +req.query.page;
    if (!page || !_.isNumber(page)) page = 1;
    // 查询用户信息
    // select('-password')不查询password字段信息 sort('-createTime')时间按降序排序
    const users = await pagination(User).page(page).size(10).display(5).find().select('-password').sort('-createTime').exec();
    // 响应
    res.send(users);
}