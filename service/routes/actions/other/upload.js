module.exports = (req, res) => {
    // 建立图片路径数组
    let imgsPath = [];
    console.log(req.files);

    // 如果用户上传了图片文件
    if (req.files) {
        // 循环结果对象 将所有图片路径存放在数组中
        for (let attr in req.files) {
            // 如果结果对象中存在路径path属性
            if (req.files[attr].path) {
                // 将路径值存储在数组中 作为对象存储取值方便点
                imgsPath.push({
                    [attr]: req.files[attr].path.split('public')[1]
                });
            }
        }
    }
    console.log(imgsPath);
    // 将路径响应给客户端
    res.send(imgsPath);
}