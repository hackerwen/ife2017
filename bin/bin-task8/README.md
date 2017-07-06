### 多叉树的遍历与查找

多叉树遍历：先序遍历，后序遍历

#### 任务描述
1. 基于任务七，参考示例图，将二叉树变成了多叉树，并且每一个节点中带有内容
2. 提供一个按钮，显示开始遍历，点击后，以动画的形式呈现遍历的过程
3. 当前被遍历到的节点做一个特殊显示（比如不同的颜色）
4. 每隔一段时间（500ms，1s等时间自定）再遍历下一个节点
5. 增加一个输入框及一个“查询”按钮，点击按钮时，开始在树中以动画形式查找节点内容和输入框中内容一致的节点，找到后以特殊样式显示该节点，找不到的话给出找不到的提示。查询过程中的展示过程和遍历过程保持一致

#### 任务注意事项
1. 树的遍历算法和方式自定，但推荐可以提供多种算法的展示（增加多个按钮，每个按钮对应不同的算法）
2. 如果按照示例图中展示树，可以使用flexbox布局
3. 实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
4. 请注意代码风格的整齐、优雅
5. 代码中含有必要的注释
6. 建议不使用任何第三方库、框架

#### 思路：
    1. 先对多叉树进行遍历，按照顺序将节点存入数组
    2. 在数组中依次比较节点内的字符串与输入的字符串是否相等
    3. 记录相等目标节点的下标
    4. 对数组中的节点进行样式处理（排他以及定时器），直到目标节点位置

#### 遍历代码：

1. 先序遍历：

        function DLR(node) { //先序遍历
            if (node) {
                nodeArr.push(node);
                for (var i = 0; i < node.children.length; i++) {
                    DLR(node.children[i]);
                }
            }
        }

2. 后序遍历：若树为空，则空操作返回，否则从左到右先叶子后结点的方式遍历访问左右子树，最后访问根结点。

        function LRD(node) { //后序遍历
            if (node) {
                for (var i = 0; i < node.children.length; i++) {
                    LRD(node.children[i]);
                }
                nodeArr.push(node);
            }
        }

最后我们得到了按照遍历顺序排序的数组，再进行处理，代码如下

    function search(str, arr) { //找到对应的节点 记住下标

        var index;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].nodeName = "SPAN") {
                var text = arr[i].innerText;
            } else {
                var text = arr[i].children[0].innerText;
            }
            if (text === str) {
                index = i;
            }
        }

        for (let i = 0; i < index; i++) {
            setTimeout(function () {
                for (let j = 0; j < arr.length; j++) {
                    arr[j].className = "";
                }
                arr[i].className += " active";
            }, i * 500)//i*500  给定时器创造时间间隔
        }

        setTimeout(function () {
            alert('found it!')
            arr[index].className += " active";
        }, 500 * index);
    }
