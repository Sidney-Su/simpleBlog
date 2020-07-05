const { Comment } = require('../../../model/Comment');
const pagination = require('mongoose-sex-page');
const _ = require('lodash');

module.exports = async(req, res) => {
    // 当前页
    let page = +req.query.page;
    if (!page || !_.isNumber(page)) page = 1;
    // 查询用户信息
    const comment = await pagination(Comment).page(page).size(10).display(5).populate('author', '-password').populate('article', '-content -meta').find().exec();
    res.send(comment);
}