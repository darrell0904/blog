# 使用原生js实现一个简单的datePicker组件



#### 1，结果如下图所示

![datepacker.gif](https://upload-images.jianshu.io/upload_images/1505342-f35c2882db3f5978.gif?imageMogr2/auto-orient/strip)

#### 2，基础知识点

`JavaScript Date`（日期）对象 实例

* 返回当日的日期和时间

  ```
  var today = new Date();
  ```

* 从 Date 对象返回一个月中的某一天 (1 ~ 31)

  ```
  today.getDate()
  ```

* 从 Date 对象返回一周中的某一天 (0 ~ 6)；注意：星期天是0

  ```
  today.getDay()
  ```

* 从 Date 对象以四位数字返回年份

  ```
  today.getFullYear()
  ```

* 从 Date 对象返回月份 (0 ~ 11)

  ```
  today.getMonth()
  ```

* 返回 Date 对象的小时 (0 ~ 23)

  ```
  today.getHours()
  ```

* 返回 Date 对象的分钟 (0 ~ 59)。

  ```
  today.getMinutes()
  ```

* 返回 1970 年 1 月 1 日至今的毫秒数。

  ```
  today.getTime()
  ```

* 返回某一个日期的`Date`对象

  ```
  // 比如我要拿到5月27号的Date对象

  var aDay = new Date('2018-05-27')
  或者
  var aDay = new Date(2018,4,27) // 月份是从0开始的
  ```

更多可以参考[JavaScript Date 对象](http://www.w3school.com.cn/jsref/jsref_obj_date.asp);
  ​

#### 3，页面结构

这里我们就不细讲了，我们会在第五节讲动态渲染日历数据。

#### 4，获取日历每月显示的数据

首先我们要实现一个函数，这个函数的作用就是拿到我们这个 `datePicker` 需要渲染的数据。

我们实现的六行七列的数据，如下图：

![demo4.png](https://upload-images.jianshu.io/upload_images/1505342-b3cb0ffccdcc37b9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



我们首先穿件一个 `data.js` ，同时在里面定义一个 `getMonthDate` 的方法，在 `ret` 存入我们所要渲染的天数。

```
(function(){
	var datepicker = {};
	
	datepicker.getMonthDate = function(year ,month){
		
		var ret = [];

		return {
			days:ret
		};

	}
	
	window.datepicker = datepicker;
})();

```

这个函数需要接受的参数是年份与月份，如果不传的话，则默认传入当前的月份与年份。

如下：

```
if(!year&&!month){
	var today =  new  Date(); // 获取当天日期对象
	year = today.getFullYear(); // 获取当前年份
	month = today.getMonth() + 1; // 获取当前月份
}
```

这里面还有一个比较重要的点就是，就是我们怎么显示上一个月的值，以及他们分别是几号。

![demo3.png](https://upload-images.jianshu.io/upload_images/1505342-8c7bfeda290db133.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



这里我们只要获取到这个月第一天是星期几就可以了，然后前面的就是相应显示上个月的值。



```
var firstDay = new Date(year ,month-1, 1); // 这个月第一天的Date对象
var firstDayWeekDay = firstDay.getDay(); // 那个这个月第一天具体是星期几

if(firstDayWeekDay === 0)firstDayWeekDay = 7; // 0的话就是星期天

year = firstDay.getFullYear(); // 拿到当前的年份
month = firstDay.getMonth() + 1; // 拿到当前的月份
```



我们还需要拿到上个月和这个月的最后一天，便于我们稍后组装数据。我们可以用这个月的第0天得到上个月的最后一天。

```
var lastDayofLastMonth = new Date(year,month-1,0); // 上个月的最后一天
var lastDateofLastMonth = lastDayofLastMonth.getDate(); 
// 上个月的具体日期
var preMonthDayCount = firstDayWeekDay-1;  // 上个月在第一行要显示几天

var lastDay = new Date(year,month,0); // 这个月的最后一天
var lastData = lastDay.getDate();	// 这个月的最后一天具体日期	
```



接下去我们就需要去拼装数据了。

遍历数据：

数据结构的图我刚刚已经发过了，我们这边需要循环遍历这六行七列的42个数据，而且每一个数据包括

````
{
	date : 代表我们时当月的第几天，其实是一个中介，为了计算showDate
    month : 代表我们是第几个月
    showDate : 代表我们当前天数是确切的第几天
}
````

遍历的代码如下：

```
for (var i = 0;i<6*7;i++){
	var date = i+1-preMonthDayCount; // 赋值date的值，这里上个月的最后一天为0
	var showDate = date; // 赋值showDate，上下月份，下面再做判断
	var thisMonth = month; // 赋值月份
			
	if (date <= 0){ 			// 当date < 0时，则代表是上一个月
		thisMonth = month-1; 	// 月份减一
		showDate = lastDateofLastMonth + date; 	// 显示上一个相应是几号
	} else if (date > lastData){  // 当date大于了这个月最后一天，那么代表下个月
		thisMonth = month+1; 	// 月份加一
		showDate = showDate - lastData; 		// 显示下一个月具体几号
	}
					
	if(thisMonth === 13) thisMonth = 1; 
	// 当我们月份是13的时候，代表下一年，月份置为一
	if(thisMonth === 0)thisMonth = 12;
	// 当我们月份是0的时候，代表上一年，月份置为一
	ret.push({
		date:date,
		month:thisMonth,
		showDate:showDate
	}); 				// 最后塞入到我们的ret中去
}
```

经过以上代码的处理，我们便能得到最初图中所示的数据了。



#### 5，开始动态渲染数据

我们在建一个 `datePicker.js` ，我们在这个 `js` 中做一些页面渲染的工作。

首先我们要来思考一下我们要做一些什么工作，一般在下手开始敲代码之前，我们先要想好思路，然后在开始工作。

![demo.png](https://upload-images.jianshu.io/upload_images/1505342-50ff4c72208c3a2e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

最开始，我们肯定要获取到日历数据，然后将数据动态填充到我们准备好的模版里面去。

然后我们要实现一些事件，改变月份，然后进行相应的的月份数据；点击相应的天数，使日历组件消失，input框中显示选择的天数。

这样我们可以写一个代码的大致框架出来：

```
(function(){
	var datepicker = window.datepicker;

	datepicker.buildUI = function(year ,month){ // 日历组件的函数
    	var html = datepicker.buildUI(year,month);
		return html;
	};
	
	datepicker.render = function(direction){ // 页面的render函数
		var year,month;
		
		var html = datepicker.buildUI(year,month);
		
		$wrapper = document.querySelector('.ui-datePicker-wrapper');

		$wrapper.innerHTML = html;
		
	}
	
	datepicker.init = function(input){ // 页面的入口函数
		datepicker.render();		
	}
	
	function format(date){ // 一个工具函数，将Date对象转化成YYYY-MM-DD的格式
		var ret = '';
		var padding =  function(num){
			if(num <= 9){
				return  '0' + num;
			}else{
				return num;
			}
		}
		ret += date.getFullYear() + '-';
		ret += padding(date.getMonth() + 1) + '-';
		ret += padding(date.getDate()); 
		
		return  ret;
	}

})();
```

然后我们在 `init` 函数中添加一些事件函数，如下图：

![demo4.png](https://upload-images.jianshu.io/upload_images/1505342-aeec5ee39f530cd2.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

接下来我们主要看看 `buildUI` 的函数实现，这里其实就是实现一个动态的html，然后渲染到页面中而已，就跟我们平时从 `Ajax` 渲染数据一样。

![demo5.png](https://upload-images.jianshu.io/upload_images/1505342-a6a23af5d2aed6e4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



最后我们看看`index.html`的文件内容怎么样，如下图：

![index.png](https://upload-images.jianshu.io/upload_images/1505342-4f39badb15da1371.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

页面引入两个`js`，并向外暴露一个变量对象 `datepicker` ，然后调用相应的 `init` 方法。



#### 6，总结

至此我们便完成了一个简单的用原生js完成的一个最最基础的日历组件，其中里面最主要的就是获取日期数据的这个函数，实现的思路其实也很常规，其他的关于渲染的流程，其实我们平时工作中也会经常碰到。



这篇文章是我看了慕课网的[datePicker组件开发课程](https://www.imooc.com/learn/820)写的，其中加了一些自己的思考和总结，具体源码大家可以参考[慕课网相关代码](https://github.com/niuyi1017/imooc)。



 **希望这篇文章对大家学习小程序能有帮助，来自一个奔跑在前端路上的前端小白。**

