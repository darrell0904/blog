# 前端开发面试题(js篇)

https://github.com/markyun/My-blog/blob/master/Front-end-Developer-Questions/Questions-and-Answers/README.md

### 1，请描述一下 cookies，sessionStorage 和 localStorage 的区别

```
  cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。
  cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。
  sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

  存储大小：
  	cookie数据大小不能超过4k。
  	sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

  有期时间：
  	localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
  	sessionStorage  数据在当前浏览器窗口关闭后自动删除。
  	cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
```



### 2，iframe有那些缺点？

```
  *iframe会阻塞主页面的Onload事件；
  *搜索引擎的检索程序无法解读这种页面，不利于SEO;

  *iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

  使用iframe之前需要考虑这两个缺点。如果需要使用iframe，最好是通过javascript
  动态给iframe添加src属性值，这样可以绕开以上两个问题。
```



### 3，谈谈This对象的理解

```
this总是指向函数的直接调用者（而非间接调用者）；
如果有new关键字，this指向new出来的那个对象；
在事件中，this指向触发这个事件的对象，特殊的是，IE中的attachEvent中的this总是指向全局对象Window；
```

### 4，javascript 代码中的”use strict”;是什么意思 ? 使用它区别是什么？



### 5，讲讲jquery中的deferred



### 6，用过事件委托吗？怎么用的？(事件绑定、事件监听、事件委托)



事件委托：让利用事件冒泡的原理，让自己的所触发的事件，让他的父元素代替执行！



参考文章：

