window.addEventListener('load' , function(){
	alert('loaded');

	var canvas = document.getElementById('canvas');
	canvas.width=window.innerWidth - 30;
	canvas.height=window.innerHeight - 30;

	var ctx = canvas.getContext('2d');
	ctx.lineWidth = 5;
	ctx.strokeStyle = '#9ea1a3';

	var down = false;
	canvas.addEventListener('mousedown', function (e){
		down=true;
		ctx.beginPath();
		ctx.moveTo(e.clientX, e.clientY);
	},false);

	canvas.addEventListener('mousemove', function (e){
		if (!down) return;
		console.log(e.clientX, e.clientY);
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();		
	},false);

	canvas.addEventListener('mouseup', function (e){
		if (!down) return;
		console.log(e.clientX, e.clientY);
		ctx.lineTo(e.clientX, e.clientY);
		ctx.stroke();
		ctx.closePath();
		down=false;		
	},false);

},false);