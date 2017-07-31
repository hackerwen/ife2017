// 引入mongoose模块
var mongoose = require("mongoose"),
// 数据库位置
    DB_URL = 'mongodb://localhost:27017/baiduife';

// 连接数据库
mongoose.connect(DB_URL);

// 连接成功
mongoose.connection.on('connected', function () {
    console.log('Mongoose connection open to ' + DB_URL);
})

/**
 * 连接异常
 */
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {
    console.log('Mongoose connection disconnected');
});

/*　
 schema是mongoose里会用到的一种数据模式，可以理解为表结构的定义；
 每个schema会映射到mongodb中的一个collection，它不具备操作数据库的能力
 */

var resultSchema = new mongoose.Schema({
    keyword: String,
    device: String,
    code: Number,
    time: Number,
    msg: String,
    dataList: [{
        info: String,
        link: String,
        title: String,
        pic: String,
    }]
})

/*
 定义好了Schema，接下就是生成Model。
 　　model是由schema生成的模型，可以对数据库的操作
 */

module.exports = mongoose.model('Result', resultSchema);