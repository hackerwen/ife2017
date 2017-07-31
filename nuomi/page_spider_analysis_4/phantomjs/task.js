var webPage = require('webpage');
var page = webPage.create(),
    fs = require('fs'),
    system = require('system');

var config = require('./config.js'),
    urlPrefix = 'https://www.baidu.com/s?wd=',
    t = Date.now();

// 设置输入编码
phantom.outputEncoding = "utf-8";


var log = console.log.bind(console);

if (system.args.length !== 3) {
    log('Usage: page.js <some URL>');
    phantom.exit();
}

var query = system.args[1];
// encodeURI对中文进行编码
var address = urlPrefix + encodeURI(query);

var device = system.args[2];

if (!config[device]) {
    console.log('cannot find device name');
    phantom.exit();
} else {
    device = config[device];
}

deviceInfo = JSON.stringify(device);

var result = {
    keyword: query,
    device: system.args[2],
}

//设置ua
page.settings.userAgent = device.ua;

//设置尺寸
page.viewportSize = {
    width: device.width,
    height: device.height,
};

//设置抓取时窗口位置
page.clipRect = {
    top: 0,
    left: 0,
    width: device.width,
    height: device.height
};

// console.log
page.onConsoleMessage = function (msg) {
    console.log(msg);
};


page.open(address, function (status) {
    if (status !== "success") {
        result.code = 0;
        result.time = Date.now() - t;
        result.msg = '抓取失败';
        log(JSON.stringify(result));
        phantom.exit();
    } else {
        page.render('capture/' + query + '.png');
        result.code = 1;
        result.time = Date.now() - t;
        result.msg = '抓取成功';
        // includeJs是一个异步函数 所以phantom.exit()不可写在外面 不然数据没有回来就直接退出
        // 同时加载外部js成功的时候会log一条信息，这条信息也是标准输出流 导致app.js接受时有两条信息
        // 没有系统的学习过node中的流，感觉和java区别有点大，此项任务重点不在此
        // 故放弃includeJs的使用
        result.dataList = page.evaluate(function () { //evaluate方法用于打开网页以后，在页面中执行JavaScript代码。
            // dom操作要在evaluate函数的函数参数中进行
            var results = document.querySelectorAll('.c-container'),
                list = [],
                title,
                info,
                link,
                pic;

            if (!results.length) {
                // 没找到节点
                return null;
            }

            for (var i = 0; i < results.length; i++) {
                title = results[i].querySelector('h3') ? results[i].querySelector('h3').textContent : 'no title';
                info = results[i].querySelector('div') ? results[i].querySelector('div').textContent : 'no info';
                link = results[i].querySelector('a') ? results[i].querySelector('a').getAttribute('href') : 'no link';
                pic = results[i].querySelector('img') ? results[i].querySelector('img').getAttribute('src') : 'no pic';
                var obj = {
                    title: title,
                    info: info,
                    link: link,
                    pic: pic,
                };
                list.push(obj);
            }
            return list;
        })
        // json格式化小技巧，第三个参数为 \t可以以json格式换行写入 而不是一长行
        fs.write('data/' + query + '.json', JSON.stringify(result, null, "\t"), 'w');
        console.log(JSON.stringify(result)); //stdout返回值 标准输出流
    }
    phantom.exit();
})



