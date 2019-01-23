var Zepto = (function(){
    var $,
        key,
        emptyArray = [], // 继承数组的方法
        slice = emptyArray.slice, // 数组的slice方法
        filter = emptyArray.filter, // 数组的filter方法
        class2type = {}, // 对象的toString方法，获去type
        toString = class2type.toString,
        document = window.document,
        cssNumber = { // 不需要去加 'px'
            'column-count': 1, 
            'columns': 1, 
            'font-weight': 1, 
            'line-height': 1,
            'opacity': 1, 
            'z-index': 1, 
            'zoom': 1
        },
        
        // 取出html代码中第一个html标签（或注释），如取出 <p>123</p><h1>345</h1> 中的 <p>
        fragmentRE = /^\s*<(\w+|!)[^>]*>/,
        // 匹配 <img /> <p></p>  不匹配 <img src=""/> <p>123</p>
        singleTagRE = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
        
        simpleSelectorRE = /^[\w-]*$/, // qsa
    	
        zepto = {},
        
        uniq,

        // body html
        rootNodeRE = /^(?:body|html)$/i,

        isArray = Array.isArray ||
        function(object){ return object instanceof Array }
    
    // ...省略N行代码...

    // 上文定义 zepto = {}
    // 判断 element 是否符合 selector 的选择要求 // 很多地方使用，is等
    zepto.matches = function(element, selector) {
        // selector有值，element有值，element是普通DOM节点
        if (!selector || !element || element.nodeType !== 1) return false

        // elem.matchesSelector('.item') 
        // 判断当前的 elem 是否符合传入的 selector 的要求 
        var matchesSelector = element.webkitMatchesSelector || 
                              element.mozMatchesSelector ||
                              element.oMatchesSelector || 
                              element.matchesSelector
        if (matchesSelector) return matchesSelector.call(element, selector)

        // 浏览器不支持 matchesSelector
        // fall back to performing a selector:
        var match, 
            parent = element.parentNode, 
            temp = !parent

        // 上文定义 tempParent = document.createElement('div'),
        // 如果没有parent，parent赋值为一个div，然后将当前元素加入到这个div中
        if (temp) {
          parent = tempParent;
          tempParent.appendChild(element);
          // (parent = tempParent).appendChild(element); 这种写法不易读
        }

        // 通过 qsa 获取匹配的元素，判断其中有没有 element
        match = ~zepto.qsa(parent, selector).indexOf(element)

        if (temp) {
          // 如果没有parent时，之前执行过  tempParent.appendChild(element);
          // 此时要移除子元素
          tempParent.removeChild(element);
        }
        // temp && tempParent.removeChild(element)  // 这种写法不易读
        // 返回最终的匹配结果，经过 qsa 判断的结果
        return match
    }

    // 检查类型
    // 对象自带的toString方法判断类型，其他的Array的toString方法都已经被重写了，返回[object, Array]等等
    function type(obj) {
        if (obj == null) { // 特别好的写法，只有这里用==，其他的地方用===，相当于obj===undefined和obj == null
            return String(obj);
        } else {
            // console.log('===class2type[toString.call(obj)]===',toString.call(obj));
            // console.log('===class2type[toString.call(obj)]===',class2type[toString.call(obj)]);
            return class2type[toString.call(obj)] || "object"
        }          
    }

    // 判断是不是方法
    function isFunction(value) { return type(value) == "function" }
    //判断是不是Dom
    function isDocument(obj)   { return obj != null && obj.nodeType == obj.DOCUMENT_NODE }
    // 判断是不是对象
    function isObject(obj)     { return type(obj) == "object" }
    
    // 判断是否是最基本的object：Object.getPrototypeOf(obj) == Object.prototype
    // 测试对象是否是“纯粹”的对象，这个对象是通过 对象常量（"{}"） 或者 new Object 创建的，如果是，则返回true。
    function isPlainObject(obj) {
        return isObject(obj) && !isWindow(obj) && Object.getPrototypeOf(obj) == Object.prototype
    }

    // 判断是否为纯粹的对象
    // 纯粹对象首先必须是对象 isObject(obj)
    // 并且不是 window 对象 !isWindow(obj)
    // 并且原型要和 Object 的原型相等


    // window的特点：window.window === window
    function isWindow(obj) {
        return obj != null && obj == obj.window
    }

    // 判断是不是类数组或者数组
    // var objArray = {
    //     0: 'abc',
    //     1: 'bcd',
    //     2: 'cde',
    //     length: 3
    // };
    function likeArray(obj) { return typeof obj.length == 'number' }

    // 筛选数组，踢出 null undefined 元素
    function compact(array) { return filter.call(array, function(item){ return item != null }) }

    // 下文定义：
    // $.fn = {
    //    concat: emptyArray.concat,
    // $.fn.concat.apply([], array) —— 无论 array 是不是数组，都将返回一个数组，
    // 例如 $.fn.concat.call([], 'abc') 返回的是 ['abc']
    function flatten(array) { return array.length > 0 ? $.fn.concat.apply([], array) : array }

    // 转化为驼峰的方法
    // camelize 已在上文定义
    // 用于 css 的 camalCase 转换，例如 background-color 转换为 backgroundColor
    function camelize(str) {
        return str.replace(/-+(.)?/g, function(match, chr) {
            return chr ? chr.toUpperCase() : ''
        })
    }

    // 将 lineHeight 转换为 line-height 格式
    function dasherize(str) {
        return str.replace(/::/g, '/')
                .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
                .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                .replace(/_/g, '-')
                .toLowerCase()
    }

    // 传入一个 css 的 name 和 value，判断这个 value 是否需要增加 'px'
    function maybeAddPx(name, value) {
        // dasherize(name) 将 lineHeight 转换为 line-height 格式
        // !cssNumber[dasherize(name)] 判断转换出来的 css name 是否再这个数组之外
        return (typeof value == "number" && !cssNumber[dasherize(name)]) ? 
               // 如果 value 是数字，并且 name 不在 cssNumber 数组之内，就需要加 'px'，否则不需要
               // 例如 'width'、'font-size' 就需要加 'px'， 'font-weight' 就不需要加
               value + "px" : 
               value

        // 前文定义----------------------
        // cssNumber = {
        //   'column-count': 1, 
        //   'columns': 1, 
        //   'font-weight': 1, 
        //   'line-height': 1,
        //   'opacity': 1, 
        //   'z-index': 1, 
        //   'zoom': 1
        // },
        // function dasherize(str) {
        //   return str.replace(/::/g, '/')
        //             .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
        //             .replace(/([a-z\d])([A-Z])/g, '$1_$2')
        //             .replace(/_/g, '-')
        //             .toLowerCase()
        // }
    }

    // uniq变量已经在前面定义
    // 用来将 [1,1,2,2,3,3] 替换为 [1,2,3]
    uniq = function(array){ return filter.call(array, function(item, idx){ return array.indexOf(item) == idx }) }

    // 将HTML转化为DOM
    zepto.fragment = function(html, name, properties) {
        var dom, nodes, container

        // A special case optimization for a single tag
        // init 最开始用做创建对象 $('<div></div>')
        if (singleTagRE.test(html)) dom = $(document.createElement(RegExp.$1))

        if (!dom) {
          if (html.replace) html = html.replace(tagExpanderRE, "<$1></$2>")
          if (name === undefined) name = fragmentRE.test(html) && RegExp.$1
          if (!(name in containers)) name = '*'

          container = containers[name]
          container.innerHTML = '' + html
          dom = $.each(slice.call(container.childNodes), function(){
            container.removeChild(this)
          })
        }

        if (isPlainObject(properties)) {
          nodes = $(dom)
          $.each(properties, function(key, value) {
            if (methodAttributes.indexOf(key) > -1) nodes[key](value)
            else nodes.attr(key, value)
          })
        }

        return dom
    }

    // START 老版本方法
    // 返回数组，所以要加上length;
    zepto.Z = function(dom, selector) {
        dom = dom || []

        dom.__proto__ = $.fn //通过给dom设置__proto__属性指向$.fn来达到继承$.fn上所有方法的目的
        dom.selector = selector || ''
        return dom
    }
    // END 老版本方法

    // 判断是不是Z的对象
    zepto.isZ = function(object) {
        // 上文 dom.__proto__ = $.fn
        // 下文 zepto.Z.prototype = $.fn
        // 可知：dom.__proto__ === $.fn === zepto.Z.prototype

        // 因此，zepto对象都符合 object instanceof zepto.Z
        return object instanceof zepto.Z
    }


    zepto.init = function(selector, context) {
        var dom;
        // 函数内容
        if (!selector) {
            return zepto.Z()
        } else if (typeof selector == 'string') {
            // 字符串的情况，一般有两种：
            // 第一，一段 html 代码，旨在通过zepto生成dom对象
            // 第二，一段查询字符串，旨在通过zepto查找dom对象
            // 将查询结果存储到 dom 变量中

            selector = selector.trim()

            // 上文定义：
            // // 取出html代码中第一个html标签（或注释），如取出 <p>123</p><h1>345</h1> 中的 <p>
            // fragmentRE = /^\s*<(\w+|!)[^>]*>/,
            if (selector[0] == '<' && fragmentRE.test(selector)){
                // 第一，RegExp.$1取出来的就是第一个标签名称，即正则中 (\w+|!) 对应的内容
                // 第二，此时的 context 应该传入的是css属性对象（这里会产生歧义，老版的不会传入 context）
                dom = zepto.fragment(selector, RegExp.$1, context);
                selector = null;
            } else if (context !== undefined) {
                // 如果 selector 不是html字符串标签，并且 context 有值，则从context中查找
                // find 应该是在 $.fn 中定义的，有待解读？？？
                return $(context).find(selector)
            } else {
                // 除了以上情况，就从整个 document 执行 qsa 的查找
                dom = zepto.qsa(document, selector)
            }

        } else if (isFunction(selector)) { // 如果是 function
            return $(document).ready(selector)
        } else if (zepto.isZ(selector)) { // 如果是Z对象
            return selector;
        } else {

            if (isArray(selector)) dom = compact(selector)

            // Wrap DOM nodes.
            else if (isObject(selector)){
                dom = [selector], selector = null; // init 最开始用做创建对象 $('<div></div>')
            }

            else if (fragmentRE.test(selector))
                dom = zepto.fragment(selector.trim(), RegExp.$1, context), selector = null

            else if (context !== undefined) return $(context).find(selector)

            else dom = zepto.qsa(document, selector)
        }

        return zepto.Z(dom, selector)
    }


    $ = function(selector, context){
        return zepto.init(selector, context)
    }


    $.type = type
    $.isFunction = isFunction
    $.isWindow = isWindow
    $.isArray = isArray
    $.isPlainObject = isPlainObject
    $.camelCase = camelize

    // 去除前后的空格， str == null 可以判定 null 或者 undefined。
    // 如果参数为 null 或者 undefined ，则直接返回空字符串，否则调用字符串原生的 trim 方法去除头尾的空格。
    $.trim = function(str) {
      return str == null ? "" : String.prototype.trim.call(str)
    }

    // 返回指定元素在数组中的索引值

    // eq:
    // $.inArray("abc",["bcd","abc","edf","aaa"]);     //=>1
    // $.inArray("abc",["bcd","abc","edf","aaa"],1);   //=>1
    // $.inArray("abc",["bcd","abc","edf","aaa"],2);   //=>-1

    $.inArray = function(elem, array, i){
      return emptyArray.indexOf.call(array, elem, i)
    }

    // 是否为数值
    $.isNumeric = function (val) {
      var num = Number(val), // 将参数转换为Number类型
          type = typeof val;
        return val != null && 
          type != 'boolean' &&
            (type != 'string' || val.length) &&
          !isNaN(num) &&
          isFinite(num) 
          || false
    }

    // 判断是否为数值，需要满足以下条件
    // 不为 null
    // 不为布尔值
    // 不为NaN(当传进来的参数不为数值或如'123'这样形式的字符串时，都会转换成NaN)
    // 为有限数值
    // 当传进来的参数为字符串的形式，如'123' 时，会用到下面这个条件来确保字符串为数字的形式，而不是如 123abc 这样的形式。(type != 'string' || val.length) && !isNaN(num) 。这个条件的包含逻辑如下：如果为字符串类型，并且为字符串的长度大于零，并且转换成数组后的结果不为NaN，则断定为数值。（因为 Number('') 的值为 0）

    $.each = function(elements, callback){
        var i, key
        if (likeArray(elements)) {
          for (i = 0; i < elements.length; i++) {
            if (callback.call(elements[i], i, elements[i]) === false) {
                return elements
            }
          }
        } else {
          for (key in elements)
            if (callback.call(elements[key], key, elements[key]) === false) return elements
        }

        return elements
    }

    // 为type方法定制的，判断类型的一个对象。
    $.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
        class2type[ "[object " + name + "]" ] = name.toLowerCase();
    })

    // 上文定义：filter = emptyArray.filter
    // 筛选数组，其实就是filter函数
    // eq：
    // $.grep([1,2,3],function(item){
    //      return item > 1
    // });
    // =>[2,3]

    $.grep = function(elements, callback){
        return filter.call(elements, callback)
    }

    // 空函数。这个在需要传递回调函数作为参数，但是又不想在回调函数中做任何事情的时候会非常有用，这时，只需要传递一个空函数即可。
    $.noop = function() {}

    // 将标准JSON格式的字符串解释成JSON
    // 其实就是调用原生的 JSON.parse， 并且在浏览器不支持的情况下，zepto 还不提供这个方法。
    if (window.JSON) $.parseJSON = JSON.parse

    function extend(target, source, deep) {
      for (key in source)
        if (deep && (isPlainObject(source[key])) || isArray(source[key])) {
          if (isPlainObject(source[key]) && !isPlainObject(target[key]))
            target[key] = {}
          if (isArray(source[key]) && !isArray(target[key]))
            target[key] = []
          extend(target[key], source[key], deep)
        }
        else if (source[key] !== undefined) target[key] = source[key]
    }

    // Copy all but undefined properties from one or more
    // objects to the `target` object.
    $.extend = function(target){
        var deep, args = slice.call(arguments, 1);
          
        if (typeof target == 'boolean') {
          deep = target
          target = args.shift()
        }
        args.forEach(function(arg){ 
            // console.log('===arg===',arg);
            extend(target, arg, deep) 
        })
        return target
    }

    // 上文定义：
    // // 匹配一个包括（字母、数组、下划线、-）的字符串
    // simpleSelectorRE = /^[\w-]*$/,

    // document.getElementsByTagName
    // document.getElementsByName

    zepto.qsa = function(element, selector){
        var found,

            // ID或class形式：返回 selector.slice(1) 即ID或者class的值
            maybeID = selector[0] == '#',
            maybeClass = !maybeID && selector[0] == '.',

            // 返回选择器的名字
            nameOnly = maybeID || maybeClass ? selector.slice(1) : selector, // Ensure that a 1 char tag name still gets checked
            
            // 是否是一个简单的字符串（可能是一个复杂的选择器，如 'div#div1 .item[link] .red'）
            isSimple = simpleSelectorRE.test(nameOnly);

            // console.log('===selector===',selector);
            // console.log('===selector[0]===',selector[0]);

            // console.log('===maybeID===',maybeID);
            // console.log('===maybeClass===',maybeClass);
            // console.log('===nameOnly===',nameOnly);
            // console.log('===isSimple===',isSimple);

            // console.log('===element===',element);
            // console.log('===isDocument(element)===',isDocument(element));

            if(isDocument(element) && isSimple && maybeID) {
                if(found = element.getElementById(nameOnly)) {
                    return [found];
                } else {
                    return [];
                }
            } else {
                if(element.nodeType !== 1 && element.nodeType !== 9) {
                    return [];
                } else {
                    if (isSimple && !maybeID) { // 是id
                        if (maybeClass) { // 是class
                            return slice.call(element.getElementsByClassName(nameOnly));
                        } else { // tag 名字
                            return slice.call(element.getElementsByTagName(selector)); // 将实际函数转化为数组
                        }
                    } else {
                        return slice.call(element.querySelectorAll(selector));
                    }
                }
            }
    }

    // 重新组织 elements 对象（数组、对象或者对象数组），针对每一个元素，都用 callback 进行检验
    // 检验通过后，将元素push进一个新数组，并返回

    // ep: 
    // var aaa = $.map({"yao":1,"tai":2,"yang":3},function(item,index){
    //     if(item>1){return item*item;}
    // }); 

    // var bbb = $.map([1,2,3,4,5],function(item,index){
    //     if(item>1){return item*item;}
    // });

    $.map = function(elements, callback) {
        var value, values = [], i, key;

        if (likeArray(elements)) {
            console.log('array');
            for (var i = 0; i < elements.length; i++) {
                value = callback(elements[i], i);
                if (value != null) {
                    values.push(value)
                }
            }
        } else {
            console.log('object');
            for (key in elements) {
                value = callback(elements[key], key)
                if (value != null) {
                    values.push(value)
                } 
            }
        }
        // 返回数组
        // flatten 函数上文定义的，作用：无论 values 是否是数组，都将返回一个正确的数组。例如，传入 'abc' ，返回 ['abc']
        return flatten(values)
    }

    // 判断 parent 是否包含 node
    // 用来检查给定的父节点中是否包含有给定的子节点
    // ep: 
    // $.contains($('body')[0],$('#h1')[0]) // dom元素

    $.contains = document.documentElement.contains ?
        // 浏览器支持 contains 方法
        function(parent, node) {
            console.log('===parent===',parent);
            console.log('===node===',node);

          return parent !== node && parent.contains(node)
        } :
        // 不支持 contains 方法
        function(parent, node) {
          while (node && (node = node.parentNode))
            if (node === parent) return true
          return false
        }

    // 如果 arg 是函数，则改变函数的执行环境和参数
    // 如果不是，直接返回 arg
    // $.fn.html 方法就用到了
    function funcArg(context, arg, idx, payload) {
        console.log('===arg===',arg);
        return isFunction(arg) ? arg.call(context, idx, payload) : arg
    }


    // 原形链上的方法
    $.fn = {
        constructor: zepto.Z,
        // length: 0,

        forEach: emptyArray.forEach,
        reduce: emptyArray.reduce,
        push: emptyArray.push,
        sort: emptyArray.sort,
        indexOf: emptyArray.indexOf,
        concat: emptyArray.concat,

        map: function(fn){
            return $($.map(this, function(el, i){ return fn.call(el, i, el) }))
        },

        //获取集合长度
        size: function() {
            return this.length
        },

        find: function() {
            console.log('我他妈是find方法');
        },
        empty: function() {
            return this.each(function(){
                this.innerHTML = '';
            })
        },
        html: function(html) {
            if (0 in arguments) {
                this.each(function(idx,item) {
                    var originHtml = this.innerHTML;

                    $(this).empty().append(html);
                })
            } else {
                // 情况2：无参数，取值
                return (0 in this ? this[0].innerHTML : null)  // 直接借用 textContent 属性
            }
        },
        // 循环遍历每一个属性
        each: function(callback){
            emptyArray.every.call(this, function(el, idx){

                // [].every ES5中Array的新特性。循环数组每个元素，返回是否符合callback函数的要求
                // every 函数返回的是 false 或者 true（不过这里返回什么无所谓，执行就可以了）

                return callback.call(el, idx, el)
            })
            return this
        },
        is: function(selector){ // match 要看
          // 注意：这里只对 this[0] 第一个元素做判断了，其他的元素不管了
          console.log('===selector===',selector);
          console.log('===this===',this[0]);

          return this.length > 0 && zepto.matches(this[0], selector)
        },
        filter: function(selector) {
            // not函数下文定义
            // 如果给not传入的参数是函数，则返回不符合这个函数规则的元素的数组（用 $ 封装）
            // if (isFunction(selector)) return this.not(this.not(selector))

            // 上文定义：zepto.matches 判断elements是否符合 selector 的要求
            // zepto.matches = function(element, selector) {...}
            
            return $(filter.call(this, function(element){
                // 利用 [].filter 方法做筛选，利用 zepto.matches 做判断
                return zepto.matches(element, selector)
            }))
        },
        // $('span').not('.span2') ==》只有一个span1
        // $('span').not('.span1') ==》有两个span2
        not: function(selector) {
            var nodes=[] // 存储最后返回的结果

            // 如果参数是函数
            if (isFunction(selector) && selector.call !== undefined) {
                this.each(function(idx){
                  // 遍历对象的所有元素，对每个元素都执行传入的函数
                  // 当函数返回 false 时（即不符合函数的规则），则将当前元素push到结果中，等待返回
                  if (!selector.call(this,idx)) nodes.push(this)
                })
            } else {

            }
        },
        text: function(text) {
            // 0 in arguments判断是否有参数
            // console.log(this);
            // console.log(arguments);

            if (0 in arguments) { // 有参数，就是赋值
                this.each(function(idx, item){
                    // this.textContent: 获取元素的text
                    // console.log('===item===',item);
                    var newText = funcArg(this, text, idx, this.textContent)
                    this.textContent = newText == null ? '' : ''+newText
                })
            } else { // 无参数，就是获取内容
                // 情况2：无参数，取值
                return (0 in this ? this[0].textContent : null)  // 直接借用 textContent 属性
            }

        },

        offsetParent: function() {
          // 通过 this.map 遍历当前对象所有元素，进行计算，然后拼接新的数组，并返回。保证链式操作
          return this.map(function(){
            var parent = this.offsetParent || document.body  // elem.offsetParent 可返回最近的改元素最近的已经定位的父元素，HTMLElement.offsetParent
            while (parent && !rootNodeRE.test(parent.nodeName) && $(parent).css("position") == "static")
              // 如果获取的parent不是null、不是body或html、而且position==static
              // 则继续向上查找 offsetParent、大不了找到 body 为止
              parent = parent.offsetParent
            // 最后返回改元素
            return parent
          })
        },
        // 获取、设置元素的 offset // 用得到css
        offset: function(coordinates){ 
          // 如果有 coordinates 参数，设置坐标值，并返回当前对象，对象的需要有 top 和 left 属性。
          if (coordinates) return this.each(function(index){
            var $this = $(this),
                // 支持函数（传入 $this.offset() 做参数）和非函数
                coords = funcArg(this, coordinates, index, $this.offset()),
                // 找到最近的 “relative”, “absolute” or “fixed” 的祖先元素，并获取它的 offset()
                parentOffset = $this.offsetParent().offset(),
                // left 和 top 需要去掉定位的祖先元素的 left、top 值
                props = {
                  top:  coords.top  - parentOffset.top,
                  left: coords.left - parentOffset.left
                }
            console.log('===this===',$this);
            console.log('===parentOffset===',parentOffset);
            console.log('===props===',props);
            // static时，设置 top、left是无效的
            if ($this.css('position') == 'static') props['position'] = 'relative'

            // 通过 css 赋值
            $this.css(props)
          })

          // 当前对象是空，则返回 null
          if (!this.length) return null

          // 如果没有 coordinates 参数，则返回第一个元素的坐标值
          var obj = this[0].getBoundingClientRect()
          /*
            elem.getBoundingClientRect() 返回一个对象，
            包含元素的 top bottom left right width height 的值
            但是这个 top、bottom、left、right 是相对于浏览器窗口的距离，而不是页面的边界
            （注意，elem.getBoundingClientRect()在IE低版本浏览器有2px的兼容问题）

            window.pageXOffset 和 window.pageYOffset 可获取网页滚动的距离，
            IE低版本需要用 document.body.scrollLeft 和 document.body.scrollTop 兼容
          */
          return {
            left: obj.left + window.pageXOffset,
            top: obj.top + window.pageYOffset,
            width: Math.round(obj.width),
            height: Math.round(obj.height)
          }
        },
        // 设置、获取 css
        css: function(property, value){

          // 只有一个参数，获取第一个元素的样式
          if (arguments.length < 2) {
            var computedStyle, element = this[0]
            if(!element) return  // 如果第一个元素无值，直接返回。否则继续

            // 获取元素的计算后的样式
            computedStyle = getComputedStyle(element, '')
            if (typeof property == 'string')
              // 情况1，参数为字符串形式
              // 先从elem内联样式获取（element.style），此时需要 camelize(property) 转换，如将 background-color 变为 backgroundColor
              // 如果未找到，则从css样式获取 computedStyle.getPropertyValue(property) 
              // （重要）注释：elem.style 只能获取元素设置的内联样式、不能获取css样式；而 getComputedStyle 可获取内联、css样式。
              return element.style[camelize(property)] || computedStyle.getPropertyValue(property)
            else if (isArray(property)) {
              // 情况2，参数为数组形式（注意，此时 isObject 情况尚未判断）
              var props = {}
              $.each(property, function(_, prop){
                props[prop] = (element.style[camelize(prop)] || computedStyle.getPropertyValue(prop))
              })
              return props  // 返回一个对象
            }
          }

          // 其他情况：有两个参数、property是对象
          var css = ''
          if (type(property) == 'string') {
            // 情况1，property 是字符串，设置单个样式
            if (!value && value !== 0)
              // 如果value参数是 '' null undefined 则移除这个css样式
              // 注：此计算只适用于内联样式的删除，对 css 样式无效，因为它只通过 this.style.removeProperty 计算，而 this.style 获取不到css样式
              this.each(function(){ this.style.removeProperty(dasherize(property)) })
            else
              // value有正常值，将 css 生成一个字符串（如 'font-size:20px'）等待赋值给内联样式
              // maybeAddPx(property, value) 需要增加 px 的增加上
              css = dasherize(property) + ":" + maybeAddPx(property, value)
          } else {
            // 情况2，property 是对象（此时就不管第二个参数是什么了，不用第二个参数），一次性设置多个样式
            for (key in property)
              if (!property[key] && property[key] !== 0)
                // 如果对象属性值是 '' null undefined 则移除这个css样式，同理，只针对内联样式
                this.each(function(){ this.style.removeProperty(dasherize(key)) })
              else
                // 否则，给 css 赋值一个字符串，多样式属性用 ; 隔开
                css += dasherize(key) + ':' + maybeAddPx(key, property[key]) + ';'
          }

          // 针对每个元素，设置内联样式（this.style.cssText可获取、设置内联样式）
          // 最后返回自身
          return this.each(function(){ this.style.cssText += ';' + css })

          /*
            上文定义：
            // 将 lineHeight 转换为 line-height 格式
            function dasherize(str) {
              return str.replace(/::/g, '/')
                        .replace(/([A-Z]+)([A-Z][a-z])/g, '$1_$2')
                        .replace(/([a-z\d])([A-Z])/g, '$1_$2')
                        .replace(/_/g, '-')
                        .toLowerCase()
            }
          */
        },
    }

    // 这个方法递归遍历 node 的子节点，将节点交由回调函数 fun 处理。这个辅助方法在后面会用到。
    function traverseNode(node, fun) {
        fun(node)
        for (var i = 0, len = node.childNodes.length; i < len; i++)
          traverseNode(node.childNodes[i], fun)
    }

    






















    // START 新版本方法
    // zepto.Z = function(dom, selector) {
    //     return new Z(dom, selector)
    // }

    // 返回对象，所以要加上length;
    // function Z(dom, selector) { 

    //     var i, len = dom ? dom.length : 0

    //     for (i = 0; i < len; i++) this[i] = dom[i]

    //     this.length = len
    //     this.selector = selector || ''
    // }

    // zepto.Z.prototype = Z.prototype = $.fn;

    // END 新版本方法

    
    // ...省略N行代码...
    
    return $
})()

window.Zepto = Zepto
window.$ === undefined && (window.$ = Zepto)