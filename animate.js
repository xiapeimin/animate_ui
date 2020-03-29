function Animate(imgobj){
	var num = imgobj.imgs_num;
	var srcarr = imgobj.imgs_src;
	var container = imgobj.imgs_container;
	var atimer = imgobj.timer;

	var box = $(container);

	var imgContainer = '<div class="slide"><img src="'+srcarr[num-1]+'" alt=""></div>';
	var liContainer = '';
	for(var i=0;i<num;i++){
		var j=i;
		imgContainer += '<div class="slide"><img src="'+srcarr[i]+'" alt=""></div>';
		if(i===0){
			j++;
			liContainer += '<li class="active">'+j+'</li>'
		}else{
			j++;
			liContainer += '<li>'+j+'</li>';
		}
	}
	imgContainer += '<div class="slide"><img src="'+srcarr[0]+'" alt=""></div>';

	var html = ''
	    + '<div class="slider" id="slider">'
			+ imgContainer
		+ '</div>'
		+ '<span id="left"><</span>'
		+ '<span id="right">></span>'
		+ '<ul class="nav" id="navs">'
		    + liContainer
		+ '</ul>';

	
	this.show = function(){		
		box.html(html);
		
		var oNavlist = $('#navs').children('li');
		var slider = $('#slider');		
		var left = $('#left');
		var right = $('#right');
		var index = 1;
		var timer;
		var isMoving = false;

		slider.css('width',(num+2)*1200+'px');
		
		box.mouseover(function () { 
			animate(left,{opacity:50})
			animate(right,{opacity:50})
			clearInterval(timer)
		});
		box.mouseout(function () { 
			animate(left,{opacity:0})
			animate(right,{opacity:0})
			timer = setInterval(next, atimer);
		});
		right.click(function () { 
			next();
		});
		left.click(function(){
			prev();
		});

		for( var i=0; i<oNavlist.length; i++ ){
			oNavlist[i].index = i;
			$(oNavlist[i]).click(function () { 
				index = this.index+1;
				navmove();
				animate(slider,{left:-1200*index});
			});
		}
		function next(){
			if(isMoving){
				return;
			}
			isMoving = true;
			index++;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index==num+1){ 			
					slider.css('left','-1200px');
					index = 1;
				}
				isMoving = false;
			});
		}
		function prev(){
			if(isMoving){
				return;
			}
			isMoving = true;
			index--;
			navmove();
			animate(slider,{left:-1200*index},function(){
				if(index==0){
					slider.css('left',-1200*num + 'px'); 
					index = num; 
				}
				isMoving = false;
			});
		}
		function navmove(){
			for( var i=0; i<oNavlist.length; i++ ){
				$(oNavlist[i]).removeClass("active");
			}
			if(index > num ){ 
				$(oNavlist[0]).addClass("active");
			}else if(index<=0){
				$(oNavlist[num-1]).addClass("active"); 
			}else {
				$(oNavlist[index-1]).addClass("active");
			}
		}
		timer = setInterval(next, atimer);
		function getStyle(obj, attr){
			return obj.css(attr);
		}
		function animate(obj,json,callback){
			clearInterval(obj.timer);
			obj.timer = setInterval(function(){
				var isStop = true;
				for(var attr in json){
					var now = 0;
					if(attr == 'opacity'){
						now = parseInt(getStyle(obj,attr)*100);
			        }else{
						now = parseInt(getStyle(obj,attr));
					}
					var speed = (json[attr] - now) / 8;
					speed = speed>0?Math.ceil(speed):Math.floor(speed);
					var cur = now + speed;
					if(attr == 'opacity'){
						obj.css(attr,cur / 100);
			        }else{
						obj.css(attr,cur + 'px');
					}
					if(json[attr] !== cur){
						isStop = false;
					}
				}
				if(isStop){
					clearInterval(obj.timer);
					callback&&callback();
				}
			}, 30)
		}
	}

}
