// obj目标对象 target 目标位置 回调
// 1. 让盒子每次移动的距离慢慢变小， 速度就会慢慢落下来。
// 2. 核心算法：(目标值 - 现在的位置) / 10 做为每次移动的距离 步长
// 3. 停止的条件是： 让当前盒子位置等于目标位置就停止定时器
function animate(obj, target, callback) {
    // 先清除上一次的定时器，只保留当前的一个定时器执行
    clearInterval(obj.timer);
    var timer = setInterval(function() {
        // 设置步长 (目标值 - 现在的位置) / 10 做为每次移动的距离 步长
        let step = (target - obj.offsetLeft) / 10;
        // 计算的时候总是有误差 所以需要取整 ceil()向上取整 floor()向下取整
        step = step > 0 ? Math.ceil(step) : Math.floor(step);
        if (obj.offsetLeft == target) {
            // 到达目标位置 停止动画 并执行回调函数
            clearInterval(obj.timer);
            callback && callback();
        }
        // 设置left位置 实现真正的移动 现在的位置+移动步长
        obj.style.left = obj.offsetLeft + step + 'px';
    }, 15);
}