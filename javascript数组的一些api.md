# 原生javascript的一些api
[JavaScript数组方法大全(推荐)](http://www.jb51.net/article/87930.htm)

[原生JS中对象相关API合集](https://www.cnblogs.com/ningmeng666/p/6749024.html)

### 一：数组（Array）

#### 1、**`join(separator)`**

**作用**

`join()` 方法用于把数组中的所有元素放入一个字符串，元素是通过指定的分隔符进行分隔的。

**返回值**

返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来，在两个元素之间插入 *separator* 字符串而生成的。

**例子**

```
var arr = [1,2,3];
console.log(arr.join()); // 1,2,3
console.log(arr.join("-")); // 1-2-3
console.log(arr); // [1, 2, 3]（原数组不变）
```



通过 `join()` 方法可以实现重复字符串，只需传入字符串以及重复的次数，就能返回重复后的字符串，函数如下：

```
function repeatString(str, n) {
	return new Array(n + 1).join(str);
}
console.log(repeatString("abc", 3)); // abcabcabc
console.log(repeatString("Hi", 5)); // HiHiHiHiHi
```



#### 2、**`push()` 和 `pop()`**

`push()`：可以接收任意数量的参数，把它们逐个添加到数组末尾，并**返回修改后数组的长度，数组也已经修改。**

`pop()`：数组末尾移除最后一项，减少数组的 `length` 值，然后**返回移除的项，数组也已经修改。**。

```
var arr = ["Lily","lucy","Tom"];

var count = arr.push("Jack","Sean");
console.log(count); // 5
console.log(arr); // ["Lily", "lucy", "Tom", "Jack", "Sean"]

var item = arr.pop();
console.log(item); // Sean
console.log(arr); // ["Lily", "lucy", "Tom", "Jack"]
```



#### 3、**`shift()` 和 `unshift()`**

`shift()`：删除原数组第一项，并**返回删除元素的值，数组已经修改**；如果数组为空则返回 `undefined`。 
`unshift()`：将参数添加到原数组开头，并**返回数组的长度，数组已经修改**。



```
var arr = ["Lily","lucy","Tom"];

var count = arr.unshift("Jack","Sean");
console.log(count); // 5
console.log(arr); //["Jack", "Sean", "Lily", "lucy", "Tom"]

var item = arr.shift();
console.log(item); // Jack
console.log(arr); // ["Sean", "Lily", "lucy", "Tom"]
```



#### 4、**sort(**sortby)

`sort()`：按升序排列数组项——即最小的值位于最前面，最大的值排在最后面，同时愿数组也改变。



在排序时，`sort()` 方法会调用每个数组项的 `toString()` 转型方法，然后比较得到的字符串，以确定如何排序。即使数组中的每一项都是数值， `sort()` 方法比较的也是字符串，因此会出现以下的这种情况：

```
var arr1 = ["a", "d", "c", "b"];
console.log(arr1.sort()); // ["a", "b", "c", "d"]

arr2 = [13, 24, 51, 3];
console.log(arr2.sort()); // [13, 24, 3, 51]
console.log(arr2); // [13, 24, 3, 51](元数组被改变)
```



在调用 `sort` 时修改传入一个参数 `sortby`，这个参数是一个函数：



比较函数 `compare` 接收两个参数，如果第一个参数应该位于第二个之前则返回一个负数，如果两个参数相等则返回 0，如果第一个参数应该位于第二个之后则返回一个正数。以下就是一个简单的比较函数，**升序**：

```
function compare(value1, value2) {
	if (value1 < value2) {
		return -1;
	} else if (value1 > value2) {
		return 1;
	} else {
		return 0;
	}
}

arr2 = [13, 24, 51, 3];

console.log(arr2.sort(compare)); // [3, 13, 24, 51]
```



如果需要通过比较函数产生降序排序的结果，只要交换比较函数返回的值即可；

```
function compare(value1, value2) {
	if (value1 < value2) {
		return 1;
	} else if (value1 > value2) {
		return -1;
	} else {
	return 0;
	}
}
arr2 = [13, 24, 51, 3];
console.log(arr2.sort(compare)); // [51, 24, 13, 3]
```



#### **5、reverse()**

`reverse()`：反转数组项的顺序，原数组改变。

```
var arr = [13, 24, 51, 3];

console.log(arr.reverse());    //[3, 51, 24, 13]
console.log(arr);              //[3, 51, 24, 13](原数组改变)
```



#### **6、concat()**

`concat()` ：将参数添加到原数组中。这个方法会先创建当前数组一个副本，然后将接收到的参数添加到这个副本的末尾，最后返回新构建的数组。

在没有给 `concat()` 方法传递参数的情况下，它只是复制当前数组并返回副本。

```
var arr = [1,3,5,7];

var arrCopy = arr.concat(9,[11,13]);

console.log(arrCopy); //[1, 3, 5, 7, 9, 11, 13]
console.log(arr); // [1, 3, 5, 7](原数组未被修改)
```

从上面测试结果可以发现：传入的不是数组，则直接把参数添加到数组后面，如果传入的是数组，则将数组中的各个项添加到数组中。

如果传入的是一个**二维数组**呢?

```
var arrCopy2 = arr.concat([9,[11,13]]);

console.log(arrCopy2); //[1, 3, 5, 7, 9, Array[2]]
console.log(arrCopy2[5]); //[11, 13]
```



我们创建了两个数组，然后使用 concat() 把它们连接起来：

```
var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

var arr2 = new Array(3)
arr2[0] = "James"
arr2[1] = "Adrew"
arr2[2] = "Martin"

arr.concat(arr2); // George,John,Thomas,James,Adrew,Martin
```



我们创建了三个数组，然后使用 concat() 把它们连接起来：

```
var arr = new Array(3)
arr[0] = "George"
arr[1] = "John"
arr[2] = "Thomas"

var arr2 = new Array(3)
arr2[0] = "James"
arr2[1] = "Adrew"
arr2[2] = "Martin"

var arr3 = new Array(2)
arr3[0] = "William"
arr3[1] = "Franklin"

arr.concat(arr2,arr3); // George,John,Thomas,James,Adrew,Martin,William,Franklin

```



#### **7、slice()**

`slice()`：返回从原数组中指定开始下标到结束下标之间的项组成的新数组。`slice()` 方法可以接受一或两个参数，即要返回项的起始和结束位置，**原数组不会改变**。

一个参数的情况下， `slice()` 方法**返回从该参数指定位置开始到当前数组末尾的所有项**。

两个参数的情况下，该方法**返回起始和结束位置之间的项——但不包括结束位置的项**。



注意：`-1` 指最后一个元素，`-2` 指倒数第二个元素，以此类推。

也可以这样理解：当出现负数时，将负数加上数组长度的值（6）来替换该位置的数，因此就是从1开始到4（不包括）的子数组。 

```
var arr = [1,3,5,7,9,11];

var arrCopy = arr.slice(1);
var arrCopy2 = arr.slice(1,4);
var arrCopy3 = arr.slice(1,-2);
var arrCopy4 = arr.slice(-4,-1);

console.log(arr); //[1, 3, 5, 7, 9, 11](原数组没变)

console.log(arrCopy); //[3, 5, 7, 9, 11]
console.log(arrCopy2); //[3, 5, 7]
console.log(arrCopy3); //[3, 5, 7]
console.log(arrCopy4); //[5, 7, 9]

```



#### **8、splice()，数组修改，并返回被操作了的数组**

`splice()`：很强大的数组方法，它有很多种用法，可以实现删除、插入和替换，**该方法会改变原来的数组**。

**删除**：可以删除任意数量的项，只需指定 2 个参数：要删除的第一项的位置和要删除的项数。例如， `splice(0,2)` 会删除数组中的前两项。

**插入**：可以向指定位置插入任意数量的项，只需提供 3 个参数：起始位置、 0（要删除的项数）和要插入的项。例如，`splice(2,0,4,6)` 会从当前数组的位置 2 开始插入4和6。

**替换**：可以向指定位置插入任意数量的项，且同时删除任意数量的项，只需指定 3 个参数：起始位置、要删除的项数和要插入的任意数量的项。插入的项数不必与删除的项数相等。例如，splice (2,1,4,6)会删除当前数组位置 2 的项，然后再从位置 2 开始插入4和6。

```
var arr = [1,3,5,7,9,11];

var arrRemoved = arr.splice(0,2);
console.log(arr); //[5, 7, 9, 11]

console.log(arrRemoved); //[1, 3]

var arrRemoved2 = arr.splice(2,0,4,6);
console.log(arr); // [5, 7, 4, 6, 9, 11]
console.log(arrRemoved2); // []

var arrRemoved3 = arr.splice(1,1,2,4);
console.log(arr); // [5, 2, 4, 4, 6, 9, 11]
console.log(arrRemoved3); //[7]
```



常用的一个就是数组的上移动与下移动：

```
var arr = [1,2,3]
var newArr = []

var swapItems = function(arr, index1, index2){
　　arr[index1] = arr.splice(index2,1,arr[index1])[0]
　　return arr
}

// 传入数组与要移动的位置index
var upData = function(arr, index) {
　　if (this.arr.length > 1 && index !== 0) {
　　　　newArr = swapItems(arr, index, index - 1)
　　}
}

var downData = function(arr, index) {
　　if (this.arr.length > 1 && index !== (this.arr.length - 1)) {
　　　　newArr = swapItems(this.arr, index, index + 1)
　　}
}
```



#### 9、**indexOf()和 lastIndexOf()**

`indexOf()`：接收两个参数：要**查找的项**和**（可选的）表示查找起点位置**的索引。其中， 从数组的开头（位置 0）开始向后查找。

`lastIndexOf()`：接收两个参数：要**查找的项**和**（可选的）表示查找起点位置**的索引。其中， 从数组的末尾开始向前查找。

这两个方法都返回要查找的项在数组中的位置，或者在没找到的情况下返回 -1。在比较第一个参数与数组中的每一项时，会使用全等操作符。

```
var arr = [1,3,5,7,7,5,3,1];

console.log(arr.indexOf(5));         // 2

console.log(arr.lastIndexOf(5));     // 5

console.log(arr.indexOf(5,2));       // 2

console.log(arr.lastIndexOf(5,4));   // 2

console.log(arr.indexOf("5"));       // -1

```



#### 10、**forEach()**

`forEach()`：对数组进行遍历循环，对数组中的每一项运行给定函数。这个方法没有返回值。参数都是 `function` 类型，默认有传参，参数分别为：**遍历的数组内容**，**第对应的数组索引**，**数组本身**。

```
var arr = [1, 2, 3, 4, 5];
arr.forEach(function(x, index, a){
	console.log(x + '|' + index + '|' + (a === arr));
});

// 输出为：
// 1|0|true
// 2|1|true
// 3|2|true
// 4|3|true
// 5|4|true
```



#### **11、map()**

`map()`：指“映射”，对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。

参数分别为：**遍历的数组内容**，**第对应的数组索引**，**数组本身**。

下面代码利用 `map` 方法实现数组中每个数求平方。

```
var arr = [1, 2, 3, 4, 5];

var arr2 = arr.map(function(item){
	return item*item;
});

console.log(arr2); //[1, 4, 9, 16, 25]
```



#### **12、filter()**

`filter()`：“过滤”功能，数组中的每一项运行给定函数，返回满足过滤条件组成的数组。

参数分别为：**遍历的数组内容**，**第对应的数组索引**，**数组本身**。

```
var arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

var arr2 = arr.filter(function(x, index) {
	return index % 3 === 0 || x >= 8;
}); 

console.log(arr2); //[1, 4, 7, 8, 9, 10]
```



#### **13、every()**

`every()`：判断数组中每一项都是否满足条件，只有所有项都满足条件，才会返回 `true`。

参数分别为：**遍历的数组内容**，**第对应的数组索引**，**数组本身**。

```
var arr = [1, 2, 3, 4, 5];

var arr2 = arr.every(function(x) {
	return x < 10;
}); 
console.log(arr2); //true

var arr3 = arr.every(function(x) {
	return x < 3;
}); 
console.log(arr3); // false
```



#### **14、some()**

`some()`：判断数组中是否存在满足条件的项，只要有一项满足条件，就会返回 `true`，与 `every` 遥相呼应。

```
var arr = [1, 2, 3, 4, 5];

var arr2 = arr.some(function(x) {
	return x < 3;
}); 

console.log(arr2); //true

var arr3 = arr.some(function(x) {
	return x < 1;
}); 

console.log(arr3); // false
```



#### 15、**reduce()和 reduceRight()**

`reduce` 的用法。`Array` 的 `reduce()` 把一个函数作用在这个 `Array` 的 `[x1, x2, x3...]` 上，这个函数必须接收两个参数，`reduce()` 把结果继续和序列的下一个元素做累积计算，其效果就是：

```
[x1, x2, x3, x4].reduce(f) = f(f(f(x1, x2), x3), x4)
```



```
array.reduce(function(total, currentValue, currentIndex, arr){
  
}, initialValue);

// total : 必需。初始值, 或者计算结束后的返回值
// currentValue : 必需。当前元素
// currentIndex : 可选。当前元素的索引
// arr : 可选。当前元素所属的数组对象
// initialValue :  递给函数的初始值
```



这两个方法都接收两个参数：一个在每一项上调用的函数和（可选的）作为归并基础的初始值。



传给 `reduce()` 和 `reduceRight()` 的函数接收 4 个参数：**前一个值**、**当前值**、**项的索引**和**数组对象**。这个函数返回的任何值都会作为第一个参数自动传给下一项。第一次迭代发生在数组的第二项上，因此第一个参数是数组的第一项，第二个参数就是数组的第二项。



下面代码用 `reduce()` 实现数组求和，数组一开始加了一个初始值10。

```
var values = [1,2,3,4,5];

var sum = values.reduceRight(function(prev, cur, index, array){
	return prev + cur;
},10);

console.log(sum); //25

var minus = values.reduce(function(prev, cur, index, array){
	console.log('===prev===',prev);
	console.log('===cur===',cur);
	return prev + cur;
},10);

console.log(minus); // -5

// ===prev=== 10
// ===cur=== 1
// ===prev=== 9
// ===cur=== 2
// ===prev=== 7
// ===cur=== 3
// ===prev=== 4
// ===cur=== 4
// ===prev=== 0
// ===cur=== 5
```



#### 16，valueof()

返回数组本身

```
var arr = [1,2,3]

var arr1 = arr.valueOf();

console.log(arr1); // [1,2,3]
```



#### 17，toString() 

返回数组的字符串形式

```
var arr = [1,2,3]

var arr1 = arr.toString();

console.log(arr1); // 1,2,3
```



#### 18，Array.isArray()

用来判断一个值是否为数组

```
var arr = [1,2,3]

Array.isArray(arr)               // true
Array.isArray(a.toString())		 // false
```





### 二，`Object` 对象的 `api`



#### 1，valueOf

返回当前对象对应的值



#### 2，toString

返回当前对象对应的字符串形式



#### 3，toLocaleString

返回当前对象对应的本地字符串形式



#### 4，hasOwnProperty

判断某个属性是否为当前对象自身的属性，还是继承自原型对象的属性



#### 5，isPrototypeOf

判断当前对象是否为另一个对象的原型



#### 6，propertyIsEnumerable

判断某个属性是否可枚举




