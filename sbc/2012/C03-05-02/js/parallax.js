$(function(){
	// 画像の数を取得
	var img_count = $('.image').length;

	// 変数の宣言
	var win_h, partition, current, old_current;

	var setting = function(){	
		// ウィンドウサイズの取得
		win_h = $(window).height();

		// 配列の初期化
		partition = new Array();

		for(i=0;i<img_count;i++){
			// 画像の区切り位置を設定
			partition.push(win_h * i);

			// 写真の高さと重なり順を設定
			$('.image').eq(i).css({
				zIndex: img_count - i
			}).find('img').height(win_h);
		}

		// コンテンツを画像の合計値に設定
		$('body').height(img_count * win_h);
	}
	setting();

	// ウィンドウがリサイズされたら設定をし直す
	$(window).resize(function(){
		setting();
	});


	// スクロール量を取得
	var st = $(window).scrollTop();

	// 現在地の設定と画像切り替え処理の実行
	var parallax = function(){
		$(partition).each(function(i){
			// 何枚目の画像か取得
			if(st == ($(document).height()-win_h)){
				current = img_count - 1;
				imageChange();
			}else if(st >= partition[i] && st < partition[i+1]){
				current = i;
				imageChange();
			}
		});
	}

	// スクロールされたら実行
	$(window).scroll(function(){
		// スクロール量を取得
		st  = $(window).scrollTop();
		parallax();
	});

	// 画像の切り替え処理
	var imageChange = function(){
		// 現在地を書き換える
		if(current != old_current){
			old_current = current;
			$('#num').text(current+1);
		}

		// スクロール位置に合わせて画像の高さを変更
		$('.image').eq(current).height(win_h - (st - partition[current]));
		if($('.image').eq(current+1).length){
			$('.image').eq(current+1).height(win_h);
		}

		// 非表示になった画像を綺麗に消す処理
		for(h=0;h<current;h++){
			$('.image').eq(h).height(0);
		}
		for(h=current+2;h<img_count;h++){
			$('.image').eq(h).height(0);
		}
	}

	parallax();
});
