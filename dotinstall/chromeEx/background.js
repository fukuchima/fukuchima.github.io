chrome.browserAction.setBadgeText({"text":"100"})

chrome.browserAction.onClicked.addListener(function(){
	chrome.tabs.executeScript(null,{
		"code":"document.body.style.backgroundColor='green'"
	});

});
