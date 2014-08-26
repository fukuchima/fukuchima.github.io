$(function(){
	$('form').submit(function(){
		// 検索条件を格納
		var params = {
			'lr': $('#lang').val(),
			'vq': $('#keyword').val(),
			'max-results': $('#num').val(),
			'author': $('#author').val(),
			'category': $('#category').val(),
			'orderby': $('#orderby').val()
		};

		// 値のあるものを抽出して検索クエリを作成
		var query = '';
		for(var key in params){
			if(params[key]){
				query += key+'='+params[key]+'&';
			}
		}

		var isIE = false;
		if(navigator.userAgent.toLowerCase().indexOf("msie")!=-1) isIE = true;
		if(isIE){
			// IE向けの処理
			query += '&alt=json-in-script&callback=result';
			var url = 'http://gdata.youtube.com/feeds/api/videos?'+query;
			var script = document.createElement('script');
			script.setAttribute('type', 'text/javascript');
			script.setAttribute('src', url);
			document.getElementsByTagName('head')[0].appendChild(script);
		}else{
			query += '&alt=json';
			// jSON形式でYoutubeからデータを取得する
			$.getJSON(
				'http://gdata.youtube.com/feeds/api/videos?'+query,
				function(data) {
					result(data);
				}
			);
		}
		return false;
	});
});

function result(data){
	var html = '';
	for(var i in data.feed.entry){
		// 必要なデータを取得
		var entry = data.feed.entry[i];
		var href = entry.link[0].href;
		var img_src = entry.media$group.media$thumbnail[0].url;
		var title = entry.title.$t;

		// サムネイル用のHTMLを作成
		html += '<div class="thumbnail"><a href="'+href+'" target="_blank"><img src="'+img_src+'" width="200" height="150" alt=""><span class="title">'+title+'</span></a></div>';
	}
	
	// サムネイルを作成
	$('#result').html(html);

	// データを全て表示
	$('#data').html('<pre>'+dump(data)+'</pre>');
}

// 指定されたオブジェクトを全て表示する
function dump(arr,level){
	var dumped_text = "";
	if(!level) level = 0;
	
	//The padding given at the beginning of the line.
	var level_padding = "";
	for(var j=0;j<level+1;j++) level_padding += "    ";
	
	if(typeof(arr) == 'object') { //Array/Hashes/Objects 
		for(var item in arr) {
			var value = arr[item];
			
			if(typeof(value) == 'object') { //If it is an array,
				dumped_text += level_padding + "'" + item + "' ...\n";
				dumped_text += dump(value,level+1);
			} else {
				dumped_text += level_padding + "'" + item + "' => \"" + value + "\"\n";
			}
		}
	} else { //Stings/Chars/Numbers etc.
		dumped_text = "===>"+arr+"<===("+typeof(arr)+")";
	}
	return dumped_text;
}
