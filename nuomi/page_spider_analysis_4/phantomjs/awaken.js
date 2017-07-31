// 使用child_process模块的child_process.exec()方法来调用命令行。传给回调的 stdout 和 stderr 参数会包含子进程的 stdout 和 stderr 的输出
var exec = require('child_process').exec;

var cmdStr = 'phantomjs task.js ';

// mongodb model
var result = require("../db/db.js")


// 调用命令行 启动phantomjs 此处包装成promise对象 处理异步
module.exports = function (keyword, device) {
    return new Promise(function (resolve, reject) {
        // 配置环境，一定要配置cwd，不然打开的cmd就是在app.js路径下
        // 那个路径下并没有task.js
        exec(cmdStr + keyword + ' ' + device, {cwd: __dirname}, function (err, stdout, stdin) {
            if (err) {
                console.error('exec error:' + err);
                reject(err);
            } else {
                console.log("抓取" + keyword + "完毕并返回,现在开始存入数据库");
                try {
                    var r = new result(JSON.parse(stdout));
                } catch (e) {
                    console.log(e);
                }
                r.save(function (err, info) {
                    if (err) {
                        console.log('save error: ' + err);
                    } else {
                        console.log('存入结束');
                        resolve(JSON.parse(stdout));
                    }
                });
            }
        })
    })
}