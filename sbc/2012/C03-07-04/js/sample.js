onload = function(){
	/*
	 * マスクを使った透過処理
	 */
	var cvs = document.getElementById('cvs');
	var ctx = cvs.getContext('2d');

	// マスク対象の画像を読み込む
	var img1 = new Image();
	img1.src = 'img/sample.jpg';

	// マスク画像を読み込む
	var img2 = new Image();
	img2.src = 'img/sample_mask.png';

	// 画像を表示する
	img1.onload = function(){
		preview();
	}

	img2.onload = function(){
		preview();
	}

	// 2つの画像の読み込みが終わったら表示
	var load_status = 0;
	var preview = function(){
		load_status++;
		if(load_status == 2){
			ctx.drawImage(img2, 0, 0);
			ctx.globalCompositeOperation = 'source-in';
			ctx.drawImage(img1, 0, 0);
			load_status = 0;
		}
	}
}