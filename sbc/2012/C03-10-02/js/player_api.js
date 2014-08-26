function loadPlayer(){
	var video_id = 'ylLzyHk54Z0'
	swfobject.embedSWF(
		'http://www.youtube.com/v/'+video_id+'?enablejsapi=1', 
		'player',
		'480',
		'295',
		'8',
		null,
		null,
		{ allowScriptAccess: 'always' },
		{ id: 'ytplayer' }
	);
}
google.setOnLoadCallback(loadPlayer);

$(document).on('click', '#result a', function(){
	var video_id = $(this).attr('href').split('#')[1].replace('#', '');
	if(ytplayer){
		ytplayer.loadVideoById(video_id);
	}
	return false;
});

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

		// hrefのパラメータを配列に格納
		var param = href.split('?')[1].split('&');
		var params = new Object;;
		for(i=0;param[i];i++) {
			var kv = param[i].split('=');
			params[kv[0]]=kv[1];
		}

		// サムネイル用のHTMLを作成
		html += '<div class="thumbnail"><a href="#'+params.v+'"><img src="'+img_src+'" width="200" height="150" alt=""><span class="title">'+title+'</span></a></div>';
	}

	// サムネイルを作成
	$('#result').html(html);
}
