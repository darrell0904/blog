# 关于js异步的一些知识点

#### 1，什么是单线程，和异步有什么关系

单线程-只有一个线程，只能做一件事

单线程的原因：避免DOM 渲染的冲突

*  浏览器需要渲染DOM
*  JS 可以修改DOM 结构
*  JS 执行的时候，浏览器DOM 渲染会暂停
*   两段JS 也不能同时执行（都修改DOM 就冲突了）
*  webworker支持多线程，但是不能访问DOM

怎么解决：用异步，提高性能。但是异步的代码会有很多比较多难以理解的问题，比如

* 没有按照我们代码的顺序执行，可读性差
* callback中不同意模块化，易出现回调地狱。

我们平常的工作中常见的一步的函数入 `setTimeout(fn,time)` ，以及常见的网络请求，如 `Ajax` 等。

**js的执行机制就是先跑完同步的代码，在轮询去读异步队列里面的函数。（等等会讲到）**

如下图两个例子：

下图中的例子使用 `setTimeout` 来写的，所以它是一个异步函数。

![异步1.png](https://upload-images.jianshu.io/upload_images/1505342-fde9bfb168c45e17.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

输出的结果是：

```
100
300
400
200
```



下图中的例子是 `ajax` 的例子，也是一个异步函数，js执行的时候，会把 `Ajax` 放在异步队列中，等待同步代码全都执行完了再去轮询代码。

![异步2.png](https://upload-images.jianshu.io/upload_images/1505342-49dc2b26f4ca7d65.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



接下去我们讲讲事件轮询 (`event-loop`)



#### 2，什么是 event-loop

`event-loop` 是 `js` 异步的一种实现方式。

他的意思简单来说就是：

* 同步代码，直接执行
* 异步函数先放在异步队列中
*  待同步函数执行完毕，轮询执行异步队列的函数

我们可以具体看几个例子：



**例子一**

就是一个`setTimeout`函数，`200s`以后输出打印100。我们可以看到的是，`console.log(200)` 是同步代码，而`setTimeout` 则是一个异步函数。

```
setTimeout(function () {
	console.log(100)
})
console.log(200)
```

那么我么就可以得到下图。

![event-loop2.png](https://upload-images.jianshu.io/upload_images/1505342-8b2f22401f739970.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以输出结果为：

```
200,
100
```



**例子二**

这里我们有两个 `setTimeout` ，但是一个时间是0ms，另外一个是100ms。所以我们能得到图二，主进程中是 `console.log(3)`，而在异步队列中的两个 `setTimeout` , 0秒的立刻就被放入我们的进程中，还有一个是隔100ms被放入异步队列。



```
setTimeout(function () {
	console.log(1)
}, 1000)
setTimeout(function () {
	console.log(2)
})
console.log(3)
```



![event-loop4.png](https://upload-images.jianshu.io/upload_images/1505342-5fb90f1fa9cdc0a3.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

所以上图的程序的结果应该是：

```
3,
2,
1
```



**例子三**

我们来看一个稍微复杂的函数，`setTimeout` 和 `ajax` 都存在的函数。这里的结果我们可以思考一下。

```
$.ajax({
	url: './data.json',
	success: function () {
		console.log('a')
	}
})
setTimeout(function () {
 	console.log('b')
}, 1000)
setTimeout(function () {
 	console.log('c')
})
console.log('d')
```



看下下面的图，应该可以马上明白了。

![event-loop6.png](https://upload-images.jianshu.io/upload_images/1505342-d24819019a2fc4a7.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

这里应该有两种输出结果，当我们 `ajax` 返回的速度快于100ms的时候，那么就会先输出`a`，如果 `ajax` 速度很慢的时候，慢于100ms，那么我们就会先输出 `b`，在输出  `a`。



#### 3，是否用过 jquery 的 Deferred

简单的来讲，`Deferred` 就是 `promise` 的前世。



在开发中，我们经常遇到某些耗时很长的javascript操作。其中，既有异步的操作（比如ajax读取服务器数据），也有同步的操作（比如遍历一个大型数组），它们都不是立即能得到结果的。



通常的做法是，为它们指定回调函数（callback）。即事先规定，一旦它们运行结束，应该调用哪些函数。但是，一旦回调层级过深，处理和维护会变得相当困难。即我们常说的回调地狱。

在 `JQuery` 中,低于 1.5.0 版本，`$.ajax()` 返回的是`XHR`对象，所以不能进行链式操作，如下：

```
$.ajax({
    url: "http://localhost:8888",
    success: function(){
        console.log("哈哈，成功了！");
    },
    error: function(){
        console.log("出错啦！");
    }
});
```

但是在版本 1.5.0 之后，`$.ajax()` 返回的是 `deferred` 对象，可以进行链式操作了。如下：

```
$.ajax("http://localhost:8888")
    .done(function(){ 
        console.log("哈哈，成功了！"); 
    })
    .fail(function(){ 
        console.log("出错啦！"); 
    });
```

看了这段代码，你是不是想起了之前我们使用过的 `promise`。



其实我们无法改变 JS 异步和单线程的本质，所以为了解决回调地狱，我们只能从写法上杜绝callback 这种形式。`deferred` 它是一种语法糖形式，但是他是我们的代码变的更清晰。也很好的体现了，编程中的一个原则——开放封闭原则。

即对扩展开放，对修改封闭的原则。我们不需要把所有的代码都写在`success`回调中了，可以把代码很好的解耦出来，便于更好的维护和测试。



下面我们来看看一个对于 `deferred` 的简单封装：

```
// 已经封装好的（A 员工）
function waitHandle() {
	// 定义
	var dtd = $.Deferred()
	
	var wait = function (dtd) {
		var task = function () {
			console.log('执行完成')
			
			dtd.resolve() // 成功
		
			// dtd.reject() // 失败
		}
		setTimeout(task, 1000)	
        return dtd.promise() // wait 返回
	}
		
	return wait(dtd) // 最终返回
}

// 使用（B 员工）
var w = waitHandle()  // promise 对象

$.when(w).then(function () {
	console.log('ok 1')
}, function () {
	console.log('err 1')
})
```



上述示例中，结果会输出

```
执行完成
ok1 // 1s后
```



这里我们讲几个要点

* `deferred.resolve()` 和 `deferred.reject()`。说明其作用需要先说一下 `jQuery` 规定 `deferred` 对象的三种执行状态：**未完成**、**已完成**和**已失败**。

* `$.when(deferreds)`方法只能接收defferred对象作为参数，所以我们要给上述函数返回一个 `deferred` 对象

* 我们 `wait` 函数返回的是 `dtd.promise()` ，而不是简单的 `dtd` 对象，是因为 `dtd` 的 `API` 可分成两类，用意不同。一类是判断是否成功这个状态， 另一个则是判断成功或者失败后，该做什么事情。这两个应该分开。 总结，dtd 的 API 可分成两类，否则后果很严重！我们可以在 `wait` 函数返回一个 `dfd`。 然后在最末尾加上一句 `w.reject()` 。输出结果为:

  ```
  err 1
  执行完成
  ```

  这个是我们需要非常注意的。因为返回 `dtd.promise()` 之后，我们就访问不到 `reject` 与 `resolve` 这两个接口了。

  下面这张的`dfd`的 `api`。

  ![deffered.png](https://img-blog.csdn.net/20160605125736747)

  这张的`dfd.promise`的 `api`。

	![deferred.promise().png](https://img-blog.csdn.net/20160605125802778)	

相关链接：[jQuery的deferred对象详解](https://blog.csdn.net/ligang2585116/article/details/51589073)，[面向对象编程的6大原则](https://blog.csdn.net/zcxwww/article/details/51406226)，



#### 4，Promise 的基本使用和原理

**4.1  基本语法回顾**

先看个简单的例子：

```
function loadImg(src) {
	var promise = new Promise(function (resolve, reject) {
		var img = document.createElement('img')
			img.onload = function () {
			resolve(img)
		}
		img.onerror = function () {
			reject('图片加载失败')
		}
		img.src = src
	})
	return promise
}

var src = 'http://static.clewm.net/cli/images/cli_logo@2x.png'
var result = loadImg(src)

result.then(function (img) {
	console.log(1, img.width)
	return img
}, function () {
	console.log('error 1')
}).then(function (img) {
	console.log(2, img.height)
})
```

上述的代码，输出的结果是：

```
1 300
2 54
```

代码很简单，就是加载一张图片，当图片加载成功的时候显示图片的宽度与宽度，我们首先 `new` 一个 `promise`对象，然后针对图片加载成功或者失败，做一些操作。 都是一些常规的操作。



**4.2  异常捕获**

我们改造一下代码，`loadimg` 函数不变，改变下面调用的方式：

```
var src = 'http://static.clewm.net/cli/images/cli_logo@2x.png'
var result = loadImg(src)
result.then(function (img) {
	console.log(1, img.width)
    return img
}).then(function (img) {
	console.log(2, img.height)
}).catch(function (ex) {
	// 统一捕获异常
    console.log(ex)
})
```

这里我们规定：`then` 只接受一个参数，最后统一用 `catch` 捕获异常。所以我们then只接受一个成功之后的回调。



**4.3  多个 `promise`对象、`Promise.all` 和 `Promise.race`**

这里我们在增加一个图片的请求。

```
var src1 = 'http://static.clewm.net/cli/images/cli_logo@2x.png'
var result1 = loadImg(src1)
var src2 = 'http://static.clewm.net/static/images/1404477720_63c377a.png?v=20150518'
var result2 = loadImg(src2)
result1.then(function (img1) {
	console.log('第一个图片加载完成', img1.width)
    return result2  // 重要！！！
}).then(function (img2) {
	console.log('第二个图片加载完成', img2.width)
}).catch(function (ex) {
	console.log(ex)
})
```

如果是多个串联，比如我们当一个 `promise` 返回成功之后，我们去返回另外一张图片的信息，我们可以如上代码一样，返回 `return result2`。这样我们下一个 `then` 得到的就是图片2的信息。

`Promise.all` 与 `Promise.race` 也很好理解，他们都接受一个包含多个`promise` 对象的数组，前者是当所有请求都完成时，统一去执行 `then` 操作，而后者则是有一个请求完成就去执行 `then` 操作。

如下图：

![promise.png](https://upload-images.jianshu.io/upload_images/1505342-c4c128f5ae774b2a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





**4.4  Promise 标准**

这里就简单的提两点：

* 一个是 `promise` 对象的改变是不可逆的，就只有是 `pending` 到成功或者失败，而不能反着来，同时状态也不能从成功变为失败。
* 还有一个就是 `promise` 必须要有一个 `then` 方法。而且他必须接受两个参数作为参数，返回的也必须是一个 `promise` 实例。



相关链接：[Promise 迷你书](http://liubin.org/promises-book/)，

#### 5， 介绍一下 async/await（和 Promise 的区别、联系）

`async/await` 是 `es7` 的语法。他不是替代 `primise` 的一个异步解决方案，而是使用了 `Promise`，并没有和 `promise` 冲突。

我们使用 `promise` 的时候，虽然看似是避免了回调地狱，但是 `then` 方法其实只是讲 `callback` 拆分了而已。

而 `async/await` 他的出现则是最直接的同步写法。 

`loadImg` 方法不变，我们使用 `async/await` 来完成代码：

```
const load = async function() {
    const result1 = await loadImg(src1)
    console.log(result1);
    const result2 = await loadImg(src2)
    console.log(result2);
}

load();
```

 因为`async/await` 是属于 `es7` 范畴的，我们需要使用 `babel-polyfill`，我们可以使用 `cdn`([babel-polyfill](http://www.bootcdn.cn/babel-polyfill/))。

这样我们也能得到和 `promise` 一样的结果。



#### 6，总结

今天讲的一些知识都是慕课网实战视频里面 `js高级面试题` 里面的讲到的异步这一节内容，同时加上了自己的一些思考，感觉对于 `js` 异步的知识点有一种全新的认识，豁然开朗。

 **希望这篇文章对大家学习小程序能有帮助，来自一个奔跑在前端路上的前端小白。**



