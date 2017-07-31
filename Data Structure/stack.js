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

module.exports = Stack;