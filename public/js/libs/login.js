var padding = 20,
    threshold = 375;
$(document).on('click', 'ul.nav a, footer .top a', function () {
  var $this = $(this),
      target = $this.attr('href');
  $.scrollTo( target, 500, {easing:'', onAfter: function () {
    var parent = $this.parent('li');

    if (parent.length) {
      parent.addClass('active').siblings('li').removeClass('active');
    }
  }} );
  return false;
});
$(function () {
 
  $('.header-box').tooltip({
    selector: "a[data-toggle=tooltip]"
  });
  var $el = $("#nav-floater"),
      $window = $(window);
  $(document).on('scroll', function () {
    var offset = $el.offset();
    var height = $window.scrollTop();
    if (threshold - padding <= height) {
      $el.css({
        'position': 'fixed',
        'top': '5px'
      });
    } else {
      if($el.css('position') === 'fixed') {
        $el.css({
          'position': 'absolute',
          'top': '355px'
        });
      }
    }
  });
});