$(function(){
	var parallax = function(){
		// スクロール位置を取得
		var st  = $(window).scrollTop();

		// 背景画像の位置を変更する
		$('body').css({
			backgroundPosition: 'center '+Math.floor(-st/5)+'px'
		});

		$('#container').css({
			backgroundPosition: 'center '+Math.floor(-st/2.5)+'px'
		});
	}
	parallax();

	// スクロールされたら実行
	$(window).scroll(function(){
		parallax();
	});
});
