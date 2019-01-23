// // 12 --> 1 : 黄色 --> 橘色
// var divColors1 = getDivColors("#FFFF00", "#FFA500", DEFAULT_NUM);
// // 1 --> 2 : 橘色 --> 红色
// var divColors2 = getDivColors("#FFA500", "#FF0000", DEFAULT_NUM);
// // 2 --> 3 : 红色 --> 粉色
// var divColors3 = getDivColors("#FF0000", "#FFC0CB", DEFAULT_NUM);
// // 3 --> 4 : 粉色 --> 紫色
// var divColors4 = getDivColors("#FFC0CB", "#800080", DEFAULT_NUM);
// // 4 --> 5 : 紫色 --> 深蓝色
// var divColors5 = getDivColors("#800080", "#00008B", DEFAULT_NUM);
// // 5 --> 6 : 深蓝色 --> 青蓝色
// var divColors6 = getDivColors("#00008B", "#66CDAA", DEFAULT_NUM);
// // 6 --> 7 : 青蓝色 --> 浅绿色
// var divColors7 = getDivColors("#66CDAA", "#90EE90", DEFAULT_NUM);
// // 7 --> 8 : 浅绿色 --> 深绿色
// var divColors8 = getDivColors("#90EE90", "#006400", DEFAULT_NUM);
// // 8 --> 9 : 深绿色 --> 棕色
// var divColors9 = getDivColors("#006400", "#8B4726", DEFAULT_NUM);
// // 9 --> 10 : 棕色 --> 橘色
// var divColors10 = getDivColors("#8B4726", "#FFA500", DEFAULT_NUM);
// // 10 --> 11 : 橘色 --> 青柠色
// var divColors11 = getDivColors("#FFA500", "#7FFF00", DEFAULT_NUM);
// // 11 --> 12 : 青柠色 --> 黄色
// var divColors12 = getDivColors("#7FFF00", "#FFFF00", DEFAULT_NUM);

// 12 --> 1 : 黄色 --> 橘色
var divColors1 = getDivColors("#FFFF00", "#FFA500", DEFAULT_NUM);
// 1 --> 2 : 黄色 --> 棕色
var divColors2 = getDivColors("#FFA500", "#8B4726", DEFAULT_NUM);
// 2 --> 3 : 棕色 --> 红色
var divColors3 = getDivColors("#FFA500", "#FF0000", DEFAULT_NUM);
// 3 --> 4 : 红色 --> 粉色
var divColors4 = getDivColors("#FF0000", "#FFC0CB", DEFAULT_NUM);
// 4 --> 5 : 粉色 --> 紫色
var divColors5 = getDivColors("#FFC0CB", "#800080", DEFAULT_NUM);
// 5 --> 6 : 紫色 --> 深蓝色
var divColors6 = getDivColors("#800080", "#00008B", DEFAULT_NUM);
// 6 --> 7 : 深蓝色 --> 青蓝色
var divColors7 = getDivColors("#00008B", "#66CDAA", DEFAULT_NUM);
// 7 --> 8 : 青蓝色 --> 浅绿色
var divColors8 = getDivColors("#66CDAA", "#90EE90", DEFAULT_NUM);
// 8 --> 9 : 浅绿色 --> 深绿色
var divColors9 = getDivColors("#90EE90", "#006400", DEFAULT_NUM);
// 9 --> 10 : 深绿色 --> 青柠
var divColors10 = getDivColors("#006400", "#7FFF00", DEFAULT_NUM);
// 10 --> 11 : 青柠 --> 橘色
var divColors11 = getDivColors("#7FFF00", "#ADFF2F", DEFAULT_NUM);
// 11 --> 12 : 橘色 --> 黄色
var divColors12 = getDivColors("#ADFF2F", "#FFFF00", DEFAULT_NUM);

// 将颜色存放进 color_arr 的函数
function push_color_dict (ColorsArr, key) {
	color_arr[key] = [];
	ColorsArr.forEach(function(item, idx){
		color_arr[key].push('#'+item);
	});
}

push_color_dict(divColors1, 1);
push_color_dict(divColors2, 2);
push_color_dict(divColors3, 3);
push_color_dict(divColors4, 4);
push_color_dict(divColors5, 5);
push_color_dict(divColors6, 6);
push_color_dict(divColors7, 7);
push_color_dict(divColors8, 8);
push_color_dict(divColors9, 9);
push_color_dict(divColors10, 10);
push_color_dict(divColors11, 11);
push_color_dict(divColors12, 12);

// 24 小时 转化为 12 小时
function format24To12(h) {
	if (h >= 12) {
		return h - 12;
	}

	return h;
}

// 24 小时 转化为 12 小时带上参数
function formatTime(h) {
	if (h >= 12) {
		var _h = h - 12;
		return {
			hour:	'下午' + _h,
		};
	}

	return {
		hour: '上午' + h,
	}
}






