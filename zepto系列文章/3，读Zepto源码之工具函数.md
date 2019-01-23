# 3，读Zepto源码之工具函数

#### 1，`$.extend`

`$.extend` 方法可以用来扩展目标对象的属性。目标对象的同名属性会被源对象的属性覆盖。

举个例子：

```
//test1
var test1 = {
  name:"a",
  item:{
    name:"b",
    nickname:"c"
  }
};

//简单扩展
extend(test1,{name:"a",item:{name:"b",item:{name:"c"}}});
console.log(test1);
```

![](https://images2015.cnblogs.com/blog/798818/201611/798818-20161101151319643-535604144.png)

可以看到，在没有使用deep时，会直接扩展对象的第一层属性，并直接覆盖。但如果使用了deep：

```
//深度扩展
extend(test1,{name:"a",item:{name:"b",item:{name:"c"}}},true);
console.log(test1);
```

![](https://images2015.cnblogs.com/blog/798818/201611/798818-20161101151452908-1817090718.png)



**$.extend**函数，这里在内部使用arguments,所以该函数是不限参数的，如果想深度扩展，只需要把首个参数设为true。首先是简单扩展的：

```
var test2 = $.extend(test1,{name:"a",item:{name:"b",item:{name:"c"}}},{name:"d"});
console.log(test2);
```

![](https://images2015.cnblogs.com/blog/798818/201611/798818-20161101151721283-1765468683.png)

深度扩展：

```
var test2 = $.extend(true,test1,{name:"a",item:{name:"b",item:{name:"c"}}},{name:"d",item:{name:"e"}});
console.log(test2);
```

![](https://images2015.cnblogs.com/blog/798818/201611/798818-20161101151731393-297903812.png)

相关参考：[jquery和zepto的扩展方法extend](https://www.cnblogs.com/libin-1/p/6021820.html)，