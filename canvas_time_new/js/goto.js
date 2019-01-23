// html设置颜色
function setColor () {
	curColor = getCurColor();
	// console.log('--curColor--', curColor);
	// $('body').css('backgroundColor', curColor);
	$('canvas.process').each(function() {

    /*var text = $(this).text();

    var process = text.substring(0, text.length-1);  */

    var canvas = this;  

    var context = canvas.getContext('2d');  

    context.clearRect(0, 0, width, height);  

    //画橘色部分  三点钟方向为0  0-59

    var startTime = 10 , endTime= 11; 

    var startMun , endNum;

    //startTime当前的时间点也可以说说画橙色部分的起始时间，r为把时间点转换成数字0-59；endTime为橙色时间的结束点

    // 颜色的显示
    var draw_color_scale = Scale_color_dict[cueHour+1];

		
		renderColor(draw_color_scale[0], draw_color_scale[1],curColor);

    //画色实心圆

    context.beginPath();  

    context.moveTo(width/2,height/2);  

    context.arc(width/2,height/2,width/3.5-1,0, Math.PI * 2, true);  

    context.closePath(); 

    if (SHOW_COLOR_DIAL) {
    	context.fillStyle = curColor; 
    } else {
    	context.fillStyle = '#fff';
    }

    context.fill();



    //画白色分割线

		angle = 5.5,radius = width/2 - 4; 

		context.textBaseline = 'middle';

		context.textAlign = 'center';

		context.font = "16pt Calibri";

		context.lineWidth = 2;

		for(var i=0;i<12;i++){

			var num = i+3>12? i+3-12:i+3 ; 

			context.beginPath();

			context.strokeStyle="#fff";

			var x = width/2 + radius*Math.cos(angle),y = height/2 + radius*Math.sin(angle); 

			context.moveTo(x,y);

			var temp_angle = Math.PI +angle; 

			context.lineTo(x +126*Math.cos(temp_angle),y+126*Math.sin(temp_angle));

			context.stroke();

			context.closePath();

			angle+=30/180*Math.PI;

		}

		//大刻度

		
			angle = 0,radius = width/2 - 4; 

			context.textBaseline = 'middle';

			context.textAlign = 'center';

			context.font = "18pt Calibri";

			context.lineWidth = 2;


			for(var i=0;i<12;i++){

					var num = i+3>12? i+3-12:i+3 ; 

					context.beginPath();

					context.strokeStyle="#46a0ff";

					var x = width/2 + radius*Math.cos(angle),y = height/2 + radius*Math.sin(angle); 

					context.moveTo(x,y);

					var temp_angle = Math.PI +angle; 

					context.lineTo(x +25*Math.cos(temp_angle),y+25*Math.sin(temp_angle));

					context.stroke();

					context.closePath();

					//大刻度 文字

					context.fillStyle="#46a0ff";

					if (SHOW_TIME_NUMBER) {
						context.fillText(num,x+40*Math.cos(temp_angle),y+40*Math.sin(temp_angle));
					}

					angle+=30/180*Math.PI;

			}

	});
}
// 监听事件变化，改变颜色
setInterval(setColor,500);

// 监听小时变化，改变颜色
setInterval(setColor,1800000);

// 最下面的事件显示
setInterval(setTime, 500);