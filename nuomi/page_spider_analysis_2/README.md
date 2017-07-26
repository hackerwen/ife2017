### 网页抓取分析服务系列之二（设备模拟）

#### 任务目的
1. 学会分析并借鉴其他工具的运行机制
2. 学习更多phatomJS的配置

#### 任务描述
1.观察chrome开发者工具中device toolbar，切换到不同的device，查看浏览器BOM数据有何变化
2. 把device toolbar中不同的device名对应的ua和尺寸信息记录下来，保存为配置文件
3. 在任务1的基础上，增加一个参数，表示device信息，taskjs中，解析该参数并从配置文件找到对应的ua和尺寸，完成设置后再抓取
4. 在结果中也增加一个device字段保存传入的设备名

#### 任务注意事项
1. chrome device toolbar不了解可以百度一下看看使用方法，在console中打印对应BOM信息查看
2. 抽取的配置文件选三个就好：iphone5、iphone6、ipad
3. API提示：system.args、page.settings['userAgent']、page.viewportSize、page.clipRect

#### 部分代码如下

    //设置ua
    page.settings.userAgent=device.ua;

    //设置尺寸
    page.viewportSize = {
      width: device.width,
      height: device.height,
    };

    //设置抓取时窗口位置
    page.clipRect={
        top: 0,
        left: 0,
        width: device.width,
        height: device.height
    };

注：json键值都需要有引号，最后一个属性后不能有逗号

