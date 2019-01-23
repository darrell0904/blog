# MVVM和vue

### 一，说一下使用 jQuery 和vue的区别

1， 数据和视图的分离

2， 以数据驱动视图





### 二，说一下对 MVVM 的理解

 Model - 模型、数据

 View - 视图、模板（视图和模型是分离的）

 ViewModel - 连接 Model 和 View 

![viewmodal.png](https://upload-images.jianshu.io/upload_images/1505342-0021cee7e73b6053.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)





### 三，vue 中如何实现响应式

1，什么是响应式？

* 修改 data 属性之后，vue 立刻监听到
* data 属性被代理到 vm 上

2，Object.defineProperty

这个api接受三个参数，对象，属性，以及方法，方法里面是最简单的get、set方法。

![definePropertypng.png](https://upload-images.jianshu.io/upload_images/1505342-270308c6febda08b.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



```
var obj = {
	name: 'zhangsan',
	age: 25
}

var obj = {}
var _name = 'shangsan'

Object.defineProperty(obj, 'name', {
	get: function () {
		console.log('get', _name) // 监听
		return _name
	},
	set: function (newVal) {
		console.log('set', newVal)  // 监听
		_name = newVal
	}
})

console.log(obj.name); // get shangsan
console.log(obj.name = 'lisi'); // set lisi
```





如何讲 `data` 的属性挂载到 `vm` 上。

![defineProperty.png](https://upload-images.jianshu.io/upload_images/1505342-0b022e8df1a6a5c2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



```
var vm = {}

var data = {
    name: 'zhangsan',
    age: 20
}

var key, value
for (key in data) {
    (function (key) {
        Object.defineProperty(vm, key, {
            get: function () {
                console.log('get', data[key]) // 监听
                return data[key]
            },
            set: function (newVal) {
                console.log('set', newVal) // 监听
                data[key] = newVal
            }
        })
    })(key)
}

console.log(vm.name); // get zhangsan zhangsan
console.log(vm.age); // get 20 20
```



### 四，vue 中如何解析模板

1，模板是什么

![temple.png](https://upload-images.jianshu.io/upload_images/1505342-e4469684fd0c191a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

模板最终必须转换成 JS 代码，因为：

* 有逻辑（v-if v-for），必须用 JS 才能实现（图灵完备）
* 转换为 html 渲染页面，必须用 JS 才能实现

因此，模板最重要转换成一个 JS 函数（render 函数）。

```
with(this){  // this 就是 vm
    return _c(
        'div',
        {
            attrs:{"id":"app"}
        },
        [
            _c(
                'div',
                [
                    _c(
                        'input',
                        {
                            directives:[
                                {
                                    name:"model",
                                    rawName:"v-model",
                                    value:(title),
                                    expression:"title"
                                }
                            ],
                            domProps:{
                                "value":(title)
                            },
                            on:{
                                "input":function($event){
                                    if($event.target.composing)return;
                                    title=$event.target.value
                                }
                            }
                        }
                    ),
                    _v(" "),
                    _c(
                        'button',
                        {
                            on:{
                                "click":add
                            }
                        },
                        [_v("submit")]
                    )
                ]
            ),
            _v(" "),
            _c('div',
                [
                    _c(
                        'ul',
                        _l((list),function(item){return _c('li',[_v(_s(item))])})
                    )
                ]
            )
        ]
    )
}
```





2，render 函数

`render` 函数里面用到了 `with`：

![haswith.png](https://upload-images.jianshu.io/upload_images/1505342-7a15fda5fb3dec4f.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

![hasnowith.png](https://upload-images.jianshu.io/upload_images/1505342-440ab75ebcf317d0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![renderTem.png](https://upload-images.jianshu.io/upload_images/1505342-b075f826ae8e86fb.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



![render_code.png](https://upload-images.jianshu.io/upload_images/1505342-ecb351b03e664e8e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240) 



模板中所有信息都包含在了 render 函数中， `this` 即 `vm`， `price` 即 `this.price` 即 `vm.price`，即 `data` 中的 `price`， `_c` 即 `this._c` 即 `vm._c`。







3，render 函数与 vdom





### 五，vue 的整个实现流程

1，第一步：解析模板成 `render` 函数

2，第二步：响应式开始监听

3，第三步：首次渲染，显示页面，且绑定依赖

4， 第四步：`data` 属性变化，触发 `rerender`

