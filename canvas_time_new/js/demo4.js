var divColors = getDivColors("#FFFF00", "#FFA500", 10);

var color_arr = [];

document.body.appendChild(createDom("#FFFF00"));

divColors.forEach(function(item, idx){
	color_arr.push('#'+item);
	document.body.appendChild(createDom("#" + item));
});

document.body.appendChild(createDom("#FFA500"));


function createDom(color){
	var div = document.createElement("div");
	div.style.height = "50px";
	div.style.width = "300px";
	div.style.border = "1px solid #000";
	div.style.backgroundColor = color;
	div.innerHTML = color;

	return div;
}


function hexToDec(str){
	var hex = str.replace(/[^0-9a-fA-F]/, "");
	hex = hex.length == 3 ? hex.replace(/(\w)/g, "$1$1,") : hex.replace(/(\w{2})/g, "$1,");
	return hex.substr(0, hex.length-1).split(",").map(function(item) {
		return parseInt(item, 16);
	});
}

function decToHex(arr){
	return arr.map(function(item){
		if (item == 0) {
			return '00';
		} else {
			return (parseInt(item, 10)).toString(16);
		}
	}).join("");
}

function getDivColors(hex1, hex2, n){
	var startArr = hexToDec(hex1);
	var endArr = hexToDec(hex2);

	var gabVal = [];
	var res = [];
	var temp;

	startArr.forEach(function(item, i){
		gabVal.push(endArr[i] - item);
	});

	for(var i=0; i < n; i++){
		res.push(decToHex(startArr.map(function(item, idx){
			return item + (gabVal[idx]/(n+1))*(i+1);
		})));
	}

	return res;
}


// var divColors = getDivColors("#FFFF00", "#FFA500", 10);

// var divColors = getDivColors("#FFA500", "#FF0000", 10);

// var divColors = getDivColors("#FF0000", "#FFC0CB", 10);

// var divColors = getDivColors("#FFC0CB", "#800080", 10);

// var divColors = getDivColors("#800080", "#00BFFF", 10);

// var divColors = getDivColors("#00BFFF", "#66CDAA", 10);

// var divColors = getDivColors("#66CDAA", "#20B2AA", 10);

// var divColors = getDivColors("#20B2AA", "#006400", 10);

// var divColors = getDivColors("#006400", "#8B4726", 10);

// var divColors = getDivColors("#8B4726", "#FFA500", 10);

// var divColors = getDivColors("#FFA500", "#7FFF00", 10);

// var divColors = getDivColors("#7FFF00", "#FFFF00", 10);






