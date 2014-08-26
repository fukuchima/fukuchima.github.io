$(function(){
	setting();
	setTimeout(doScroll, 100);
	window.addEventListener('load', function(){ setTimeout(doScroll, 100); },false);
	window.addEventListener('orientationchange',function(){ setTimeout(doScroll, 100); });
});

function setting(){
	tilt();

	var agent = navigator.userAgent;
	if(agent.search(/iPhone/) != -1){
		$("body").addClass("iphone");
		window.addEventListener('orientationchange',function(){
	     	tilt();
		},false);
	}else if(agent.search(/Android/) != -1){
		window.addEventListener('resize',function(){
	     	tilt();
		},false);
	}
}

function tilt(){
	$("html").css("zoom" , $(window).width()/320 );
	var orientation = window.orientation;
	if(orientation == 0){
		$("body").addClass("portrait");
		$("body").removeClass("landscape");
	}else{
		$("body").addClass("landscape");
		$("body").removeClass("portrait");
	}
}

function doScroll() {
	if (window.pageYOffset === 0) { window.scrollTo(0,1); }
}
