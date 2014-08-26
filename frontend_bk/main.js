$(function(){
	$('.tab').prepend('<div class="menu"></div>');
	$('.menu').prepend($('.tabMenu'));
	$('.tabMenu').wrapInner('<a href="javascript: void(0);"></a>');

	var current = 0;
	var show =$('.tab .tabBox' ).eq(current);
	$('.tab .tabBox').not(show).hide();
	$('.tab .tabMenu').eq(current).find('a').addClass('current');

	$('.menu a').click(function(){
		$('.tab .tabBox').hide().eq($('.menu a').index(this)).show();
		$('.tab .tabMenu a').removeClass('current');
		$(this).addClass('current');
		return false;

	});
});