var cueHour = getCurHour();
var curColor = getCurColor();

// 获取数组中的颜色
function getColorBySeconds (color_arr, curHour, curSecond) {
	// console.log('--color_arr[curHour][curSecond].length---', color_arr[curHour][curSecond].length);
	if (color_arr[curHour][curSecond].length != 7) {
		if (curSecond == 0) {
			curSecond = DEFAULT_NUM - 1;
			return getColorBySeconds(color_arr, curHour,curSecond - 1);
		} else {
			return getColorBySeconds(color_arr, curHour,curSecond - 1);
		}
	} else {
		return color_arr[curHour][curSecond];
	}

}


// 获取现在时间在数组的那一个下标
function getSecondsIn (cur_seconds) {
	return Math.floor(cur_seconds / MULTIPLE);
}

// 获取现在时间所在的颜色
function getCurColor () {
	var time = new Date(),
			hour = time.getHours(),
			m = time.getMinutes(),
			s = time.getSeconds();
	
	var _hour = format24To12(hour) + 1,
			_now_seconds = m*60 + s;

	var secondWhichColor = getSecondsIn(_now_seconds);
			
	var curColor = getColorBySeconds(color_arr, _hour.toString(), secondWhichColor);

	return curColor;
}

function getCurHour() {
	var time = new Date(),
			hour = time.getHours();

	return format24To12(hour);
}

function _formatTime () {
	var time = new Date(),
			hour = time.getHours(),
			m = time.getMinutes(),
			s = time.getSeconds();

	var _hour = formatTime(hour);

	var tpl = '' + _hour.hour + '点' + m + '分' + s + '秒';

	return tpl;
}

_formatTime();

function setTime () {
	var time_tpl = _formatTime();
	$('#timeBox span').html('').html(time_tpl);
}


// 设置小时
function setHour () {
	cueHour = getCurHour();
	// console.log('--cueHour--', cueHour);
	// $('body').css('backgroundColor', curColor);
}




