var webPage = require('webpage');
var page = webPage.create(),
	fs = require('fs'),
	system = require('system'),
	urlPrefix = 'https://www.baidu.com/s?wd=',
	t = Date.now();
	// 设置输入编码。此处为gb2312保证中文不乱码
phantom.outputEncoding="gb2312";
var log = console.log.bind(console);

if (system.args.length === 1) {
    log('Usage: page.js <some URL>');
    phantom.exit();
}
var query = system.args[1];

// encodeURI对中文进行编码
var address = urlPrefix + encodeURI(query);

var result = {
	keyword:query,
}
page.open(address, function(status) {
	if(status === "success") {
		result.code = 1;
		result.time = Date.now() - t;
		result.msg = '抓取成功';
		// page.render('pic.png');
		result.dataList = page.evaluate(function() { //evaluate方法用于打开网页以后，在页面中执行JavaScript代码。
			// dom操作要在evaluate函数的函数参数中进行
			var list = [];
			var items = document.getElementsByClassName('c-container');
			Array.prototype.forEach.call(items,function(item) {
				var title = item.getElementsByTagName('h3')[0].innerText;
				var info = item.getElementsByTagName('div')[0].innerText;
				var link = item.getElementsByTagName('a')[0].getAttribute('href');
				if(item.getElementsByTagName('img')[0]){
					var pic = item.getElementsByTagName('img')[0].getAttribute('src');
				}
				var obj = {
					title: title,
					info: info,
					link: link,
					pic: pic,
				};
				list.push(obj);
			})
			return list;
		})
		log(JSON.stringify(result));
		// json格式化小技巧，第三个参数为 \t可以以json格式换行写入 而不是一长行
		fs.write(Date.now()+query+'.json',JSON.stringify(result , null, "\t"),'w');
	} else {
		result.code = 0;
		result.time = Date.now() - t;
		result.msg = '抓取失败';
		log(JSON.stringify(result));
		phantom.exit();
	}
	phantom.exit();
})

