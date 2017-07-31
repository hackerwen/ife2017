const Koa = require('koa');
const app = new Koa();
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const cors = require('koa2-cors');
const awakePhantom = require('./phantomjs/awaken.js');


router.get('/', function (ctx, next) {
    ctx.body = "<h1>see you again</h1>"
})

router.post('/', async (ctx, next) => {
    var device = ctx.request.body.device || '',
        keyword = ctx.request.body.keyword || '';

    var data = await awakePhantom(keyword, device);
    for (var k in data.dataList) {
        for (var j in data.dataList[k]) {
            if (j === 'pic') {
                console.log(data.dataList[k][j]);
            }
        }
    }
    ctx.body = {
        data: data
    }
})


app.use(cors());
app.use(bodyParser());
app.use(router.routes());


app.listen(8080);

console.log("app is listen at port 8080");

