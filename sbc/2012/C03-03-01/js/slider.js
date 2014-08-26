$(function(){
	// スライド幅の登録
	var slide_width = $('#slider .slideFrame .slide').width();

	// スライドの最大数を登録
	var slide_count = $('#slider .slideFrame .slide').length;

	// スライドが収まるように横幅を設定
	$('#slider .slideFrame .slideSet').width(slide_width * slide_count);

	// 初期位置の設定
	var current = 1;

	// 次の画像まで移動
	$('#slider .next a').click(function(){
		current++;
		setting();
		return false;
	});

	// 前の画像まで移動
	$('#slider .prev a').click(function(){
		current--;
		setting();
		return false;
	});

	var setting = function(mode){
		// 最初の画像になったら「前へ」ボタン非表示
		if(current <= 1){
			$('#slider .prev').hide();
			current = 1;
		}else{
			$('#slider .prev').show();
		}

		// 最後の画像になったら「次へ」ボタン非表示
		if(current >= slide_count){
			$('#slider .next').hide();
			current = slide_count;
		}else{
			$('#slider .next').show();
		}

		// ロード時の実行とクリックイベントで処理を振り分け
		if(mode == 'onload'){
			$('#slider .slideFrame .slideSet').css({
				left: -slide_width * (current-1)
			});
		}else{
			$('#slider .slideFrame .slideSet').stop().animate({
				left: -slide_width * (current-1)
			}, 1000, 'swing');
		}
	}

	setting('onload');
});
