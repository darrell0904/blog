//获取绘图对象

var canvas = document.getElementById('canvas');

var context = canvas.getContext('2d'); 

var p_canvas = document.getElementById('p_canvas');

var p_context = p_canvas.getContext('2d');

var height=600,width=600;


var progress_canvas = document.getElementById('progress');

var progress_context = progress_canvas.getContext('2d');


//画空心大圆 

// context.beginPath();

// context.strokeStyle="#e0e0e0";

// context.arc(width/2,height/2,width/2-1,0,Math.PI*2,true);

// context.stroke();

// context.closePath();



//话实心灰色圆

context.beginPath();

context.arc(width/2,height/2,width/2.2-1,0,360,false);

context.fillStyle="#e0e0e0";//填充颜色,默认是黑色

context.fill();//画实心圆

context.closePath();



//画中间点

context.beginPath();

context.fillStyle="#000";

context.arc(width/2,height/2,3,0,Math.PI*2,true);

context.fill();

context.closePath();




//画小刻度

var angle = 0,radius = width/2 - 4; 

for(var i=0;i<60;i++){

	context.beginPath();

	context.strokeStyle="#46a0ff";

	//确认刻度的起始点

	var x = width/2 + radius*Math.cos(angle),y = height/2 + radius*Math.sin(angle); 

	context.moveTo(x,y);

	//这里是用来将刻度的另一点指向中心点，并给予正确的角度

	//PI是180度，正确的角度就是angle+180度，正好相反方向

	var temp_angle = Math.PI +angle; 

	context.lineTo(x +8*Math.cos(temp_angle),y+8*Math.sin(temp_angle));

	context.stroke();

	context.closePath();

	angle+=6/180*Math.PI;
}

function Pointer(){

	var p_type = [['#000',130,1],['#fc9a13',100,2],['fc9a13',120,3]];

	function drwePointer(type,angle){

		type = p_type[type];

		angle = angle*Math.PI*2 - 90/180*Math.PI; 

		var length= type[1];

		p_context.beginPath();

		p_context.lineWidth = type[2];

		p_context.strokeStyle = type[0];

		p_context.moveTo(width/2,height/2); 

		p_context.lineTo(width/2 + length*Math.cos(angle),height/2 + length*Math.sin(angle)); 

		p_context.stroke();

	}

	setInterval(function (){

		p_context.clearRect(0,0,height,width);

		var time = new Date();

		var h = time.getHours();

		var m = time.getMinutes();

		var s = time.getSeconds(); 

		h = h>12?h-12:h;

		h = h+m/60; 

		h=h/12;

		m=m/60;

		s=s/60;

		drwePointer(1,m);

		drwePointer(2,h); 

		drwePointer(0,s);

	},500);

}

var p = new Pointer();



 /*$(document).ready(function() {

	i = 0;

	t = setInterval("addNum()",2000);

});

function addNum() {

	//最大值60

	if(i<15){

		i++;

		$('canvas.process').text(i+"%");

		drawProcess();

	}else{

		clearInterval(t);

	}

}*/

//function drawProcess() {  
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

		setInterval(renderColor(draw_color_scale[0], draw_color_scale[1],curColor),500);


		// renderColor(11,12,'red');
		// renderColor(12,1,'black');
		// renderColor(1,2,'yellow');
		// renderColor(2,3,'blue');
		// renderColor(3,4,'#ddd');
		// renderColor(4,5,'#3a4d5f');
		// renderColor(5,6,'pink');
		// renderColor(6,7,'orange');
		// renderColor(7,8,'purple');
		// renderColor(8,9,'#999');
		// renderColor(9,10,'#357bb3');


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


		//再时钟上添加签名                 

   	// context.fillStyle = "#4da3ff";                 

   	// context.font = "10pt Comic Sans MS";                 

   	// context.fillText("瑞亚", 150,210);

   	// context.fillStyle = "#ff0000";                 

   	// context.font = "9pt Comic Sans MS";  

   	// context.fillText("PM", 85,150);

   	// context.fillStyle = "#8a8a8a";                 

   	// context.font = "9pt Comic Sans MS"; 

   	// context.fillText("AM", 215,150);  

});

// draw functions :
function clear() { // clear canvas function
    progress_context.clearRect(0, 0, progress_context.canvas.width, progress_context.canvas.height);
}

function renderColor(start, end, _color) {
		clear(); // clear canvas


		var startTime = start , endTime= end; 

    var startMun , endNum;

    //startTime当前的时间点也可以说说画橙色部分的起始时间，r为把时间点转换成数字0-59；endTime为橙色时间的结束点

		if(startTime-1>0){
			startMun=(startTime-1)*5
		}else{
			startMun=(12+startTime-1)*5
		}



		if(endTime-1>0){

			endNum=(endTime-1)*5

		}else{

			endNum=(12+endTime-1)*5

		}

    progress_context.beginPath();  

    progress_context.moveTo(width/2,height/2);    

    progress_context.arc(width/2,height/2, width/2.2-1, Math.PI * 2 * startMun / 60, Math.PI * 2 * endNum / 60, false);  

    progress_context.closePath(); 

    progress_context.fillStyle = _color;  

    progress_context.fill();
}

//}