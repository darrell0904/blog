# 聊聊 `js` 中的 `call` 与 `apply`

`call` 和 `apply` 都是为了改变某个函数运行时的 `context` 即上下文而存在的，换句话说，就是为了改变函数体内部 this 的指向。

1，

因为 `JavaScript` 的函数存在「定义时上下文」和「运行时上下文」以及「上下文是可以改变的」这样的概念。

二者的作用完全一样，只是接受参数的方式不太一样。例如，有一个函数 func1 定义如下：

> var func1 = function(arg1, arg2) {};

就可以通过 `func1.call(this, arg1, arg2)`； 或者 `func1.apply(this, [arg1, arg2])`； 来调用。其中 this 是你想指定的上下文，他可以任何一个 `JavaScript` 对象(`JavaScript` 中一切皆对象)，`call` 需要把参数按顺序传递进去，而 `apply` 则是把参数放在数组里。

2，

```
function cat(){}

cat.prototype={     
	food:"fish",     
	say: function(){           
		alert("I love "+this.food);     
    }
}

var blackCat = new cat;blackCat.say();
```

但是如果我们有一个对象 `whiteDog = {food:"bone"}`，我们不想对它重新定义 `say` 方法，那么我们可以通过`call` 或 `apply` 用 `blackCat`的 `say` 方法：`blackCat.say.call(whiteDog)`；

所以，可以看出call和apply是为了动态改变this而出现的，当一个object没有某个方法，但是其他的有，我们可以借助call或apply用其它对象的方法来操作。

用的比较多的，通过 `document.getElementsByTagName` 选择的 `dom` 节点是一种类似 `array` 的 `array`。它不能应用 `Array` 下的 `push`，`pop` 等方法。我们可以通过：

```
var domNodes = Array.prototype.slice.call(document.getElementsByTagName("*"));
```


这样 `domNodes` 就可以应用 `Array` 下的所有方法了;



3，

猫吃鱼，狗吃肉，奥特曼打小怪兽。

有天狗想吃鱼了

猫.吃鱼.call(狗，鱼)

狗就吃到鱼了

猫成精了，想打怪兽

奥特曼.打小怪兽.call(猫，小怪兽)

4,

```
// uniq变量已经在前面定义
// 用来将 [1,1,2,2,3,3] 替换为 [1,2,3]
uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }
```

```
// 筛选数组，踢出 null undefined 元素
function compact(array) { return filter.call(array, function(item){ return item != null }) }
```

[JS中的call()方法和apply()方法用法总结](https://blog.csdn.net/ganyingxie123456/article/details/70855586)


[区别和详解：js中call()和apply()的用法](https://www.cnblogs.com/wdlhao/p/5614522.html)


[this、apply、call、bind](https://juejin.im/post/59bfe84351882531b730bac2)