// var divColors = getDivColors("#FFFF00", "#FFA500", 10);

// var color_arr = [];

// document.body.appendChild(createDom("#FFFF00"));

// divColors.forEach(function(item, idx){
// 	color_arr.push('#'+item);
// 	document.body.appendChild(createDom("#" + item));
// });

// document.body.appendChild(createDom("#FFA500"));

// 创建一个 dom
function createDom(color){
	var div = document.createElement("div");
	div.style.height = "50px";
	div.style.width = "300px";
	div.style.border = "1px solid #000";
	div.style.backgroundColor = color;
	div.innerHTML = color;

	return div;
}

// 将 #000000 转化为 数组
function hexToDec(str){
	var hex = str.replace(/[^0-9a-fA-F]/, "");
	hex = hex.length == 3 ? hex.replace(/(\w)/g, "$1$1,") : hex.replace(/(\w{2})/g, "$1,");
	return hex.substr(0, hex.length-1).split(",").map(function(item) {
		return parseInt(item, 16);
	});
}

// 将 数组 转化为 #000000
function decToHex(arr){
	// console.log('---arr----', arr);
	return arr.map(function(item){
		// console.log('---item---', item);
		if (item == 0) {
			// console.log('进来了');
			return '00';
		} else {
			return (parseInt(item, 10)).toString(16);
		}
	}).join("");
}

// 计算分级的颜色，并返回数组
function getDivColors(hex1, hex2, n){
	var startArr = hexToDec(hex1);
	var endArr = hexToDec(hex2);

	var gabVal = [];
	var res = [];
	var temp;

	startArr.forEach(function(item, i){
		gabVal.push(endArr[i] - item);
	});

	// console.log('---startArr--', startArr);
	// console.log('---endArr--', endArr);
	// console.log('---gabVal--', gabVal);


	for(var i=0; i < n; i++){
		res.push(decToHex(startArr.map(function(item, idx){
			return item + (gabVal[idx]/(n))*(i+1);
		})));
	}

	// console.log('----res-----',res);

	return res;
}







