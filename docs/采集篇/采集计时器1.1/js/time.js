
var LocalDate = new Date();//本地时间
var LocalUnix = LocalDate.getTime();
var interval = 1000;
function ShowCountDown(hour,minute,second) 
{
	var LocalDate = new Date();//本地时间
	var LocalUnix = LocalDate.getTime();
	var now = localToEorzea();
	now.setTime(LocalUnix);//把本地时间转换成游戏时间
	if(now.getHours()>=hour){//已经过了1点了算到明天的1点剩余时间。
		var leftHour=24-now.getHours()+hour-1;
		var leftMins=(59-minute)-now.getMinutes();
		var leftsec=(60-second)-now.getSeconds();
	}else{
		var leftHour=hour-now.getHours()-1;//本来这是要+1的..但是后面还要-1我就不加了- -
		var leftMins=(59-minute)-now.getMinutes();
		var leftsec=(60-second)-now.getSeconds();
	}


	var all = (leftHour * 3600 + leftMins * 60 +  leftsec)*175 / 3600;
	var h = parseInt(all / 3600);
	var m = parseInt((all - h * 3600) / 60);
	var s = parseInt(all % 3600 % 60);
	
	var tr = $('.hour_show' + hour).closest("tr");
	if( leftHour == 23 ){
		tr.find("td.bg0").css({"background":"#36c","color":"#fff"});
		$('.hour_show' + hour).html('还有<s id="h"></s>'+h+':');
		$('.minute_show' + hour).html('<s></s>'+doubleDigit(m)+':');
		$('.second_show' + hour).html('<s></s>'+doubleDigit(s));
	}else if( leftHour < 3 ){
		$('.hour_show' + hour).html('还有<s id="h"></s>'+h+':');
		$('.minute_show' + hour).html('<s></s>'+doubleDigit(m)+':');
		$('.second_show' + hour).html('<s></s>'+doubleDigit(s));
		tr.find("td.bg0").css({"background":"#39f","color":"#fff"});
	}else{
		tr.find("td.bg0").css({"background":"#9cf","color":"#000"});	
		$('.hour_show' + hour).html('');
		$('.minute_show' + hour).html('');
		$('.second_show' + hour).html('');
	}
} 

window.setInterval(function(){ShowCountDown(1,0,0);}, interval);
window.setInterval(function(){ShowCountDown(2,0,0);}, interval);
window.setInterval(function(){ShowCountDown(3,0,0);}, interval);
window.setInterval(function(){ShowCountDown(4,0,0);}, interval);
window.setInterval(function(){ShowCountDown(5,0,0);}, interval);
window.setInterval(function(){ShowCountDown(6,0,0);}, interval);
window.setInterval(function(){ShowCountDown(7,0,0);}, interval);
window.setInterval(function(){ShowCountDown(8,0,0);}, interval);
window.setInterval(function(){ShowCountDown(9,0,0);}, interval);
window.setInterval(function(){ShowCountDown(13,0,0);}, interval);
window.setInterval(function(){ShowCountDown(17,0,0);}, interval);
window.setInterval(function(){ShowCountDown(18,0,0);}, interval);
window.setInterval(function(){ShowCountDown(19,0,0);}, interval);
window.setInterval(function(){ShowCountDown(21,0,0);}, interval);