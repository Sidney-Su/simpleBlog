$(function() {
    // 返回顶部
    var toolTop = $(".list").offset().top;

    $(window).scroll(function() {
        if ($(document).scrollTop() >= toolTop) {
            $(".slider-bar").fadeIn();
        } else {
            $(".slider-bar").fadeOut();
        };
    });

    $('.goback').on('click', function() {
        $('html,body').animate({ scrollTop: 0 }, 500);
    });

    // 轮播图
    // 获取元素
    var arrow_l = $('.arrow-l');
    var arrow_r = $('.arrow-r');
    // 获取图片的宽度
    var focusWidth = $('#focus').width();

    // 鼠标经过focus 就显示隐藏左右按钮
    $('#focus').on('mouseenter', function() {
        arrow_l.css('display', 'block');
        arrow_r.css('display', 'block');
        // 鼠标经过就停止自动播放轮播图
        clearInterval(timer);
        timer = null;
    });
    $('#focus').on('mouseleave', function() {
        arrow_l.css('display', 'none');
        arrow_r.css('display', 'none');
        // 继续自动播放
        timer = setInterval(function() {
            arrow_r.click();
        }, 2000);
    });

    // 动态生成小圆圈  有几张图片，我就生成几个小圆圈
    var ul = $('#focus').find('ul');
    var ol = $('#focus').find('.circle');
    for (var i = 0; i < ul.children('li').length; i++) {
        // 创建小圆圈li
        var li = $('<li>');
        // 给每个li设置索引
        li.attr('data-index', i);
        ol.append(li);
        // 排他
        li.on('click', function() {
            for (var j = 0; j < ol.children('li').length; j++) {
                // ol[0].children[j].removeClass(); 不行
                ol.find('li').removeClass();
            }
            $(this).addClass('current');

            // 移动图片 移动ul
            // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
            var index = $(this).attr('data-index');
            // 当我们点击了某个小li 就要把这个li 的索引号给 num  
            num = index;
            // 当我们点击了某个小li 就要把这个li 的索引号给 circle  
            circle = index;
            // animate(ul, -index * focusWidth);
            ul.animate({ left: -index * focusWidth });
        });
    }
    // 把ol里面的第一个小li设置类名为 current
    ol.find('li:first-child').addClass('current');

    // 克隆第一张图片(li)放到ul 最后面
    var first = ul.find('li:first-child').clone(true);
    ul.append(first);

    // 点击右侧按钮， 图片滚动一张
    var num = 0; //当前图片索引
    var circle = 0; //小圆点索引
    // 节流阀 防止轮播图按钮连续点击造成播放过快。
    var flag = true;
    arrow_r.on('click', function() {
        if (flag) {
            flag = false; // 关闭节流阀
            // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0 实现无缝滚动效果
            if (num == ul.find('li').length - 1) {
                ul.css('left', 0);
                num = 0;
            }
            num++;
            ul.animate({ left: -num * focusWidth }, function() {
                flag = true; // 打开节流阀
            });
            // 点击右侧按钮，小圆圈跟随一起变化
            circle++;
            // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
            if (circle == ol.find('li').length) {
                circle = 0;
            }
            // 调用函数
            circleChange();
        }
    });
    // 点击左侧按钮， 图片滚动一张
    arrow_l.on('click', function() {
        if (flag) {
            flag = false;
            if (num == 0) {
                // 跳到最后一张
                num = ul.find('li').length - 1;
                ul.css('left', -num * focusWidth);
            }
            num--;
            // 实现滚动效果
            ul.animate({ left: -num * focusWidth }, function() {
                flag = true;
            });
            // 小圆点索引也变化
            circle--;
            circle = circle < 0 ? ol.find('li').length - 1 : circle;
            circleChange();
        }
    });

    function circleChange() {
        // 先清除其余小圆圈的current类名
        for (var i = 0; i < ol.children('li').length; i++) {
            ol.find('li').removeClass();
        }
        // 留下当前的小圆圈的current类名
        ol.find('li').eq(circle).addClass('current');
    }
    // 自动播放轮播图
    var timer = setInterval(function() {
        arrow_r.click();
    }, 2000);
});