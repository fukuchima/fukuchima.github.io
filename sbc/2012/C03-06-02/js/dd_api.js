$(function(){
	// 指定領域にドラッグが重なったとき
	$("#result").bind("dragover dragenter", function(){
		$(this).addClass('hover');
		return false;

	// 指定領域からドラッグが離れたとき
	}).bind("dragleave", function(){
		$(this).removeClass('hover');
		return false;

	// 指定領域にドロップされたとき
	}).bind("drop", function(event){
		$(this).removeClass('hover');

		// ブラウザデフォルトの画像表示をOFFにする
		event.preventDefault();

		// サムネイルの生成
		preview(event.originalEvent.dataTransfer.files);

		return false;
	});

	var preview = function(files){
		var file = files[0];

		// ファイルの情報を表示
		var info = 'Name : '+file.name+'<br>Size : '+file.size+'KB<br>Modified : '+file.lastModifiedDate+'<br>Type : '+file.type
		$('#result').html('<div class="thumb"><p>'+info+'</p><div class="file"></div></div>');

		// ファイルを読み込む
		var reader = new FileReader();

		// 画像データの場合
		if (file.type.match(/image\/\w+/)) {
			// ファイルの内容を取得する
			reader.readAsDataURL(file);

			reader.onload = function (evt) {
				var img = new Image;
				img.src = evt.target.result;
				$('#result .file').html(img);
			}

			reader.error = function (evt) {
				errMsg();
			}

		// テキストデータの場合
		}else if (file.type.match(/text\/\w+/)) {
			// ファイルの内容を取得する
			reader.readAsText(file);

			reader.onload = function (evt) {
				var text = evt.target.result;
				$('#result .file').html(text);
			}

			reader.error = function (evt) {
				errMsg();
			}
		}
		
		var errMsg = function(){
			alert('ファイルの読み込みに失敗しました。');
		}
	}
});