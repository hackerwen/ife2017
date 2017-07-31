/*
 目的: 使用JavaSript实现栈这种数据结构

 定义:

 栈:

 1. 特殊的列表，栈内的元素只能通过列表的一端访问，栈顶

 2. 后入先出(LIFO,last-in-first-out)的数据结构

 需要实现的方法:

 1. 入栈 push

 2. 出栈 pop

 3. 清空栈 clear

 4. 栈内元素总量查找 getLength

 5. 查找 pick

 */

function Stack() {
    this.dataStore = [];
    this.top = 0;
}

Stack.prototype.push = function (element) { // 入栈
    this.dataStore[this.top] = element;
    this.top = this.top + 1;
}

Stack.prototype.pop = function () { // 出栈
    this.top = this.top - 1;
    return this.dataStore[this.top];
}

Stack.prototype.pick = function () { // 查找
    return this.dataStore[this.top - 1];
}

Stack.prototype.clear = function () { //清空栈
    this.top = 0;
}

Stack.prototype.getLength = function () {
    return this.top;
}

// s就是我们的栈 我们操作对象是s 不是s的dataStore,切记

var s = new Stack();

s.push("Tencent");
s.push('Ali');
s.push("Baidu");

console.log(s.pick()); // Baidu
console.log(s.pop()); // Baidu
console.log(s.pick()); // Ali

