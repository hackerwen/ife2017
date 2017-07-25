import Events from './Events'
class Vue {
    //构造函数
    constructor(data) {
        this.data = data;
        this.walk(this.data);
    }
    //类的方法(原型方法)
    walk(data) {
        let val;
        for (let key in data) {
            //hasOwnProperty过滤属性，判断属性是不是对象自身属性而非对象原型属性
            if (data.hasOwnProperty(key)) {
                val = data[key];
                //如果属性还是一个对象，进行递归
                if(Object.prototype.toString.call(val) === '[object Object]'){
                    new Vue(val);
                }
                //为每一个属性添加getter以及setter
                this.convert(key, val);
            }
        }
    }

    convert(key, val) {
        let that = this;
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
                if(Object.prototype.toString.call(newVal) === '[object Object]'){
                    new Vue(newVal);//如果新设置的值是对象，则需要递归
                }
                val = newVal;
                that.eventsBus.emit(key,val,newVal);//发布
            }
        })
    }
    $watch(key,callback){
        this.eventsBus.on(key, callback);//订阅
    }
}

Vue.prototype.eventsBus=new Events();//所有的Vue实例共享这一个eventsBus，这一步很重要，倘若每一个对象或子对象都有自己的eventsBus，则可能在父对象上eventsBus.on，却在子对象eventsBus.emit，回调函数此时在父对象的eventsBus属性内，无法触发。表达可能有点混乱，见谅

let data  = {
    user: {
        name: "zac",
        age: "20"
    },
    address: {
        city: "wh"
    }
};

let vm = new Vue(data);

vm.$watch('age', function(val,newVal) {
    console.log(`我的年纪变了，现在已经是：${newVal}岁了`)
});

//vm.data.user.name; // 你访问了 name
vm.data.user.age = 100;  // 你设置了 age，新的值为100 我的年纪变了，现在已经是：${age}岁了
