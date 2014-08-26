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
	};

	// フォームへ取得した情報をセットする
	$('#input button').click(function(){
		// Facebookにログイン中か判定
		FB.getLoginStatus(function(response){
			// ログインしていてアプリも許可しているとき
			if (response.status === 'connected') {
				set();

			// アプリの許可がないときとログインしていないとき
			} else {
				FB.login(function(response){
					if(response.authResponse){
						set();
					}
				}, {scope: 'email'});
			}
		});
	});
	
	var set = function(response){
		var request = 'me?fields=name,email,location&location&locale=ja_JP';
		FB.api(request, function(response) {
			$('#fName').val(response.name);
			$('#fEmail').val(response.email);
			$('#fAddr').val(response.location.name);
		});
	}
});
