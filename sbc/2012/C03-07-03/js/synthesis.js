onload = function(){
	/*
	 * 重なったときの合成処理を設定する
	 */
	var option = new Array(
		"source-atop",
		"source-in",
		"source-out",
		"source-over",
		"destination-atop",
		"destination-in",
		"destination-out",
		"destination-over",
		"lighter",
		"copy",
		"xor"
	);

	for(var i=0;i<option.length;i++){
		var cvs = document.getElementById('cvs'+(i+1));
		var ctx = cvs.getContext('2d');
	
		ctx.beginPath();
		ctx.fillStyle = '#d64f4f';
		ctx.fillRect(40, 40, 150, 100);

		ctx.globalCompositeOperation = option[i];

		ctx.beginPath();
		ctx.arc(40, 40, 30, 0, Math.PI*2, false);
		ctx.fillStyle = '#6862b8';
		ctx.fill();
	}
}