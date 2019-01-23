# 虚拟DOM

vdom 是 vue 和 React 的核心。



#### 一，`vdom` 是什么？为何会存在 `vdom`？

![vdom.png](https://upload-images.jianshu.io/upload_images/1505342-d37e58e97ee7924a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![vdom2.png](https://upload-images.jianshu.io/upload_images/1505342-e89d74788aa9661b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



##### 1，`virtual dom`， 虚拟 `DOM`



##### 2， 用 `JS` 模拟 `DOM` 结构



##### 3，`DOM` 变化的对比，放在 `JS` 层来做（图灵完备语言）



##### 4，提高重绘性能



#### 二，`vdom` 的如何应用，核心 `API` 是什么？

![vdom3.png](https://upload-images.jianshu.io/upload_images/1505342-6fd28f72f4437ec5.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 1，snabbdom



##### 2，h 函数

```
 h（'<标签名>'，{…属性…}，[…子元素…]）

 h（'<标签名>'，{…属性…}，'…'）
```



![h1.png](https://upload-images.jianshu.io/upload_images/1505342-b1a01b9ee7f38c41.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![h2.png](https://upload-images.jianshu.io/upload_images/1505342-61f1e9a444a8d944.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



##### 3，patch 函数

第一次渲染：patch(vnode，newVnode) 

第二次渲染：patch(container，vnode) 

![patch.png](https://upload-images.jianshu.io/upload_images/1505342-c6e9d5c52d944a1b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



#### 三， 介绍一下 `diff` 算法



