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

console.log(obj);