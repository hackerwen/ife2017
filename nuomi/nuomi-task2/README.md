> 其实这一类文章在网上已经有许多人写过了，最近在做百度前端技术学院的题目，资料很丰富，于是便总结一下前人的文章，拓展以及巩固自己的知识，如总结有所不到位的地方不正请指出！

![动态预览.gif](http://upload-images.jianshu.io/upload_images/4869616-e4a9eab7fc323726.gif?imageMogr2/auto-orient/strip)
>参考资料
1. [vue早期源码学习系列之一：如何监听一个对象的变化](https://github.com/youngwind/blog/issues/84)
2. [JavaScript实现MVVM之我就是想监测一个普通对象的变化](http://hcysun.me/2016/04/28/JavaScript%E5%AE%9E%E7%8E%B0MVVM%E4%B9%8B%E6%88%91%E5%B0%B1%E6%98%AF%E6%83%B3%E7%9B%91%E6%B5%8B%E4%B8%80%E4%B8%AA%E6%99%AE%E9%80%9A%E5%AF%B9%E8%B1%A1%E7%9A%84%E5%8F%98%E5%8C%96/)

### 核心：Object.defineProperty()

1. 这个方法是做什么的？

>参考资料：
1. [mdn文档](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
2. [理解Object.defineProperty的作用](https://segmentfault.com/a/1190000007434923)
3. [解析 神奇的 Object.defineProperty](http://blog.csdn.net/u013861109/article/details/52429819)

语法：

    Object.defineProperty(obj, prop, descriptor)

此方法接受三个参数：

* obj:目标对象
* prop:需要定义的目标对象的属性
* descriptor:目标属性所拥有的特性，可以理解为属性的属性...

举个栗子：

    let obj = {}
    Object.defineProperty(obj,'b',{
        value=123;
    })
    console.log(obj.b);//123

可以知道，我们接下来都是在descriptor（get与set）上做文章。

来看看descriptor可以定义属性的那些特性：

* configurable
如果且仅当此属性(prop)描述符的类型（writable, configurable, enumerable）可能被更改并且该属性可能从相应的对象中删除，则为true。默认为false。
即起到两个作用：1.目标属性是否能被delete删除 2.目标属性的特性能否被更改.且若第一次为false则后续设置为true也无效。

* enumerable
此属性是否可以被枚举（使用for...in或Object.keys()）。设置为true可以被枚举；设置为false，不能被枚举。默认为false。

* value
属性对应的值,可以使任意类型的值，默认为undefined

* writable
属性的值是否可以被重写。设置为true可以被重写；设置为false，不能被重写。默认为false。


举个例子：

    let obj = {}
    Object.defineProperty(obj,"newKey",{
        configurable:true,//newKey属性可删除且特性可被修改
        value:"hello",//newKey属性值为hello
        writable:false,//newKey属性值不可写
        enumerable:true//newKey属性可枚举
    });

以上四个值定义了属性的特性，想要深入的同学请翻阅红宝书或者参考资料。

我们真正的重点在descriptor的get和set（存取器），（注：当使用了getter或setter方法，不允许使用writable和value这两个属性）。

>当设置或获取对象的某个属性的值的时候，可以提供getter/setter方法。
* getter是一种获得属性值的方法.
* setter是一种设置属性值的方法。

在特性中使用get/set属性来定义对应的方法,笔者理解更像是一个回调函数，当获取值或是设置值后会触发相应方法。

    object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get(){
            console.log('你访问了' + key)
        },
        set(newVal){
            console.log('你设置了' + key);
            console.log('新的' + key + '=' + newVal);
            if (newVal === val)return;
            val = newVal;
        }
    })

有了set和get就容易了，我们只需要使用Object.defineProperty()对每一个属性都设置set和get方法，每次属性值变动的时候我们就可以检测一个普通对象的变化了。

完整代码如下:

    class Observer {
        //构造函数
        constructor(data) {
            this.data = data;
            this.walk(data);
        }
        //类的方法(原型方法)
        walk(obj) {
            let val;
            for (let key in obj) {
                //hasOwnProperty过滤属性，判断属性是不是对象自身属性而非对象原型属性
                if (obj.hasOwnProperty(key)) {
                    val = obj[key];
                    //如果属性还是一个对象，进行递归
                    if(Object.prototype.toString.call(val) === '[object Object]'){
                        new Observer(val);
                    }
                    //为每一个属性添加getter以及setter
                    this.convert(key, val);
                }
            }
        }
        convert(key, val) {
            Object.defineProperty(this.data, key, {
                enumerable: true,
                configurable: true,
                get(){
                    console.log('你访问了' + key);
                    return val;
                },
                set(newVal){
                    console.log('你设置了' + key);
                    console.log('新的' + key + '=' + newVal);
                    if (newVal === val)return;
                    val = newVal;
                }
            })
        }
    }
    let obj  = {
        user: {
            name: "zac",
            age: "20"
        },
        address: {
            city: "wh"
        }
    };
    new Observer(obj);
    console.log(obj);//现在可以去控制台做有趣的事情啦

建议大家把我上面列的参考资料好好看一下，我只是总结了一下，资料里面非常详细哈。

如果你喜欢这篇文章那就给我一个喜欢- -!!吧！