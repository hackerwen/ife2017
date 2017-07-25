### 任务描述
1. 实现文字的流光渐变动画
2. 背景图需要进行模糊处理
3. 实现按钮边框的从中间到两边扩展开

### 总结
1. transition写在状态变化前，倘若写在状态变化后，即hover下，过渡完成后不会原状回退
2. 流光字效果，重点-webkit-background-clip
<pre>
    /*流光字效果*/
    color:transparent;
    -webkit-background-clip:text;
    background-image:-webkit-linear-gradient(left,#D81159, #E53A40 10%, #FFBC42 20%, #75D701 30%, #30A9DE 40%,#D81159 50%, #E53A40 60%, #FFBC42 70%, #75D701 80%, #30A9DE 90%,#D81159);
    background-size: 200%,100%;
    animation: move 4s infinite alternate;
    @keyframes move{
        0%{
            background-position: 0 0;
        }
        100%{
            background-position: 100% 0;
        }
    }
</pre>
3. 线条由两侧从中间展开，变换绝对定位left以及width
<pre>
    .top{
        /*
            通过改变宽度以及left达到从中间延伸的效果
        */
        top:0;
        left:50%;
        width: 0;
        border-top: 5px solid rgba(7, 17, 27, 0.8);
        transition:all 1s;
    }
    .box:hover .top{
        left:0;
        width:100%;
    }
</pre>
