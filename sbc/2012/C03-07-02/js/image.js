onload = function(){
	/*
	 * 画像を表示
	 */
	var cvs1 = document.getElementById('cvs1');
	var ctx1 = cvs1.getContext('2d');

	// Imageオブジェクトを作成する
	var img1 = new Image();
	img1.src = 'img/image.jpg';
	
	// 画像を表示
	img1.onload = function() {
		ctx1.drawImage(img1, 5, 5);
	}

	/*
	 * 画像を拡大して表示
	 */
	var cvs2 = document.getElementById('cvs2');
	var ctx2 = cvs2.getContext('2d');

	// Imageオブジェクトを作成する
	var img2 = new Image();
	img2.src = 'img/image.jpg';
	
	// 画像を表示
	img2.onload = function() {
		ctx2.drawImage(img2, 5, 5, 800, 530);
	}

	/*
	 * 画像をトリミングして表示
	 */
	var cvs3 = document.getElementById('cvs3');
	var ctx3 = cvs3.getContext('2d');

	// Imageオブジェクトを作成する
	var img3 = new Image();
	img3.src = 'img/image.jpg';
	
	// 画像を表示
	img3.onload = function() {
		ctx3.drawImage(img3, 175, 70, 300, 199, 50, 50, 300, 199);
	}


	/*
	 * 画像を変形させて表示する
	 */
	var cvs4 = document.getElementById('cvs4');
	var ctx4 = cvs4.getContext('2d');

	// Imageオブジェクトを作成する
	var img4 = new Image();
	img4.src = 'img/image.jpg';
	
	// 画像を表示
	img4.onload = function() {
		ctx4.scale(1.5, 0.5);
		ctx4.rotate(10 * Math.PI / 180);
		ctx4.translate(100, 250);
		ctx4.drawImage(img4, 175, 70, 300, 199, 50, 50, 300, 199);
	}
}