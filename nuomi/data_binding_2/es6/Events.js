export default class Events {
    constructor() {
        this.events = {}//键:检测的属性名 值:当对应的属性发生变化时应作出的相应操作，即相应的函数，可能有多个（不止一个订阅）,所以类型为数组。
    }

    on(prop, callback) { //订阅操作 $watch内部进行
        if (!this.events[prop]) {
            this.events[prop] = [];//回调函数数组
        }
        this.events[prop].push(callback);
        return this;
    }

    remove(prop) {
        for (var key in this.events) {
            if (this.events.hasOwnProperty(key) && key === prop) {
                delete this.events[prop];
            }
        }
    }

    emit(prop, val, newVal) { //通知遍历并执行对应属性的回调函数数组
        if (!this.events[prop]) { //判断是否订阅过如果没有订阅该属性，返回
            return this;
        }
        var args = Array.prototype.slice.call(arguments, 1);//取出参数 此处为val newVal
        for (let i = 0; i < this.events[prop].length; i++) {//执行属性对应的回调函数（数组）
            this.events[prop][i].apply(this, args)//将可能用到的值传入
        }
        return this;
    }
}