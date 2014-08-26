function loadPlayer(){
	swfobject.embedSWF(
		'http://www.youtube.com/apiplayer?enablejsapi=1', 
		'playerArea',
		'800',
		'480',
		'8',
		null,
		null,
		{ allowScriptAccess: 'always' },
		{ id: 'ytplayer' }
	);
}
google.setOnLoadCallback(loadPlayer);

function onYouTubePlayerReady(){
	ytplayer.addEventListener('onError', 'onPlayerError');
	updatePlayerInfo();
	setInterval(updatePlayerInfo, 250);
	panelSet();
}

var duration, current_time, total_bytes, start_bytes, loaded;
function updatePlayerInfo() {
	if(ytplayer && ytplayer.getDuration) {
		// 動画の情報を取得
		duration = Math.floor(ytplayer.getDuration());
		current_time = Math.floor(ytplayer.getCurrentTime());
		total_bytes = ytplayer.getVideoBytesTotal();
		loaded = ytplayer.getVideoBytesLoaded();

		// 再生時間を分と秒に分ける
		current_m = ('0' + Math.floor((current_time/60))).slice(-2);
		current_s = ('0' + Math.floor((current_time%60))).slice(-2);
		duration_m = ('0' + Math.floor((duration/60))).slice(-2);	
		duration_s = ('0' + Math.floor((duration%60))).slice(-2);

		// 再生時間をセット
		$('#videoCurrentTime').text(current_m+':'+current_s);
		$('#videoDuration').text(duration_m+':'+duration_s);
		$('#current').css('width', (current_time/duration*100)+'%');
		$('#buffer').css('width', (loaded/total_bytes*100)+'%');
	}
}

function onPlayerError(error_code) {
	alert("An error occured of type:" + error_code);
}

// パネル操作など
function panelSet(){
	// 再生
	$('#play').click(function(){
		if (ytplayer) {
			ytplayer.playVideo();
			showPlayer();
		}
	});

	// 一時停止
	$('#pause').click(function(){ if(ytplayer) ytplayer.pauseVideo(); });

	// ミュート
	$('#mute').click(function(){
		if(ytplayer){
			ytplayer.mute();
			$('#mute').hide();
			$('#unmute').show();
		}
	});

	// ミュートを解除
	$('#unmute').click(function(){
		if(ytplayer){
			ytplayer.unMute();
			$('#mute').show();
			$('#unmute').hide();
		}
	});

	// 再生位置の変更
	var max_w = $('#bar').width();
	$('#bar').click(function(evt){
		var per = evt.clientX / max_w * 100;
		var seek = duration / (100/per);
		$('#current').width(per);
		ytplayer.seekTo(seek, true);
	});

	// 音量の調整
	var interval;
	var volume = ytplayer.getVolume();
	$('#volume').text(volume);
	$('#volumeP, #volumeM').mousedown(function(){
		var target = $(this).attr('id');
		if(target == 'volumeM'){
			setVolume('m');
		}else{
			setVolume('p');
		}

		clearInterval(intervalId);
		intervalId = setInterval(function(){
			if(target == 'volumeM'){
				setVolume('m');
			}else{
				setVolume('p');
			}
		}, 100);
	}).mouseup(function(){
		clearInterval(interval);
	});

	$(document).mousemove(function(){
		clearInterval(interval);
	});

	function setVolume(v) {
		if(volume>0 && v == 'm'){
			volume--;
		}else if(volume<100 && v == 'p'){
			volume++;
		}
		if (ytplayer) {
			ytplayer.setVolume(volume);
			$('#volume').text(('0' + volume).slice(-3));
		}
	}

	// プレイヤーを非表示
	$('#cover').click(function(){
		if (ytplayer) {
			ytplayer.stopVideo();
			hidePlayer();
		}
	});
	
	// 動画の切り替え
	$(document).on('click', '#result a', function(){
		var video_id = $(this).attr('href').split('#')[1].replace('#', '');
		if(ytplayer){
			ytplayer.cueVideoById(video_id);
			ytplayer.stopVideo();
			showPlayer();
		}
		return false;
	});

	var hidePlayer = function(){
		$('#cover').stop(false, true).fadeOut();
		$('#player').stop(false, true).animate({
			marginLeft: 1000
		}, 500, function(){
			$(this).css('margin-left', -2000);
		});
	}

	var showPlayer = function(){
		$('#cover').stop(false, true).fadeIn();
		$('#player').stop(false, true).animate({
			marginLeft: -400
		}, 500);
	}

	// 動画の検索
	$('#search').submit(function(){
		videoSearch($('#keyword').val());
		return false;
	});
}

// 動画の検索
function videoSearch(keyword){
	var query = '';
	if(keyword){
		query += '&vq='+keyword+'&';
	}else{
		query += '&vq=動物&';
	}
	query += 'lr=ja&max-results=50&strict=true';

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
}
videoSearch();

// サムネイルの生成
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
	// 動画の数を2倍にして画面を埋める
	html += html;

	// サムネイルを作成してフェードイン
	$('#result').html('<div class="inner">'+html+'</div>');
	var delaySpeed = 50;
	var fadeSpeed = 500;
	$('.thumbnail').each(function(i){
		$(this).delay(i*(delaySpeed)).fadeTo(fadeSpeed, 1);
	});
}
