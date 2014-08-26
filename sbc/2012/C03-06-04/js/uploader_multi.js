$(function(){
	// 画像データを入れる変数
	var up_files = new Array();

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
			for(var i=0;i<files.length;i++){
				var file = files[i];
				var reader = new FileReader(); 

				// MIMEが画像か判定する
				if (file.type.match(/image\/\w+/)) {
					// ファイルサイズ制限
					if(file.size <= 300000){
						// 配列に画像データを格納する
						up_files.push(file);

						// ファイルの内容を取得する
						reader.readAsDataURL(file);

						$('#holder').append('<div class="thumb"><div class="file"></div></div></div>');

						// ファイルの読み込みが完了したら画像を生成する
						reader.onload = function(evt, i){
							var img = new Image;
							img.src = evt.target.result;
							$('#holder .file').each(function(){
								if($(this).is(':empty')){
									$(this).html(img).find('img').fadeTo(1000, 1);
								}
							});
						}

						// エラー処理をする
						reader.onerror = function(evt){
							for (var key in reader.error) {
								$('#result').prepend(key + ':' + reader.error[key] + '<br>');
							}
						}
					}else{
						$('#result').prepend('<div class="errMsg">「'+file.name+'」はデータサイズが300KBを超えたため登録されませんでした。</div>');
					}
				}else{
					$('#result').prepend('<div class="errMsg">「'+file.name+'」は画像ファイルではないため登録されませんでした。</div>');
				}
			}
		}
	}

	// アップロードボタンが押されたらアップロード開始
	$('#uplode').click(function(){
		if(!uploading){
			$('#uplode').attr('disabled', 'disabled');

			uploading = 1;
			var comp = 0;
			for(var i=0;i<up_files.length;i++){
				// FormDataに画像データを入れる
				var post = new FormData();
				var file = up_files[i];
				post.append("file", file);
				post.append("no", i);

				// ステータス表示
				$('#result').prepend('<div id="upNo'+i+'" class="msg">「'+file.name+'」<span class="status">アップロード中...</span></div>');
	
				// AjaxでPHPファイルにデータを渡してアップロード
				$.ajax({
					url: 'uploader_multi.php',
					type: 'POST',
					data: post,
					processData: false,
					contentType: false,
					dataType: 'json',
					success: function(data){
						// アップロードが完了した順に結果を表示
						if(data.status=='success'){
							$('#result #upNo'+data.no).addClass('complete').find('.status').text('アップロード完了');
						}else{
							$('#result #upNo'+data.no).addClass('complete').find('.status').text('アップロード失敗');
						}

						comp++;
						if(comp >= up_files.length){
							uploading = 0;
							// データとサムネイルの削除
							up_files = new Array();
							$('#holder .thumb').fadeTo(1000, 0, function(){
								$(this).remove();
							});
						}
					}
				});
			}
			return false;
		}
	});
});
