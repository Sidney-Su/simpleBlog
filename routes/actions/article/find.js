const { Article } = require('../../../model/Article');
// 分页
const pagination = require('mongoose-sex-page');
const _ = require('lodash');

module.exports = async(req, res) => {
    // 获取到当前页 转换为数字
    // let page = req.query.page;
    // console.log(typeof page); //string
    let page = +req.query.page;
    // console.log(typeof page); //number
    // 如果页码没有传递 或者不是数字 设置默认值为1
    if (!page || !_.isNumber(page)) page = 1;
    // console.log(typeof page); //number

    // 查询条件
    let condition = {};
    // 查询文章信息 按查询条件查询 不将作者的密码查询出来 不查询文章内容和meta数据
    const article = await pagination(Article).page(page).size(10).display(5).find(condition).populate('author', '-password').select('-content -meta').exec();
    res.send(article);
}