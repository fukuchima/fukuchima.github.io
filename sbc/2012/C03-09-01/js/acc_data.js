$(function(){
	// JavaScript SDKの読み込み
	var e = document.createElement('script'); e.async = true;
	e.src = document.location.protocol +　'//connect.facebook.net/ja_JP/all.js';
	document.getElementById('fb-root').appendChild(e);

	// JavaScript SDKの読み込みが終わったら実行される処理
	window.fbAsyncInit = function(){
		FB.init({
			appId: '326880500742269',
			status: true,
			cookie: true,
			xfbml: true
		});
	
		// Facebookにログイン中か判定
		FB.getLoginStatus(function(response){
			if(response.authResponse){
				$('#logout').show();
			}else{
				$('#login').show();
			}
		});
	};

	// ログインボタンが押されたらログインウィドウを表示
	$('#login button').click(function(){
		FB.login(function(response){
			if(response.authResponse){
				$('#login').hide();
				$('#logout').show();
			}
		});
	});

	// ログアウトボタンが押されたらログアウトする
	$('#logout button').click(function(){
		FB.logout(function(response){
			$('#login').show();
			$('#logout').hide();
		});
	});

	// ログイン中のアカウントの情報を取得する
	$('#getMe button').click(function(){
		var request = 'me';
		FB.api(request, function(response) {
			$('#result').html('<pre>'+dump(response)+'</pre>');
		});
	});

	// 指定されたオブジェクトをすべて表示する
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
});
