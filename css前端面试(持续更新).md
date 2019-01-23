# 前端开发面试题(css篇)

### 1，对BFC规范的理解？(块级格式化上下文：block formatting context)

​	 （W3C CSS 2.1 规范中的一个概念,它是一个独立容器，决定了元素如何对其内容进行定位,以及与其他元素的关系和相互作用。）

​	一个页面是由很多个 Box 组成的,元素的类型和 display 属性,决定了这个 Box 的类型。   			

​	不同类型的 Box，会参与不同的 Formatting Context（决定如何渲染文档的容器），因此Box内的元素会以不同的方式渲染，也就是说BFC内部的元素和外部的元素不会互相影响。

### 2，清除浮动的几种方式，各自的优缺点

​	清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

​	

### 3，渐进增强和优雅降级

```
  优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会针对旧版本的IE进行降级处理了,使之在旧式浏览器上以某种形式降级体验却不至于完全不能用。
  如：border-shadow

  渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能,向页面增加不影响基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。
  如：默认使用flash上传，但如果浏览器支持 HTML5 的文件上传功能，则使用HTML5实现更好的体验；
```

### 4，css sprite是什么,有什么优缺点



### 5，CSS3 box-sizing的作用



### 6，移动端一像素边框

[1像素边框](https://www.cnblogs.com/wisewrong/p/6425315.html)

[1边框像素2](https://segmentfault.com/a/1190000007604842)

### 7，css的几种居中方式

* 水平居中：给div设置一个宽度，然后添加margin:0 auto属性

  ```
  div{
   	width:200px;
   	margin:0 auto;
  }
  ```

* 让绝对定位的div居中

  ```
   div {
   	position: absolute;
   	width: 300px;
   	height: 300px;
   	margin: auto;
   	top: 0;
   	left: 0;
   	bottom: 0;
   	right: 0;
   	background-color: pink;	/* 方便看效果 */
   }
  ```

* 水平垂直居中一： 确定容器的宽高 宽500 高 300 的层 设置层的外边距

  ```
   .div {
   	position: absolute;		/* 相对定位或绝对定位均可 */
   	width:500px;
   	height:300px;
   	top: 50%;
   	left: 50%;
   	margin: -150px 0 0 -250px;     	/* 外边距为自身宽高的一半 */
   	background-color: pink;	 	/* 方便看效果 */
    }
  ```

* 水平垂直居中二： 未知容器的宽高，利用 `transform` 属性

  ```
   div {
   	position: absolute;		/* 相对定位或绝对定位均可 */
   	width:500px;
   	height:300px;
   	top: 50%;
   	left: 50%;
   	transform: translate(-50%, -50%);
   	background-color: pink;	 	/* 方便看效果 */
   }
  ```

* 水平垂直居中三：display：flex，实际使用时应考虑兼容性

  ```
   利用 flex 布局
   .container {
   	display: flex;
   	align-items: center; 		/* 垂直居中 */
   	justify-content: center;	/* 水平居中 */

   }
   .container div {
   	width: 100px;
   	height: 100px;
   	background-color: pink;		/* 方便看效果 */
   } 
  ```



### 8，用纯CSS创建一个三角形的原理是什么？

```
  把上、左、右三条边隐藏掉（颜色设为 transparent）
  #demo {
    width: 0;
    height: 0;
    border-width: 20px;
    border-style: solid;
    border-color: transparent transparent red transparent;
  }
```



### 9，让页面里的字体变清晰，变细用CSS怎么做？

```
 -webkit-font-smoothing: antialiased;
```



### 10，如果需要手动写动画，你认为最小时间间隔是多久，为什么？（阿里）（查看）

 	多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms



### 11，rem布局的优缺点，和em有什么区别



### 12，实现导航栏的3D翻转效果，使用`css3`

![css3demo.gif](https://upload-images.jianshu.io/upload_images/1505342-0a6ec00b288037e8.gif?imageMogr2/auto-orient/strip)

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">		
		/* basic menu styles */
		.block-menu {
			display: block;
			background: #000;
		}

		.block-menu li {
			display: inline-block;
		}
		.block-menu li a {
			color: #fff;
			display: block;
			text-decoration: none;
			font-family: 'Passion One', Arial, sans-serif;
			font-smoothing: antialiased;
			text-transform: uppercase;
			overflow: visible;
			line-height: 20px;
			font-size: 24px;
			padding: 15px 10px;
		}
		/* animation domination */
		.three-d {
			perspective: 200px;
			transition: all .07s linear;
			position: relative;
			cursor: pointer;
		}
		/* complete the animation! */
		.three-d:hover .three-d-box, 
		.three-d:focus .three-d-box {
			transform: translateZ(-25px) rotateX(90deg);
		}
		.three-d-box {
			transition: all .3s ease-out;
			transform: translatez(-25px);
			transform-style: preserve-3d;
			pointer-events: none;
			position: absolute;
			top: 0;
			left: 0;
			display: block;
			width: 100%;
			height: 100%;
		}
		/* 
		put the "front" and "back" elements into place with CSS transforms, 
		specifically translation and translatez
		*/
		.front {
			transform: rotatex(0deg) translatez(25px);
		}
		.back {
			transform: rotatex(-90deg) translatez(25px);
			color: #ffe7c4;
		}
		.front, .back {
			display: block;
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			background: black;
			padding: 15px 10px;
			color: white;
			pointer-events: none;
			box-sizing: border-box;
		}
	</style>
</head>
<body>
	<ul class="block-menu lazy ">
		<li>
			<a href="/" class="three-d lazy ">
			Home
				<span aria-hidden="true" class="three-d-box lazy ">
					<span class="front lazy ">Home</span>
					<span class="back lazy ">Home</span>
				</span>
			</a>
		</li>
		<li>
			<a href="/demos" class="three-d lazy ">
			Demos
				<span aria-hidden="true" class="three-d-box lazy ">
					<span class="front lazy ">Demos</span>
					<span class="back lazy ">Demos</span>
				</span>
			</a>
		</li>
<!-- more items here -->
</ul>
</body>
</html>
```





### 13，CSS隐藏元素的几种方法（至少说出三种）

```
Opacity:元素本身依然占据它自己的位置并对网页的布局起作用。它也将响应用户交互;

Visibility:与 opacity 唯一不同的是它不会响应任何用户交互。此外，元素在读屏软件中也会被隐藏;

Display:display 设为 none 任何对该元素直接打用户交互操作都不可能生效。此外，读屏软件也不会读到元素的内容。这种方式产生的效果就像元素完全不存在;

Position:不会影响布局，能让元素保持可以操作;

Clip-path:clip-path 属性还没有在 IE 或者 Edge 下被完全支持。如果要在你的 clip-path 中使用外部的 SVG 文件，浏览器支持度还要低;
```



### 14，li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

​	 行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。