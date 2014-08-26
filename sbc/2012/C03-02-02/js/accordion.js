$(function(){
	$('.accordion .adnMenu').wrapInner('<a href="javascript: void(0);"></a>');
	$('.accordion .adnBox').each(function(){
		$(this).before($(this).find('.adnMenu'));
	});

	$('.accordion .adnMenu a').click(function(){
		$(this).parent().next().stop(true, true).slideToggle().siblings('.adnBox').slideUp();
		$(this).parent().toggleClass('current').siblings('.adnMenu').removeClass('current');
		return false;
	});

	var current = 0;
	var show = $('.accordion .adnBox').eq(current);
	$('.accordion .adnBox').not(show).hide();
	$('.accordion .adnMenu').eq(current).addClass('current');
});
