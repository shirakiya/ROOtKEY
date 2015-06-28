(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// モジュールの取得
var $ = require('jquery');
var jQuery = $;
var foundation = require('foundation-sites');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');


var app = new Marionette.Application();

// ルーターの取得
var Router = require('./lib/router');
var myController = require('./lib/mainController');

app.addInitializer(function() {
  // foundationの初期化
  $(document).foundation();

  new Router({ controller: myController });
  Backbone.history.start({pushState: true});
});

app.start();

},{"./lib/mainController":2,"./lib/router":4,"backbone":"backbone","backbone.marionette":"backbone.marionette","foundation-sites":"foundation-sites","jquery":"jquery","underscore":"underscore"}],2:[function(require,module,exports){
/**
 * コントローラーオブジェクトの定義
 * ここではrouterが命令した処理に対して実処理を定義する
 */
module.exports = {
  top: require('./top/controller'),
  mypage: require('./mypage/controller')
};

},{"./mypage/controller":3,"./top/controller":5}],3:[function(require,module,exports){
var $ = require('jquery');

module.exports = function() {
  /* 編集アイコン押下時 */
  $('.search-result-edit').on('click', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    var $search_result = JSON.parse($(this).siblings('.search-result-info').text());
    var $modal = $('#modal-search-result-title-edit');
    // タイトル入力フォームにタイトルを入力させておく
    $('#form_title').val($search_result.title);
    // hidden要素にidを格納させておく
    $modal.find('#form_id').val($search_result.id);
    // モーダルの表示
    $modal.foundation('reveal', 'open');
  });

  // 検索結果登録名文字数の監視
  $('#form_title').keyup(function(){
    if ($(this).data('submit-flag') != 1) {
      var count = $(this).val().length;
      if (count > 0 && count <= 50) {
        $('#button-search-result-save').removeAttr('disabled');
      } else if (count == 0 || count > 50) {
        $('#button-search-result-save').attr('disabled', true);
      }
    }
  });

  /* 編集ボタン押下時 */
  $('#form-search-result-title-edit').on('submit', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    // フォーム要素を取得
    var $form = $(this);
    // 編集ボタン要素を取得
    var $button = $form.find('button');

    $.ajax({
      url: $form.attr('action'),
      type: $form.attr('method'),
      data: $form.serialize(),
      dataType: 'json',
      cache: true,
      timeout: 60000,
      // 送信前処理
      beforeSend: function(xhr, settings){
        // 二重投稿防止
        $button.attr('disabled', true);
      }
    })
    .done(function(data, status, xhr){  // 成功時
      $('#search-result-title-edit-success').show('slow');
      // 登録名を動的に変更する
      $('table.search-result-title[data-id='+data.id+']').find('th').text(data.title);
      // 検索結果登録名文字数の監視の無効化
      $form.find('#form_title').data('submit-flag', 1);
    })
    .fail(function(xhr, status, errorThrown){  // 失敗時
      var $alert_box = $('#search-result-title-edit-error');
      var errorMessage = errorThrown;
      if (xhr.responseJSON != undefined && xhr.responseJSON.message != undefined) {
        errorMessage = xhr.responseJSON.message;
      }
      $alert_box.find('.error-message').empty().text(status + '：' + errorMessage);
      $alert_box.show('slow');
    });
  });

  /* 編集モーダル格納時アクション */
  $('#modal-search-result-title-edit').on('closed.fndtn.reveal', '', function(){
    var $modal = $('#modal-search-result-title-edit');
    // alert_box非表示
    $modal.find('#search-result-title-edit-success').hide();
    $modal.find('#search-result-title-edit-error').hide();
    // 編集ボタン有効化
    $modal.find('button').removeAttr('disabled');
    // 検索結果登録名文字数の監視の有効化
    $modal.find('#form_title').data('submit-flag', 0);
  });


  /* 削除アイコン押下時 */
  $('.search-result-delete').on('click', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    var $search_result = JSON.parse($(this).siblings('.search-result-info').text());
    var $modal = $('#modal-search-result-delete');
    // hidden要素にidを格納させておく
    $modal.find('#form_id').val($search_result.id);
    $modal.foundation('reveal', 'open');
  });

  /* 削除ボタン押下時 */
  $('#form-search-result-delete').on('submit', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    // フォーム要素を取得
    var $form = $(this);
    // 編集ボタン要素を取得
    var $button = $form.find('button');

    $.ajax({
      url: $form.attr('action'),
      type: $form.attr('method'),
      data: $form.serialize(),
      dataType: 'json',
      cache: true,
      timeout: 60000,
      // 送信前処理
      beforeSend: function(xhr, settings){
        // 二重投稿防止
        $button.attr('disabled', true);
      }
    })
    .done(function(data, status, xhr){  // 成功時
      // 削除した検索結果のDOMを削除する
      var $search = $('table.search-result-title[data-id='+data.id+']').parent('li');
      $search.hide('slow', function(){ $search.remove(); });
      // -- 登録件数の処理 ここから --
      var $item_desc = $('#item-description');
      // 計〜件をデクリメントする
      var $total_items = $item_desc.find('#total-items');
      $total_items.text(
        $total_items.text().replace(/(\d+)/, function(match){
          return Number(match) - 1;
        })
      );
      // （x 件目 〜 y 件目）の数字を変更する
      // 1件以下の時は要素が存在しないのでチェックする
      if (document.getElementById('items-from-to') != null) {
        var $from_to = $item_desc.find('#items-from-to');
        var nums = $from_to.text().match(/(\d+)\D+(\d+)/);
        var from_num = Number(nums[1]);
        var to_num   = Number(nums[2]) -1;
        // 残り1件になった場合
        if (from_num === to_num) {
          $from_to.empty();
        } else {
          $from_to.text(
            $from_to.text().replace(/(\d+)(\D+)$/, function(match, p1, p2){
              return to_num + p2;
            })
          );
        }
      }
      // -- 登録件数の処理 ここまで --
      // モーダルを格納
      $('#modal-search-result-delete').foundation('reveal', 'close');
      $button.removeAttr('disabled');
    })
    .fail(function(xhr, status, errorThrown){  // 失敗時
      var $alert_box = $('#search-result-delete-error');
      var errorMessage = errorThrown;
      if (xhr.responseJSON != undefined && xhr.responseJSON.message != undefined) {
        errorMessage = xhr.responseJSON.message;
      }
      $alert_box.find('.error-message').empty().text(status + '：' + errorMessage);
      $alert_box.show('slow');
    });
  });

  /* 削除モーダル格納時 */
  $('#modal-search-result-delete').on('closed.fndtn.reveal', '', function(){
    var $modal = $('#modal-search-result-delete');
    $modal.find('#search-result-delete-error').hide();
    // 編集ボタン有効化
    $modal.find('button').removeAttr('disabled');
  });
};

},{"jquery":"jquery"}],4:[function(require,module,exports){
/**
 * ルーターの定義
 * ここではURLに対し実行する処理を定義する
 */
var Marionette = require('backbone.marionette');

module.exports = Marionette.AppRouter.extend({
  appRoutes: {
    ''      : 'top',
    'top'   : 'top',
    'mypage': 'mypage',
    'mypage/index': 'mypage'
  }
});

},{"backbone.marionette":"backbone.marionette"}],5:[function(require,module,exports){
var $ = require('jquery');
var SearchBox = require('./view/searchBox');

module.exports = function() {
  new SearchBox();
};

},{"./view/searchBox":7,"jquery":"jquery"}],6:[function(require,module,exports){
var _ = require('underscore');

module.exports = {
  loader: _.template(
    '<div id="over-lay"></div>' +
    '<div id="search-loader">' +
	    '<i class="fa fa-spinner fa-pulse"></i>' +
    '</div>'
  )
};

},{"underscore":"underscore"}],7:[function(require,module,exports){
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

},{"./searchLoader":8,"backbone.marionette":"backbone.marionette","jquery":"jquery"}],8:[function(require,module,exports){
/*
 * 検索実行時のローダー
 */
var $ = require('jquery');
var Marionette = require('backbone.marionette');
var template = require('./../template/loader');

module.exports = Marionette.ItemView.extend({
  el: '#show-loader',
  ui: {
    overLay: '#over-lay',
    searchLoader: '#search-loader'
  },
  template: template.loader,

  onRender: function() {
    this.bindUIElements();

    // オーバーレイ, ローダーの可視化
    this._centeringLoader();
    this.ui.overLay.fadeIn('normal');
    this.ui.searchLoader.fadeIn('normal');
  },

  // ウィンドウサイズの監視とセンタリング
  onResize: function() {
    this._centeringLoader();
  },

  // ローダーのセンタリング
  _centeringLoader: function() {
    var pxleft = ($(window).width() - this.ui.searchLoader.outerWidth(true)) / 2;
    var pxtop  = (window.innerHeight - this.ui.searchLoader.outerHeight(true)) / 2;

    this.ui.searchLoader.css({'left': pxleft + 'px'});
    this.ui.searchLoader.css({'top': pxtop + 'px'});
  }
});

},{"./../template/loader":6,"backbone.marionette":"backbone.marionette","jquery":"jquery"}]},{},[1]);
