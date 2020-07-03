const { Article } = require('../../../model/Article');

module.exports = async(req, res) => {
    // 获取用户输入的关键字
    const key = req.params.key;
    // 用户输入了搜索关键字
    if (key.trim().length > 0) {
        // escapeRegExp 方法：将字符串安全格式转换为正则表达式的源码
        const regex = new RegExp(escapeRegex(key), 'gi');
        // 根据关键字查询文章
        const article = await Article.find({ title: regex }).populate('author', '-password');
        res.send(article);
    } else {
        res.status(400).send({ message: '请输入搜索关键字' });
    }
}

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    // return text.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
}