/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Events = __webpack_require__(1);

var _Events2 = _interopRequireDefault(_Events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vue = function () {
    //构造函数
    function Vue(data) {
        _classCallCheck(this, Vue);

        this.data = data;
        this.walk(this.data);
    }
    //类的方法(原型方法)


    _createClass(Vue, [{
        key: 'walk',
        value: function walk(data) {
            var val = void 0;
            for (var key in data) {
                //hasOwnProperty过滤属性，判断属性是不是对象自身属性而非对象原型属性
                if (data.hasOwnProperty(key)) {
                    val = data[key];
                    //如果属性还是一个对象，进行递归
                    if (Object.prototype.toString.call(val) === '[object Object]') {
                        new Vue(val);
                    }
                    //为每一个属性添加getter以及setter
                    this.convert(key, val);
                }
            }
        }
    }, {
        key: 'convert',
        value: function convert(key, val) {
            var that = this;
            Object.defineProperty(this.data, key, {
                enumerable: true,
                configurable: true,
                get: function get() {
                    console.log('你访问了' + key);
                    return val;
                },
                set: function set(newVal) {
                    console.log('你设置了' + key);
                    console.log('新的' + key + '=' + newVal);
                    if (newVal === val) return;
                    if (Object.prototype.toString.call(newVal) === '[object Object]') {
                        new Vue(newVal); //如果新设置的值是对象，则需要递归
                    }
                    val = newVal;
                    that.eventsBus.emit(key, val, newVal); //发布
                }
            });
        }
    }, {
        key: '$watch',
        value: function $watch(key, callback) {
            this.eventsBus.on(key, callback); //订阅
        }
    }]);

    return Vue;
}();

Vue.prototype.eventsBus = new _Events2.default(); //所有的Vue实例共享这一个eventsBus，这一步很重要，倘若每一个对象或子对象都有自己的eventsBus，则可能在父对象上eventsBus.on，却在子对象eventsBus.emit，回调函数此时在父对象的eventsBus属性内，无法触发。表达可能有点混乱，见谅

var data = {
    user: {
        name: "zac",
        age: "20"
    },
    address: {
        city: "wh"
    }
};

var vm = new Vue(data);

vm.$watch('age', function (val, newVal) {
    console.log('\u6211\u7684\u5E74\u7EAA\u53D8\u4E86\uFF0C\u73B0\u5728\u5DF2\u7ECF\u662F\uFF1A' + newVal + '\u5C81\u4E86');
});

//vm.data.user.name; // 你访问了 name
vm.data.user.age = 100; // 你设置了 age，新的值为100 我的年纪变了，现在已经是：${age}岁了

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Events = function () {
    function Events() {
        _classCallCheck(this, Events);

        this.events = {}; //键:检测的属性名 值:当对应的属性发生变化时应作出的相应操作，即相应的函数，可能有多个（不止一个订阅）,所以类型为数组。
    }

    _createClass(Events, [{
        key: "on",
        value: function on(prop, callback) {
            //订阅操作 $watch内部进行
            if (!this.events[prop]) {
                this.events[prop] = []; //回调函数数组
            }
            this.events[prop].push(callback);
            return this;
        }
    }, {
        key: "remove",
        value: function remove(prop) {
            for (var key in this.events) {
                if (this.events.hasOwnProperty(key) && key === prop) {
                    delete this.events[prop];
                }
            }
        }
    }, {
        key: "emit",
        value: function emit(prop, val, newVal) {
            //通知遍历并执行对应属性的回调函数数组
            if (!this.events[prop]) {
                //判断是否订阅过如果没有订阅该属性，返回
                return this;
            }
            var args = Array.prototype.slice.call(arguments, 1); //取出参数 此处为val newVal
            for (var i = 0; i < this.events[prop].length; i++) {
                //执行属性对应的回调函数（数组）
                this.events[prop][i].apply(this, args); //将可能用到的值传入
            }
            return this;
        }
    }]);

    return Events;
}();

exports.default = Events;

/***/ })
/******/ ]);