$(function(){
	// 画像データを入れる変数
	var up_files;

	// アップロード中のフラグ
	var uploading = 0;

	// 指定領域にドラッグが重なったとき
	$("#holder").bind("dragover dragenter", function(){
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
		if(!uploading){
			var file = files[0];
			up_files = file;

			// ファイルの情報を表示
			var info = 'Name : '+file.name+'<br>Size : '+file.size+'KB<br>Modified : '+file.lastModifiedDate+'<br>Type : '+file.type
			$('#holder').html('<div class="thumb"><p>'+info+'</p><div class="file"></div></div>');

			// ファイルを読み込む
			var reader = new FileReader();

			// 画像データの場合
			if (file.type.match(/image\/\w+/)) {
				// ファイルの内容を取得する
				reader.readAsDataURL(file);

				reader.onload = function (evt) {
					var img = new Image;
					img.src = evt.target.result;
					$('#holder .file').html(img);
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
					$('#holder .file').html(text);
				}

				reader.error = function (evt) {
					errMsg();
				}
			}
			
			var errMsg = function(){
				alert('ファイルの読み込みに失敗しました。');
			}
		}
	}

	// アップロードボタンが押されたらアップロード開始
	$('#uplode').click(function(){
		if(!uploading && up_files){
			uploading = 1;

			// FormDataに画像データを入れる
			var post = new FormData();
			post.append("file", up_files);

			// ステータス表示
			$('#result').prepend('<div class="msg">「'+up_files.name+'」<span class="status">アップロード中...</span></div>');

			// AjaxでPHPファイルにデータを渡してアップロード
			$.ajax({
				url: 'uploader_simple.php',
				type: 'POST',
				data: post,
				processData: false,
				contentType: false,
				success: function(){
					// アップロードが完了しらステータスを完了にする
					$('#result .msg').addClass('complete').find('.status').text('アップロード完了');
					uploading = 0;

					// データとサムネイルの削除
					up_files = null;
					$('#holder .thumb').fadeTo(1000, 0, function(){
						$(this).remove();
					});
				}
			});
			return false;
		}
	});
});