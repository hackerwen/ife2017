var app = require("express")();
var result = require("./db/db.js")
// 使用child_process模块的child_process.exec()方法来调用命令行。传给回调的 stdout 和 stderr 参数会包含子进程的 stdout 和 stderr 的输出
var exec = require('child_process').exec;
var cmdStr = 'phantomjs task.js ';

app.get("/", function(req, res) {
	// 取得查询关键字
	var keyword = req.query.keyword;
	var device = req.query.device;


	// 调用命令行 启动phantomjs
	exec(cmdStr + keyword + ' ' + device, function(err, stdout, stdin) {
		if(err){
			console.error('exec error:'+ err);
		} else {
			res.send(JSON.parse(stdout));
			console.log("抓取完毕并返回,现在开始存入数据库");
			try{
				var r = new result(JSON.parse(stdout));
			} catch(e) {
				console.log(e);
			}
			r.save(function(err, info) {
				if(err) {
					console.log('save error');
				} else {
					console.log('存入结束')
				}
			});
		}
	})
})

app.listen(8080, function () {
    console.log('app is listening on port 8080.')
})