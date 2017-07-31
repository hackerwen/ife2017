// 回文就是指一个单词，数组，短语，从前往后从后往前都是一样的 12321.abcba

// 回文最简单的思路就是, 把元素反转后如果与原始的元素相等，那么就意味着这就是一个回文了

// 这里可以用到这个栈类来操作

// 定义栈
var Stack = require('./stack.js');

function isPalindrome(str) {
    var s = new Stack();

    for (var i = 0; i < str.length; i++) {
        s.push(str[i]);
    }

    var newStr = "";

    for (var j = 0; j < str.length; j++) {
        newStr += s.pop();
    }

    if (str === newStr) {
        return true;
    } else {
        return false;
    }
}

console.log(isPalindrome("112211"));

// 看看这个isPalindrome函数，其实就是通过调用Stack类，然后把传递进来的word这个元素给分解后的每一个组成单元给压入到栈了，根据栈的原理，后入先出的原则，通过pop的方法在反组装这个元素，最后比较下之前与组装后的，如果相等就是回文了