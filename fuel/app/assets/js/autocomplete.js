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

    // over-layの表示
    $('body').append('<div id="over-lay"></div>');
    $('#over-lay').fadeIn('normal');
    // ローダーの表示
    centeringLoader();
    $('#search-loader').fadeIn('normal');
  });

  // ローダーのセンタリング
  function centeringLoader(){
    $searchLoader = $('#search-loader');
    var pxleft = ($(window).width() - $searchLoader.outerWidth(true)) / 2;
    var pxtop  = (window.innerHeight - $searchLoader.outerHeight(true)) / 2;

    $searchLoader.css({'left': pxleft + 'px'});
    $searchLoader.css({'top': pxtop + 'px'});
  }

  // ブラウザのリサイズを監視
  $(window).on('resize', function(){
    centeringLoader();
  });
  // -- 検索ローダー ここまで --
});
