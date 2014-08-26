onload = function(){
	// 2Dコンテキストオブジェクトを作成する
	var cvs = document.getElementById('cvs');
	var ctx = cvs.getContext('2d');

	// 線を描く
	ctx.beginPath();
	ctx.moveTo(50, 50);
	ctx.lineTo(100, 25);
	ctx.lineTo(150, 50);
	ctx.lineTo(200, 25);

	// 三角形を描く
	ctx.moveTo(200, 125);
	ctx.lineTo(250, 150);
	ctx.lineTo(300, 125);
	ctx.closePath();
	ctx.stroke();
}