[事件绑定、事件监听、事件委托](http://blog.xieliqun.com/2016/08/12/event-delegate/)，

[JS事件：捕获与冒泡、事件处理程序、事件对象、跨浏览器、事件委托](https://github.com/amandakelake/blog/issues/38)



### 6.1，说说Dom0，Dom2，Dom3，IE中的事件执行程序





[DOM0,DOM2,DOM3事件,事件基础知识入门](https://www.cnblogs.com/diligenceday/p/4175721.html)





### 7，单页应用与多页应用的区别



### 8，移动端300毫秒点击延迟



### 9，ajax如何实现、readyState五中状态的含义?

**先要了解`ajax`的流程**

```
1)客户端产生js的事件
2)创建XMLHttpRequest对象
3)对XMLHttpRequest进行配置
4)通过AJAX引擎发送异步请求
5)服务器端接收请求并且处理请求，返回html或者xml内容
6)XML调用一个callback()处理响应回来的内容
7)页面局部刷新
```



**readystate 0~4**

```
0：未初始化状态：此时，已经创建了一个XMLHttpRequest对象
1： 准备发送状态：此时，已经调用了XMLHttpRequest对象的open方法，并且XMLHttpRequest对象已经准备好将一个请求发送到服务器端
2：已经发送状态：此时，已经通过send方法把一个请求发送到服务器端，但是还没有收到一个响应
3：正在接收状态：此时，已经接收到HTTP响应头部信息，但是消息体部分还没有完全接收到
4：完成响应状态：此时，已经完成了HTTP响应的接收
```





### 10，怎么处理跨域，跨域的解决方案有哪些？

```
 jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面
```



### 11，react在setState后发生了什么（直接说了setState源码）



相关链接：

[源码看React setState漫谈1](https://segmentfault.com/a/1190000011170740)，

[源码看React setState漫谈2](https://segmentfault.com/a/1190000011184268)，

[React - setState源码分析](https://github.com/amandakelake/blog/issues/29)，



### 12，浏览器的渲染过程



### 13，new 操作符到底做了什么

```
1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
2、属性和方法被加入到 this 引用的对象中。
3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。

var obj  = {};
obj.__proto__ = Base.prototype;
Base.call(obj);
```



### 14，promise原理解释



### 15，浏览器缓存机制

[浏览器缓存机制](https://segmentfault.com/a/1190000008377508)



### 16，如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）

```
多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms
```



### 17，Javascript如何实现继承？



### 18，写一个通用的事件侦听器函数。

与Dom、Dom2、Dom3、IE中的事件对象操作。

```
 	// event(事件)工具集，来源：github.com/markyun
 	markyun.Event = {
 		// 页面加载完成后
 		readyEvent : function(fn) {
 			if (fn==null) {
 				fn=document;
 			}
 			var oldonload = window.onload;
 			if (typeof window.onload != 'function') {
 				window.onload = fn;
 			} else {
 				window.onload = function() {
 					oldonload();
 					fn();
 				};
 			}
 		},
 		// 视能力分别使用dom0||dom2||IE方式 来绑定事件
 		// 参数： 操作的元素,事件名称 ,事件处理程序
 		addEvent : function(element, type, handler) {
 			if (element.addEventListener) {
 				//事件类型、需要执行的函数、是否捕捉
 				element.addEventListener(type, handler, false);
 			} else if (element.attachEvent) {
 				element.attachEvent('on' + type, function() {
 					handler.call(element);
 				});
 			} else {
 				element['on' + type] = handler;
 			}
 		},
 		// 移除事件
 		removeEvent : function(element, type, handler) {
 			if (element.removeEventListener) {
 				element.removeEventListener(type, handler, false);
 			} else if (element.datachEvent) {
 				element.detachEvent('on' + type, handler);
 			} else {
 				element['on' + type] = null;
 			}
 		},
 		// 阻止事件 (主要是事件冒泡，因为IE不支持事件捕获)
 		stopPropagation : function(ev) {
 			if (ev.stopPropagation) {
 				ev.stopPropagation();
 			} else {
 				ev.cancelBubble = true;
 			}
 		},
 		// 取消事件的默认行为
 		preventDefault : function(event) {
 			if (event.preventDefault) {
 				event.preventDefault();
 			} else {
 				event.returnValue = false;
 			}
 		},
 		// 获取事件目标
 		getTarget : function(event) {
 			return event.target || event.srcElement;
 		},
 		// 获取event对象的引用，取到事件的所有信息，确保随时能使用event；
 		getEvent : function(e) {
 			var ev = e || window.event;
 			if (!ev) {
 				var c = this.getEvent.caller;
 				while (c) {
 					ev = c.arguments[0];
 					if (ev && Event == ev.constructor) {
 						break;
 					}
 					c = c.caller;
 				}
 			}
 			return ev;
 		}
 	};
```





### 19，尽可能全面正确的解析一个任意`url`的所有参数为`Object`。如下，实现一个`parseParam`方法。

```
var url = 'http://www.domain.com/?user=anonymous&id=123&id=456&city=%E5%8C%97%E4%BA%AC&d&enabled';

parseParam(url);

/**
结果：
{
   user: 'anonymous',
   id: [123, 456], // 重复出现的 key 要组装成数组，能被转成数字的就转成数字类型
   city: '北京', // 中文
   enabled: true, // 未指定值的 key 约定值为 true
}
*/
```



### 20，实现一个最简单的模板引擎

```
render('我是{{name}}，年龄{{age}}，性别{{sex}}',{
	name:'姓名',
	age:18
})

// 结果： 我是姓名，年龄18，性别undefined。

```

[一行代码实现一个简单的模板字符串替换](https://github.com/jawil/blog/issues/32)



### 21，将一个任意长的数字变成逗号分割的格式

```
// 1234.56 => "1,234.56" , 123456789 => "123,456,789"

parseToMoney(1234.56) // return "1,234.56"
```



### 22，将数字转换成中文大写的表示，处理到万级别，例如 12345 -> 一万二千三百四十五

```
function toLowerNum(){

}

console.log(toLowerNum(12345)); // 输出 一万二千三百四十五

console.log(toLowerNum(10001)); // 输出 一万零一

console.log(toLowerNum(10011)); // 输出 一万零十一

console.log(toLowerNum(10000)); // 输出 一万


```



### 23，下面五段代码分别输出什么？并且什么时候输出什么？  

```
for(var i = 0; i < 5; i++) {
    console.log(i);
}

for(var i = 0; i < 5; i++) {
    setTimeout(function() {
        console.log(i);
    }, 1000 * i);
}

for(var i = 0; i < 5; i++) {
    (function(i) {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    })(i);
}
for(var i = 0; i < 5; i++) {
    (function() {
        setTimeout(function() {
            console.log(i);
        }, i * 1000);
    })(i);
}
for(var i = 0; i < 5; i++) {
    setTimeout((function(i) {
        console.log(i);
    })(i), i * 1000);
}
```



### 24，从浏览器输入地址后发生了什么事情？



DNS lookup（缓存）

发起请求 

* 判断expire缓存，是否发起真实请求

- 带上上次的 last-modified和etag。
- 带上cookie
- 带上诸多header，referrer，ua等
- 是否支持gzip请求到服务端

请求到服务端

* 判断last-modified和etag，无变化直接返回403

- cdn 或者 应用服务器
- slb负载均衡
- nginx，转发，缓存策略等
- 应用进程
- response ,gzip

请求响应

* 301 永久重定向，302 重定向

- 4xx 请求错误
- 5xx 应用内部错误

浏览器渲染

* 解析dom

- 请求css,js，图片资源。并行，有限制
- 执行js，css会阻塞渲染和加载。

```
    注：这题胜在区分度高，知识点覆盖广，再不懂的人，也能答出几句，
    而高手可以根据自己擅长的领域自由发挥，从URL规范、HTTP协议、DNS、CDN、数据库查询、
    到浏览器流式解析、CSS规则构建、layout、paint、onload/domready、JS执行、JS API绑定等等；

    详细版：
  	1、浏览器会开启一个线程来处理这个请求，对 URL 分析判断如果是 http 协议就按照 Web 方式来处理;
  	2、调用浏览器内核中的对应方法，比如 WebView 中的 loadUrl 方法;
      3、通过DNS解析获取网址的IP地址，设置 UA 等信息发出第二个GET请求;
  	4、进行HTTP协议会话，客户端发送报头(请求报头);
      5、进入到web服务器上的 Web Server，如 Apache、Tomcat、Node.JS 等服务器;
      6、进入部署好的后端应用，如 PHP、Java、JavaScript、Python 等，找到对应的请求处理;
  	7、处理结束回馈报头，此处如果浏览器访问过，缓存上有对应资源，会与服务器最后修改时间对比，一致则返回304;
      8、浏览器开始下载html文档(响应报头，状态码200)，同时使用缓存;
      9、文档树建立，根据标记请求所需指定MIME类型的文件（比如css、js）,同时设置了cookie;
      10、页面开始渲染DOM，JS根据DOM API操作DOM,执行事件绑定等，页面显示完成。

    简洁版：
  	浏览器根据请求的URL交给DNS域名解析，找到真实IP，向服务器发起请求；
  	服务器交给后台处理完成后返回数据，浏览器接收文件（HTML、JS、CSS、图象等）；
  	浏览器对加载到的资源（HTML、JS、CSS等）进行语法解析，建立相应的内部数据结构（如HTML的DOM）；
  	载入解析到的资源文件，渲染页面，完成。
```



### 25，What is a Polyfill?

```
  polyfill 是“在旧版浏览器上复制标准 API 的 JavaScript 补充”,可以动态地加载 JavaScript 代码或库，在不支持这些标准 API 的浏览器中模拟它们。
  例如，geolocation（地理位置）polyfill 可以在 navigator 对象上添加全局的 geolocation 对象，还能添加 getCurrentPosition 函数以及“坐标”回调对象，
  所有这些都是 W3C 地理位置 API 定义的对象和函数。因为 polyfill 模拟标准 API，所以能够以一种面向所有浏览器未来的方式针对这些 API 进行开发，
  一旦对这些 API 的支持变成绝对大多数，则可以方便地去掉 polyfill，无需做任何额外工作。
```





### 26，请介绍一下JS之事件节流？

截流时一段时间内肯定会执行

节流的目的是防止某些操作执行的太快。比如在调整浏览器大小的时候会出发`onresize`事件，如果在其内部进行一些`DOM`操作，这种高频率的更爱可能会使浏览器崩溃。为了避免这种情况，可以采取函数节流的方式。

```
function throttle(method){
    clearTimeout(method.tId);
    method.tId = setTimeout(function(){
        method();
    }, 100)
}
```

执行时先清除之前的定时器，然后将当前定时器赋值给方法的`tId`，之后调用函数。

```
function resizeDiv(){
    let div = document.getElementById('div');
    div.style.height = div.offsetWidth + "px";
}

window.onresize = function(){
    throttle(resizeDiv);
}
```



平时我们`window`中的`scroll`事件和`input`的`change`事件等等。

![jieliu.png](https://upload-images.jianshu.io/upload_images/1505342-b99a1e609f72efdd.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 27，什么是JS的函数防抖？

防抖就是执行最后一次。

[JS函数节流和函数防抖问题分析](http://www.cnblogs.com/goloving/p/8672464.html)

相关参考：[什么是节流和去抖](https://www.cnblogs.com/goloving/p/8672361.html)



### 28，http状态码有那些？分别代表是什么意思？

```
简单版
  	[
  		100  Continue	继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
  		200  OK 		正常返回信息
  		201  Created  	请求成功并且服务器创建了新的资源
  		202  Accepted 	服务器已接受请求，但尚未处理
  		301  Moved Permanently  请求的网页已永久移动到新位置。
  		302 Found  		临时性重定向。
  		303 See Other  	临时性重定向，且总是使用 GET 请求新的 URI。
  		304  Not Modified 自从上次请求后，请求的网页未修改过。

  		400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
  		401 Unauthorized 请求未授权。
  		403 Forbidden  	禁止访问。
  		404 Not Found  	找不到如何与 URI 相匹配的资源。

  		500 Internal Server Error  最常见的服务器端错误。
  		503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。
  	]

```



```
 完整版
    1**(信息类)：表示接收到请求并且继续处理
  	100——客户必须继续发出请求
  	101——客户要求服务器根据请求转换HTTP协议版本

    2**(响应成功)：表示动作被成功接收、理解和接受
  	200——表明该请求被成功地完成，所请求的资源发送回客户端
  	201——提示知道新文件的URL
  	202——接受和处理、但处理未完成
  	203——返回信息不确定或不完整
  	204——请求收到，但返回信息为空
  	205——服务器完成了请求，用户代理必须复位当前已经浏览过的文件
  	206——服务器已经完成了部分用户的GET请求

    3**(重定向类)：为了完成指定的动作，必须接受进一步处理
  	300——请求的资源可在多处得到
  	301——本网页被永久性转移到另一个URL
  	302——请求的网页被转移到一个新的地址，但客户访问仍继续通过原始URL地址，重定向，新的URL会在response中的Location中返回，浏览器将会使用新的URL发出新的Request。
  	303——建议客户访问其他URL或访问方式
  	304——自从上次请求后，请求的网页未修改过，服务器返回此响应时，不会返回网页内容，代表上次的文档已经被缓存了，还可以继续使用
  	305——请求的资源必须从服务器指定的地址得到
  	306——前一版本HTTP中使用的代码，现行版本中不再使用
  	307——申明请求的资源临时性删除

    4**(客户端错误类)：请求包含错误语法或不能正确执行
  	400——客户端请求有语法错误，不能被服务器所理解
  	401——请求未经授权，这个状态代码必须和WWW-Authenticate报头域一起使用
  	HTTP 401.1 - 未授权：登录失败
  	　　HTTP 401.2 - 未授权：服务器配置问题导致登录失败
  	　　HTTP 401.3 - ACL 禁止访问资源
  	　　HTTP 401.4 - 未授权：授权被筛选器拒绝
  	HTTP 401.5 - 未授权：ISAPI 或 CGI 授权失败
  	402——保留有效ChargeTo头响应
  	403——禁止访问，服务器收到请求，但是拒绝提供服务
  	HTTP 403.1 禁止访问：禁止可执行访问
  	　　HTTP 403.2 - 禁止访问：禁止读访问
  	　　HTTP 403.3 - 禁止访问：禁止写访问
  	　　HTTP 403.4 - 禁止访问：要求 SSL
  	　　HTTP 403.5 - 禁止访问：要求 SSL 128
  	　　HTTP 403.6 - 禁止访问：IP 地址被拒绝
  	　　HTTP 403.7 - 禁止访问：要求客户证书
  	　　HTTP 403.8 - 禁止访问：禁止站点访问
  	　　HTTP 403.9 - 禁止访问：连接的用户过多
  	　　HTTP 403.10 - 禁止访问：配置无效
  	　　HTTP 403.11 - 禁止访问：密码更改
  	　　HTTP 403.12 - 禁止访问：映射器拒绝访问
  	　　HTTP 403.13 - 禁止访问：客户证书已被吊销
  	　　HTTP 403.15 - 禁止访问：客户访问许可过多
  	　　HTTP 403.16 - 禁止访问：客户证书不可信或者无效
  	HTTP 403.17 - 禁止访问：客户证书已经到期或者尚未生效
  	404——一个404错误表明可连接服务器，但服务器无法取得所请求的网页，请求资源不存在。eg：输入了错误的URL
  	405——用户在Request-Line字段定义的方法不允许
  	406——根据用户发送的Accept拖，请求资源不可访问
  	407——类似401，用户必须首先在代理服务器上得到授权
  	408——客户端没有在用户指定的饿时间内完成请求
  	409——对当前资源状态，请求不能完成
  	410——服务器上不再有此资源且无进一步的参考地址
  	411——服务器拒绝用户定义的Content-Length属性请求
  	412——一个或多个请求头字段在当前请求中错误
  	413——请求的资源大于服务器允许的大小
  	414——请求的资源URL长于服务器允许的长度
  	415——请求资源不支持请求项目格式
  	416——请求中包含Range请求头字段，在当前请求资源范围内没有range指示值，请求也不包含If-Range请求头字段
  	417——服务器不满足请求Expect头字段指定的期望值，如果是代理服务器，可能是下一级服务器不能满足请求长。

    5**(服务端错误类)：服务器不能正确执行一个正确的请求
  	HTTP 500 - 服务器遇到错误，无法完成请求
  	　　HTTP 500.100 - 内部服务器错误 - ASP 错误
  	　　HTTP 500-11 服务器关闭
  	　　HTTP 500-12 应用程序重新启动
  	　　HTTP 500-13 - 服务器太忙
  	　　HTTP 500-14 - 应用程序无效
  	　　HTTP 500-15 - 不允许请求 global.asa
  	　　Error 501 - 未实现
    HTTP 502 - 网关错误
    HTTP 503：由于超载或停机维护，服务器目前无法使用，一段时间后可能恢复正常

```



### 29，js各种继承实现



### 30，ECMAScript 6 怎么写 class ，为何会出现 class？

​	ES6的class可以看作只是一个语法糖，它的绝大部分功能，ES5都可以做到，新的class写法只是让对象原型的写法更加清晰、更像面向对象编程的语法而已。

​	

### 31，使用原生的js写一个日历组件`datePicker`



### 32，`jquery`源码的封装思想



[jQuery源码--------封装思想](https://github.com/amandakelake/blog/issues/12)





### 33，大文件如何进行分片上传和断点续传？



[大文件分片上传和断点续传](https://blog.csdn.net/u013127850/article/details/52290720)，



### 34，下面代码输出的结果是什么？

```
for(i=0,j=0; i<10,j<6; i++,j++){
    k = i + j;
}

输出 10
```

一般在for循环中：

```
for(语句1;语句2;语句3){
    被执行的代码块；
}

语句 1 在循环（代码块）开始前执行 
语句 2 定义运行循环（代码块）的条件 
语句 3 在循环（代码块）已被执行之后执行

语句2中一般以后面的一个为准，也就是，上面的j<6为主，所以输出为10。
```

看看这个

```
for(i=0,j=0; i<6,j<10; i++,j++){
    k = i + j;
}

输出 18
```





### 35，`js`的深浅拷贝

```
function cloneObject(o) {
    if(!o || 'object' !== typeof o) {
        return o;
    }
    var c = 'function' === typeof o.pop ? [] : {};
    var p, v;
    for(p in o) {
        if(o.hasOwnProperty(p)) {
            v = o[p];
            if(v && 'object' === typeof v) {
                c[p] = Ext.ux.clone(v);
            }
            else {
                c[p] = v;
            }
        }
    }
    return c;
};

```



### 36，http状态码，304什么情况



### 37，JavaScript数组去重

1. **双循环去重** ：先定义一个包含原始数组第一个元素的数组，然后遍历原始数组，将原始数组中的每个元素与新数组中的每个元素进行比对，如果不重复则添加到新数组中，最后返回新数组；（消耗内存）

   ```
   function unique(arr) {
   	// 判断是否为数组
       if (!Array.isArray(arr)) {
           console.log('type error!')
           return
       }
       let res = [arr[0]]
       for (let i = 1; i < arr.length; i++) {
           let flag = true
           for (let j = 0; j < res.length; j++) {
               if (arr[i] === res[j]) {
                   flag = false;
                   break
               }
           }
           if (flag) {
               res.push(arr[i])
           }
       }
       return res
   }
   ```

2. **indexOf方法去重1**：数组的`indexOf()`方法可返回某个指定的元素在数组中首次出现的位置。该方法首先定义一个空数组`res`，然后调用`indexOf`方法对原来的数组进行遍历判断，如果元素不在`res`中，则将其push进`res`中，最后将`res`返回即可获得去重的数组。

   ```
   function unique(arr) {
       if (!Array.isArray(arr)) {
           console.log('type error');
           return;
       }
       
       let res = [];
       for (let i = 0; i < arr.length; i++) {
         	if (res.indexOf(arr[i]) === -1) {
               res.push(arr[i])
           }   
       }
       return res;
   }
   ```

3. **indexOf方法去重2**：利用indexOf检测元素在数组中第一次出现的位置是否和元素现在的位置相等，如果不等则说明该元素是重复元素

   ```
   function unique(arr) {
       if (!Array.isArray(arr)) {
           console.log('type error!')
           return
       }
       return Array.prototype.filter.call(arr, function(item, index){
           return arr.indexOf(item) === index;
       });
   }
   ```

   这里`filter`的用法就是过滤作用，返回我们需要的，剔除我们不要的：

   ```
   let a = [1,2,3,4,5,4,3,3,2,1];
   a.filter(function(item,index){
   	return a.indexOf(item) === index;
   })
   // 返回去重后的数组
   ```

4. **相邻元素去重**：这种方法首先调用了数组的排序方法sort()，然后根据排序后的结果进行遍历及相邻元素比对，如果相等则跳过该元素，直到遍历结束

   ```
   function unique(arr) {
       if (!Array.isArray(arr)) {
           console.log('type error!')
           return
       }
       arr = arr.sort()
       let res = []
       for (let i = 0; i < arr.length; i++) {
           if (arr[i] !== arr[i-1]) {
               res.push(arr[i])
           }
       }
       return res
   }
   ```


   数组的`sort`方法，可以看下面几个例子：

   ```
   //例1.字母排序
   var a = new Array("banna","watermelon","orange","apple");
   s.sort(); 
   console.log(a) //输出 ["apple", "banna", "orange", "watermelon"]
   //没什么好说的，比较函数缺省，按照字母顺序升序排序 a<b<o<w

   //例2.转化为字母排序
   var a=[11,2,44,3,5,6];
   a.sort();
   console.log(a) // [11, 2, 3, 44, 5, 6]
   //说明第一条，数字转为字符串，"11"<"2"<"3"<"44"<"5"<"6"

   //例3.数字排序
   var a=[11,2,44,3,5,6];
   a.sort(function(a,b){
       return a-b; 
       // 升序——当a<b时，a-b返回一个小于0的值。根据说明2-a，a会在b的前面，则实现了升序排序。
       // 反之如果想实现降序排序，return b-a即可。
   });
   console.log(a) //输出 [2, 3, 5, 6, 11, 44]

   //例4.随机排序
   var a=[11,2,44,3,5,6];
   a.sort(function(a,b){
       return Math.random()>.5?-1:1; //根据说明2-c特性，实现随机排序
   });
   console.log(a) //每次运行的输出都不同
   ```

   更多的可以参考：

   [Array.prototype.sort()方法到底是如何排序的](https://segmentfault.com/a/1190000009249758)，

5. **利用对象属性去重**：创建空对象，遍历数组，将数组中的值设为对象的属性，并给该属性赋初始值1，每出现一次，对应的属性值增加1，这样，属性值对应的就是该元素出现的次数了。

   ```
   function unique(arr) {
       if (!Array.isArray(arr)) {
           console.log('type error!')
           return
       }
       let res = [],
           obj = {}
       for (let i = 0; i < arr.length; i++) {
       	console.log(obj);
           if (!obj[arr[i]]) {
               res.push(arr[i])
               obj[arr[i]] = 1
           } else {
               obj[arr[i]]++
           }
       }
       return res
   }

   var a = [11, 11, 2, 2, 27, 3, 44, 44, 5, 6, 6, 9];

   ========obj输出的结果==========
   > {11: 1}
   > {11: 2}
   > {2: 1, 11: 2}
   > {2: 2, 11: 2}
   > {2: 2, 11: 2, 27: 1}
   > {2: 2, 3: 1, 11: 2, 27: 1}
   > {2: 2, 3: 1, 11: 2, 27: 1, 44: 1}
   > {2: 2, 3: 1, 11: 2, 27: 1, 44: 2}
   > {2: 2, 3: 1, 5: 1, 11: 2, 27: 1, 44: 2}
   > {2: 2, 3: 1, 5: 1, 6: 1, 11: 2, 27: 1, 44: 2}
   > {2: 2, 3: 1, 5: 1, 6: 2, 11: 2, 27: 1, 44: 2}
   ```

   ​

### 38，三级联动怎么实现？



### 39，怎么判断一个变量时数组



### 40，如何合并两个数组，20.如何合并两个数组？数组删除一个元素?（还没看）

```
 （1）var arr1=[1,2,3];
               var arr2=[4,5,6];
               arr1 = arr1.concat(arr2);
               console.log(arr1); 
 （2）var arr1=[1,2,3];
               var arr2=[4,5,6];
               Array.prototype.push.apply(arr1,arr2);
               console.log(arr1);
 （3）var arr1=[1,2,3];
               var arr2=[4,5,6];
               for (var i=0; i < arr2.length; i++) {
                   arr1.push( arr2[i] );
               }
               console.log(arr1);
```





### 41，jq中怎么样编写插件？

```
//第一种是类级别的插件开发：
//1.1 添加一个新的全局函数 添加一个全局函数，我们只需如下定义： 
jQuery.foo = function() {
     alert('This is a test. This is only a test.');  };   

//1.2 增加多个全局函数 添加多个全局函数，可采用如下定义： 
jQuery.foo = function() {
       alert('This is a test. This is only a test.');  };  
jQuery.bar = function(param) {
      alert('This function takes a parameter, which is "' + param + '".');  };   调用时和一个函数的一样的:jQuery.foo();jQuery.bar();或者$.foo();$.bar('bar');
//1.3 使用jQuery.extend(object);　 
jQuery.extend({
      foo: function() {
          alert('This is a test. This is only a test.');
        },
      bar: function(param) {
          alert('This function takes a parameter, which is "' + param +'".');
        }
     }); 
     
//1.4 使用命名空间
// 虽然在jQuery命名空间中，我们禁止使用了大量的javaScript函数名和变量名。
// 但是仍然不可避免某些函数或变量名将于其他jQuery插件冲突，因此我们习惯将一些方法
// 封装到另一个自定义的命名空间。
jQuery.myPlugin = {         
foo:function() {         
  alert('This is a test. This is only a test.');         
 },         
 bar:function(param) {         
  alert('This function takes a parameter, which is "' + param + '".');   
 }        
}; 
//采用命名空间的函数仍然是全局函数，调用时采用的方法： 
$.myPlugin.foo();        
$.myPlugin.bar('baz');
//通过这个技巧（使用独立的插件名），我们可以避免命名空间内函数的冲突。

//第二种是对象级别的插件开发
//形式1： 
(function($){    
  $.fn.extend({    
   pluginName:function(opt,callback){    
             // Our plugin implementation code goes here.      
   }    
  })    
})(jQuery);  

//形式2：
(function($) {      
   $.fn.pluginName = function() {    
        // Our plugin implementation code goes here.    
   };     
})(jQuery);
//形参是$，函数定义完成之后,把jQuery这个实参传递进去.立即调用执行。
//这样的好处是,我们在写jQuery插件时,也可以使用$这个别名,而不会与prototype引起冲突
```



### 42，websocket是否了解？

通常情况下，面试官问你是否对XX有了解，一般的回答都是要涵盖下面这些点：

- 是否知道它是什么？
- 是否知道它的用途是什么？
- 它和之前某项已有的技术相比，有哪些优缺点？

webSocket和http一样，同属于应用层协议。它最重要的用途是实现了客户端与服务端之间的全双工通信，当服务端数据变化时，可以第一时间通知到客户端。

除此之外，它与http协议不同的地方还有：

- http只能由客户端发起，而webSocket是双向的。
- webSocket传输的数据包相对于http而言很小，很适合移动端使用
- 没有同源限制，可以跨域共享资源

[WebSocket 教程](http://www.ruanyifeng.com/blog/2017/05/websocket.html)



### 43，jsonp原理

**工作原理**：使用script标签实现跨域访问，可在url中指定回调函数，获取JSON数据并在指定的回调函数中执行jquery实现jsop。

**缺点**：只支持GET方式的jsonp实现，是一种脚本注入行为存在一定的安全隐患。如果返回的数据格式有问题或者返回失败了，并不会报错。



`JSONP`是一种跨域共享资源的方法。

很多人会好奇`JSONP`和`JSON`是什么关系，`JSONP`是`JSON with padding`的缩写，即填充式`JSON`或参数式`JSON`，是被包含在函数调用中的`JSON`，如下面的样子：

```
callback({"name": "Chong"});
```

`JSONP`是通过动态`<script>`元素来实现的，使用时可以为`src`属性指定一个跨域`URL`。由于浏览器加载脚本是不受同源规则限制的，所以即使是跨域的URL同样可以发送请求。因为`JSONP`是有效的`JavaScript`代码，所以再请求完成后，即在`JSONP`响应加载到页面中以后，就会立即执行。

示例代码：

```
function handleResponse(response){
    alert("您的IP地址是 " + response.ip);
}

var script = document.createElement("script");
script.src = "http://freegeoip.net/json/?callback=handleResponse";
document.body.insertBefore(script, document.body.firstChild);
```

所以总结一下`JSONP`的实现方式：

1. 向当前页面中动态插入一个`<script>`元素，`src`属性设置为请求地址，并在地址中指定好回调函数
2. `js`代码中预先定义好`jsonp`的回调函数
3. 请求完成后，会立即调用预先指定好的`jsonp`回调，并将数据以`json`的格式传递到回调中。

`JSONP`之所以可以实现跨域，依赖的是下面的条件：

1. 浏览器请求脚本是不受同源规则限制的
2. `<script>`元素加载完成的脚本会立即执行

需要注意的是，`JSONP`是需要服务端配合的，因为`JSONP`返回的是一段代码。



### 44，如何实现数组的随机排序？（查看）

```
  方法一：
  	var arr = [1,2,3,4,5,6,7,8,9,10];
  	function randSort1(arr){
  		for(var i = 0,len = arr.length;i < len; i++ ){
  			var rand = parseInt(Math.random()*len);
  			var temp = arr[rand];
  			arr[rand] = arr[i];
  			arr[i] = temp;
  		}
  		return arr;
  	}
  	console.log(randSort1(arr));
  	
  方法二：
  	var arr = [1,2,3,4,5,6,7,8,9,10];
  	function randSort2(arr){
  		var mixedArray = [];
  		while(arr.length > 0){
  			var randomIndex = parseInt(Math.random()*arr.length);
  			mixedArray.push(arr[randomIndex]);
  			arr.splice(randomIndex, 1);
  		}
  		return mixedArray;
  	}
  	console.log(randSort2(arr));

  方法三：
  	var arr = [1,2,3,4,5,6,7,8,9,10];
  	arr.sort(function(){
  		return Math.random() - 0.5;
  	})
  	console.log(arr);
```



### 45，针对 jQuery 的优化方法？

```
 *基于Class的选择性的性能相对于Id选择器开销很大，因为需遍历所有DOM元素。

 *频繁操作的DOM，先缓存起来再操作。用Jquery的链式调用更好。
  比如：var str=$("a").attr("href");

 *for (var i = size; i < arr.length; i++) {}
  for 循环每一次循环都查找了数组 (arr) 的.length 属性，在开始循环的时候设置一个变量来存储这个数字，可以让循环跑得更快：
  for (var i = size, length = arr.length; i < length; i++) {}
```



### 46，使用JS实现获取文件扩展名？（草料：active_add_new.js）

```
function getSuffix(file_name) {
    var result = /[^\.]+$/.exec(file_name);
    return result;
}

getSuffix('123.png');
// ["png", index: 4, input: "123.png", groups: undefined]
getSuffix('1.2.3.png')
// ["png", index: 6, input: "1.2.3.png", groups: undefined]
```



### 47，超出省略方法



### 48，JS 实现一个闭包函数,每次调用都自增1

```
var add = (function() {
  // 声明一变量,由于下面 return所以变量只会声明一次
  var count = 0; 
  return function() {
    return console.log(count++);
  };
})();

add(); // 0
add(); // 1
add(); // 2

```



49，JS 实现函数运行一秒后打印输出0-9;给定如下代码

```
// 这道题涉及到作用域
for(var i=0;i<10;i++){
  setTimeout((function(i){
   return function(){
       console.log(i);
   }
  })(i),1000);
}
```



50，使用不少于三种方式替换文本`"dream"`改成`"package"`,提供字符串`"I have a dream"`;

[2018春招前端面试: 闯关记(精排精校) | 掘金技术征文](https://juejin.im/post/5a998991f265da237f1dbdf9)其中的一道题。



51，浏览器的回流与重绘 (Reflow & Repaint)

[回流与重绘](https://juejin.im/post/5a9923e9518825558251c96a)

浏览器在接收到 `html` 与 `css` 后，渲染的步骤是：`html` 经过渲染生成 `DOM` 树， `css` 经过渲染生成 `css` 渲染树，两者再经过结合，生成 `render tree`，浏览器就可以根据 `render tree` 进行画面绘制。

如果浏览器从服务器接收到了新的 `css` ，需要更新页面时，需要经过什么操作呢？这就是回流 `reflow` 与重绘 `repaint`。由于浏览器在重新渲染页面时会先进行 `reflow` 再进行 `repaint`，因此，回流必将引起重绘，而重绘不一定会引起回流。

重绘：当前元素的样式(背景颜色、字体颜色等)发生改变的时候，我们只需要把改变的元素重新的渲染一下即可，重绘对浏览器的性能影响较小。发生重绘的情形：改变容器的外观风格等，比如 `background：black` 等。改变外观，不改变布局，不影响其他的 `DOM`。  回流：是指浏览器为了重新渲染部分或者全部的文档而重新计算文档中元素的位置和几何构造的过程。

因为回流可能导致整个 `DOM` 树的重新构造，所以是性能的一大杀手，一个元素的回流导致了其所有子元素以及 `DOM` 中紧随其后的祖先元素的随后的回流。下面贴出会触发浏览器 `reflow` 的变化：

- 页面首次渲染
- 浏览器窗口大小发生改变
- 元素尺寸或位置发生改变
- 元素内容变化（文字数量或图片大小等等）
- 元素字体大小变化
- 添加或者删除可见的DOM元素
- 激活CSS伪类（例如：:hover）
- 查询某些属性或调用某些方法




### 52，JS对象的深复制

[深入剖析 JavaScript 的深复制](http://jerryzou.com/posts/dive-into-deep-clone-in-javascript/)



### 53，浏览器缓存

[浏览器缓存](https://segmentfault.com/a/1190000011212929)



### 54，同一个对象节点上绑定多个事件，执行的顺序是怎样的？



### 55，你知道有没有什么事件不支持冒泡，捕获的？



### 56，304状态码是怎么样，怎么产生的？--》Etag值怎么产生的？



### 57，移动端300毫秒延迟，怎么解决的？移动端点击穿透？



### 58，https说一下过程？

[谈谈 HTTPS](http://cherryblog.site/HTTPS.html)



### 59，说说性能优化？具体哪些优化的收益较大？



### 60，你对vue的源码了解吗，给我讲讲双向绑定原理怎么实现的？详细描述什么时候监听变化的，什么时候触发变化的？



### 61，双飞翼布局怎么保证三列的高度一致呢？



### 62，移动端适配是响应式，还是通过其他方案？



### 63，sso的作用和流程



### 64，为什么用Object.prototype.toString.call(obj)检测对象类型?  使用`typeof bar === "object"`检测”bar”是否为对象有什么缺点？如何避免？

这是一个十分常见的问题，用 `typeof` 是否能准确判断一个对象变量，答案是否定的，`null` 的结果也是 object，`Array` 的结果也是 object，有时候我们需要的是 "纯粹" 的 object 对象。

通过这个方法判断：

```
console.log(Object.prototype.toString.call(obj) === "[object Object]");
```



这个是 `object.prototype.toString` 方法调用的结果：

（无法区分自定义对象类型，自定义类型可以采用instanceof区分）



```
console.log(Object.prototype.toString.call("jerry"));//[object String]
console.log(Object.prototype.toString.call(12));//[object Number]
console.log(Object.prototype.toString.call(true));//[object Boolean]
console.log(Object.prototype.toString.call(undefined));//[object Undefined]
console.log(Object.prototype.toString.call(null));//[object Null]
console.log(Object.prototype.toString.call({name: "jerry"}));//[object Object]
console.log(Object.prototype.toString.call(function(){}));//[object Function]
console.log(Object.prototype.toString.call([]));//[object Array]
console.log(Object.prototype.toString.call(new Date));//[object Date]
console.log(Object.prototype.toString.call(/\d/));//[object RegExp]
function Person(){};
console.log(Object.prototype.toString.call(new Person));//[object Object]
```

为什么这样就能区分呢？于是我去看了一下 `toString` 方法的用法：`toString` 方法返回反映这个对象的字符串。



**那为什么不直接用obj.toString()呢？**

```
console.log("jerry".toString());//jerry
console.log((1).toString());//1
console.log([1,2].toString());//1,2
console.log(new Date().toString());//Wed Dec 21 2016 20:35:48 GMT+0800 (中国标准时间)
console.log(function(){}.toString());//function (){}
console.log(null.toString());//error
console.log(undefined.toString());//error
```



同样是检测对象 `obj` 调用 `toString` 方法（关于 `toString()` 方法的用法的可以参考[toString的详解](http://www.cnblogs.com/youhong/p/6837534.html)），`obj.toString()` 的结果和 `Object.prototype.toString.call(obj)` 的结果不一样，这是为什么？



这是因为 `toString` 为 `Object` 的原型方法，而 `Array` ，`function` 等类型作为 `Object` 的实例，都重写了`toString` 方法。不同的对象类型调用 `toString` 方法时，根据原型链的知识，调用的是对应的重写之后的 `toString` 方法（function类型返回内容为函数体的字符串，`Array` 类型返回元素组成的字符串.....），而不会去调用 `Object` 上原型 `toString` 方法（返回对象的具体类型），所以采用 `obj.toString()` 不能得到其对象类型，只能将 `obj` 转换为字符串类型；因此，在想要得到对象的具体类型时，应该调用 `Object` 上原型 `toString` 方法。



我们可以验证一下，将数组的 `toString` 方法删除，看看会是什么结果：

```
var arr=[1,2,3];
console.log(Array.prototype.hasOwnProperty("toString"));//true
console.log(arr.toString());//1,2,3
delete Array.prototype.toString;//delete操作符可以删除实例属性
console.log(Array.prototype.hasOwnProperty("toString"));//false
console.log(arr.toString());//"[object Array]"
```



删除了 `Array` 的 `toString` 方法后，同样再采用 `arr.toString()` 方法调用时，不再有屏蔽 `Object` 原型方法的实例方法，因此沿着原型链，`arr` 最后调用了 `Object` 的 `toString` 方法，返回了和`Object.prototype.toString.call(arr)` 相同的结果。



最近在看 `zepto` 的源码，可以这么写：

```
var class2type = {},
	toString = class2type.toString;

var obj = [1,2,3];
toString.call(obj); // [object Array]
```









相关链接：[为什么用Object.prototype.toString.call(obj)检测对象类型?](https://www.cnblogs.com/youhong/p/6209054.html)，[toString()方法详解](https://www.cnblogs.com/youhong/p/6837534.html)



### 65，JS中有哪些识别类型的方法（包括用于识别某种具体类型的方法）？

（一）typeof

1.可以识别标准类型（null除外）

2.不能识别具体的对象类型（function除外）



（二）instanceof

1.可以判别内置对象类型

2.不能判别原始类型

3.可以判别自定义对象类型



（三）Object.prototype.toString.call

1.可以识别标准类型以及内置对象类型

2.不能识别自定义对象类型



（四）constructor

1.可以判别标准类型(undefined/null除外)

2.可以判别内置对象类型

3.可以判别自定义对象类型




### 66，数组的原生api方法：
slice()



### 67，手写一个 `jsonp`



### 68，说说xss与csrf，怎么防止

xss：跨站脚本攻击，如果不过滤执行了js代码，可能导致cookie泄露等。防止：过滤

csrf：跨站请求伪造，挟制用户在当前已登录的Web应用程序上执行非本意的操作。防止：设置token、写操作用post、JSON API禁用CORS、禁用跨域请求、检查referrer



### 69，JS 实现一个闭包函数,每次调用都自增1;

```
var add = (function() {
  // 声明一变量,由于下面 return所以变量只会声明一次
  var count = 0; 
  return function() {
    return console.log(count++);
  };
})();

add(); // 0
add(); // 1
add(); // 2

```



### 70，页面既能滚动，又要去除滚动条怎么做？

```
.tab-ul::-webkit-scrollbar {
      display: none;
} // 去掉滚动条

```

[外面套div，并且外面的div的长度小于里面的](https://blog.csdn.net/liusaint1992/article/details/51277751)

### 71，实现一个菜单栏的横向滚动条？

```
-webkit-overflow-scrolling: touch; // 手机滑动效果
```



### 72，js中的 new 到底做了什么？

```
// 构造函数:
		function myFunction(arg1, arg2) {
		    this.firstName = arg1;
		    this.lastName  = arg2;
		}


	    var a = new myFunction("Li","Cherry");

		new myFunction{
		    var obj = {};
		    obj.__proto__ = myFunction.prototype;
		    var result = myFunction.call(obj,"Li","Cherry");
		    return typeof result === 'obj'? result : obj;
		}

```

```
var cat = new Animal("cat");

new Animal("cat") = {

    var obj = {};

    obj.__proto__ = Animal.prototype;

    var result = Animal.call(obj,"cat");

    return typeof result === 'object'? result : obj;
}
```

（1）创建一个空对象obj;

（2）把obj的__proto__ 指向Animal的原型对象prototype，此时便建立了obj对象的原型链：obj->Animal.prototype->Object.prototype->null

​      【如果你不了解JS原型链，请先阅读：[JS原型和原型链](http://www.cnblogs.com/onepixel/p/5024903.html)】

（3）在obj对象的执行环境调用Animal函数并传递参数“cat”。 相当于var result = obj.Animal("cat")。

​       当这句执行完之后，obj便产生了属性name并赋值为"cat"。【关于JS中call的用法请阅读：[JS的call和apply](http://www.cnblogs.com/onepixel/p/5038020.html)】

（4）考察第3步返回的返回值，如果无返回值或者返回一个非对象值，则将obj返回作为新对象；否则会将返回值作为新对象返回。



![new.png](https://upload-images.jianshu.io/upload_images/1505342-d3793aa3c65466d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 73，简述一下src与href的区别

href 是指向**网络资源所在位置**，建立和当前元素（锚点）或当前文档（链接）之间的链接，用于超链接。

src是指向**外部资源的位置**，指向的内容将会嵌入到文档中当前标签所在位置；在请求src资源时会将其指向的资源下载并应用到文档内，例如js脚本，img图片和frame等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js脚本放在底部而不是头部。

### 74，js二分查找


### 75，js中函数执行完毕为什么会被销毁？？(重要)
[js中函数执行完毕为什么会被销毁？？](https://zhidao.baidu.com/question/460364543534926365.html)


