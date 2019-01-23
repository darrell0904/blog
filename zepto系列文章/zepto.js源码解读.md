# zepto.js源码解读

[zepto的api](http://www.css88.com/doc/zeptojs_api/)

[读 Zepto 源码系列](https://github.com/yeyuqiudeng/reading-zepto)

[读 Zepto 源码系列--gitbook](https://yeyuqiudeng.gitbooks.io/reading-zepto/content/)

[读 Zepto 代码 系列](https://github.com/qianlongo/zepto-analysis)

[isPrototypeOf&&getPrototypeOf全屏模式
](https://www.cnblogs.com/giggle/p/5208199.html)https://www.cnblogs.com/giggle/p/5208199.html

#### 1，`zepto` 的结构

```
var Zepto = (function(){
    var $
    
    // ...省略N行代码...
    
    $ = function(selector, context){
        return zepto.init(selector, context)
    }
    
    // ...省略N行代码...
    
    return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)
```







#### 2，`zepto.init` 函数





#### 3，`zepto.Z` 函数



注明：

`zepto.Z.prototype = Z.prototype = $.fn`

读到这里，你可能会有点疑惑，`$` 最终返回的是 `Z` 函数的实例，但是 `Z` 函数明明没有 `dom` 的操作方法啊，这些操作方法都定义在 `$.fn` 身上，为什么 `$` 可以调用这些方法呢？

其实关键在于这句代码 `Z.prototype = $.fn` ，这句代码将 `Z` 的 `prototype` 指向 `$.fn` ，这样，`Z` 的实例就继承了 `$.fn` 的方法。

既然这样就已经让 `Z` 的实例继承了 `$.fn` 的方法，那 `zepto.Z.prototype = $.fn` 又是为什么呢？

如果我们再看源码，会发现有这样的一个方法：

```
zepto.isZ = function(object) {
  return object instanceof zepto.Z
}
```

这个方法是用来判读一个对象是否为 zepto 对象，这是通过判断这个对象是否为 `zepto.Z` 的实例来完成的，因此需要将 `zepto.Z` 和 `Z` 的 `prototype` 指向同一个对象。 `isZ` 方法会在 `init` 中用到，后面也会介绍。





#### 4，`text` 和 `html` 方法实现

`0 in arguments`

[js的arguments到底是什么？](https://blog.csdn.net/qq_16339527/article/details/53231725)

[MDN的arguments](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Functions/arguments)



#### 5，插入节点 `append`

`js` 原生的实现：

1、`appendChild()`

(1)、概念：把要添加的节点添加到指定父级里面的最后面，所以也叫追加

(2)、使用方式：父级节点.appendChild( 要添加的节点 )

(3)、JS代码：

```
document.onclick = function(){
    oDiv2.appendChild(oB2);//将b2追加到div2里面的最后面
}
```



2、`insertBefore()`

(1)、概念：把要插入的节点添加到指定父级里面的指定节点之前

(2)、使用方式：父级节点.insertBefore( 要插入的节点，指定节点 )

(3)、JS代码：（注：每执行一次新方法时，上一个方法都会被注释掉，为了易懂，此处注释一次，下面的文章中将不再把注释上一个方法的代码发上来）

```
document.onclick = function(){
    //oDiv2.appendChild(oB2);此处将上一个方法注释
    oDiv2.insertBefore(oB2,oSpan2);//将b2插入到div2中的span2前面
}
```



**注释：当parent.insertBefore(newItem, null)时，是直接插入到parent内部的最后面，正好满足append的需要。**



`after` , `prepend` , `before` , `append` 这四个方法都是使用原生函数 `insertBefore` 来实现的，`insertBefore()` 方法在您指定的已有子节点之前插入新的子节点。即应当为

`parent.insertBefore(newItem, existingItem)`，`after` 和 `before` 实现的是插入到当前节点的后面或者前面，`prepend` 和 `append` 实现的是当前节点内部插入。





`**Node.nextSibling**` 是一个只读属性，返回其父节点的 [`childNodes`](https://developer.mozilla.org/zh-CN/docs/Web/API/Node/childNodes) 列表中紧跟在其后面的节点，如果指定的节点为最后一个节点，则返回 `null`。



`parentNode`是指定节点的父节点.一个元素节点的父节点可能是一个元素(`Element` )节点,也可能是一个文档(`Document`)节点,或者是个文档碎片(`DocumentFragment`)节点.



**`Node.firstChild`**只读属性返回树中节点的第一个子节点，如果节点是无子节点，则返回 



[读Zepto源码之操作DOM](https://blog.csdn.net/haihuan2004/article/details/72857603)

[zepto源码--插入节点--学习笔记](https://www.cnblogs.com/zhuhuoxingguang/p/6047063.html)

[看Zepto如何实现增删改查DOM](https://blog.csdn.net/Bg70PVnyBv1/article/details/79227367)




相关链接：

>将函数的实际参数转换成数组的方法

>方法一：var args = Array.prototype.slice.call(arguments);

>方法二：var args = [].slice.call(arguments, 0);


[为什么用Object.prototype.toString.call(obj)检测对象类型?](https://www.cnblogs.com/youhong/p/6209054.html):特别好的文章