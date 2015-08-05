/*
 * 検索Box
 */
var $ = require('jquery');
var Marionette = require('backbone.marionette');
var SearchLoader = require('./searchLoader');

module.exports = Marionette.ItemView.extend({
  el: '#search-box',
  ui: {
    formSearch: '#form-search',
    formSearchButton: '#form-search-button'
  },
  template: false,

  events: {
    'submit @ui.formSearch': 'submitForm'
  },

  initialize: function() {
    // uiをjQueryオブジェクトにする
    this.bindUIElements();
    // AutoCompleteの有効化
    this._initAutoComplete();
  },

  // AutoCompleteの定義
  _initAutoComplete: function() {
    google.maps.event.addDomListener(window, 'load', function() {
      var inputStart = /** @type {HTMLInputElement} */(document.getElementById('form_start'));
      var inputEnd   = /** @type {HTMLInputElement} */(document.getElementById('form_end'));
      var options = {
        types: [],
        componentRestrictions: { country: 'jp'}
      };

      new google.maps.places.Autocomplete(inputStart, options);
      new google.maps.places.Autocomplete(inputEnd, options);
    });
  },

  // 検索実行時の挙動の定義
  submitForm: function() {
    this.ui.formSearch.blur();  // form-searchからフォーカスを外す(enter連打を無効化)
    this.ui.formSearchButton.attr('disabled', true);
    // 既にover-layが画面に表示されている場合はfalseを返して終了
    if (document.getElementById('over-lay') != null) {
      return false;
    }

    // ローダーの表示
    var searchLoader = new SearchLoader();
    searchLoader.render();

    // ウィンドウサイズ監視の起動
    $(window).on('resize', function() {
      searchLoader.triggerMethod('resize');
    });
  }
});
