# js深浅拷贝
一，[拷贝](https://www.zhihu.com/question/23031215)

简单的来说就是，在有指针的情况下，浅拷贝只是增加了一个指针指向已经存在的内存，而深拷贝就是增加一个指针并且申请一个新的内存，使这个增加的指针指向这个新的内存，采用深拷贝的情况下，释放内存的时候就不会出现在浅拷贝时重复释放同一内存的错误！

如何区分深拷贝与浅拷贝，简单点来说，就是假设B复制了A，当修改A时，看B是否会发生变化，如果B也跟着变了，说明这是浅拷贝，拿人手短，如果B没变，那就是深拷贝，自食其力。

[深浅拷贝](https://www.cnblogs.com/echolun/p/7889848.html)

二，深拷贝

```
function isObject(o) {
    return (typeof o === 'object' || typeof o === 'function') && o !== null
}

let test = {
    num: 0,
    str: '',
    boolean: true,
    unf: undefined,
    nul: null,
    obj: {
        name: '我是一个对象',
        id: 1
    },
    arr: [0, 1, 2],
    func: function() {
        console.log('我是一个函数')
    },
    date: new Date(0),
    reg: new RegExp('/我是一个正则/ig'),
    err: new Error('我是一个错误')
}

test.loopObj = test

let result = deepClone(test)

console.log(result)

for (let key in result) {
    if (isObject(result[key]))
        console.log(`${key}相同吗？ `, result[key] === test[key])
}

```



**1，迭代递归法**

迭代递归法：深拷贝对象与数组

```
function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj)

    let cloneObj = isArray ? [] : {}
    for (let key in obj) {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    }

    return cloneObj
}
```



代理法
reflect的遍历：https://blog.csdn.net/qq_25178609/article/details/52663985

```
function deepClone(obj) {
    if (!isObject(obj)) {
        throw new Error('obj 不是一个对象！')
    }

    let isArray = Array.isArray(obj);
    let cloneObj = isArray ? [...obj] : { ...obj };
    Reflect.ownKeys(cloneObj).forEach(key => {
        cloneObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key]
    })

    return cloneObj
}
```



_lodash 的 _.cloneDeep



**2，序列化反序列化法**

```
function deepClone(obj) {
	// console.log(JSON.stringify(obj.func)); // undefined
	// console.log(JSON.stringify(obj.date)); // undefined
    return JSON.parse(JSON.stringify(obj))
}
```

