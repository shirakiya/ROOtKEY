$(function(){
  // -- autocomplete ここから --
  function initAutoComplete() {
    if (document.getElementById('form_start') != null && document.getElementById('form_end') != null) {
      var inputStart = /** @type {HTMLInputElement} */(
        document.getElementById('form_start'));
      var inputEnd   = /** @type {HTMLInputElement} */(
        document.getElementById('form_end'));
      var options = {
        types: []
      };

      var autocomplete_start = new google.maps.places.Autocomplete(inputStart, options);
      var autocomplete_end   = new google.maps.places.Autocomplete(inputEnd, options);
    }
  }

  google.maps.event.addDomListener(window, 'load', initAutoComplete);
  // -- autocomplete ここまで --

  // -- 検索ローダー ここから --
  $('#form-search').on('submit', function(event){
    $(this).blur();
    $(this).find('button').attr('disabed', true);
    // 既にover-layが画面に表示されている場合はfalseを返して終了
    if (document.getElementById('over-lay') != null) {
      return false;
    }

    $('body').append('<div id="over-lay"></div>');
    $('#over-lay').fadeIn('normal');
    centeringLoader();
    $('#search-loader').fadeIn('normal');
  });

  function centeringLoader(){
    $search_loader = $('#search-loader');
    var pxleft = ($(window).width() - $search_loader.outerWidth(true)) / 2;
    var pxtop  = (window.innerHeight - $search_loader.outerHeight(true)) / 2;

    $search_loader.css({'left': pxleft + 'px'});
    $search_loader.css({'top': pxtop + 'px'});
  }

  $(window).on('resize', function(){
    centeringLoader();
  });
  // -- 検索ローダー ここまで --
});
