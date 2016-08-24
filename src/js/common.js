$(function() {

	$(function() {

  $('ul.categories').on('click', 'li.btn:not(.active)', function() {
    $(this)
      .addClass('active').siblings().removeClass('active')
      .closest('div.tabs').find('div.items').removeClass('active').eq($(this).index()).addClass('active');
  });

});

});
