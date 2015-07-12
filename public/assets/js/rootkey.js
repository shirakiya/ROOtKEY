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

},{"./lib/mainController":2,"./lib/router":11,"backbone":"backbone","backbone.marionette":"backbone.marionette","foundation-sites":"foundation-sites","jquery":"jquery","underscore":"underscore"}],2:[function(require,module,exports){
/**
 * コントローラーオブジェクトの定義
 * ここではrouterが命令した処理に対して実処理を定義する
 */
module.exports = {
  top: require('./top/controller'),
  mypage: require('./mypage/controller')
};

},{"./mypage/controller":4,"./top/controller":12}],3:[function(require,module,exports){
var Backbone = require('backbone');
var SearchResultModel = require('./../model/searchResult');

module.exports = Backbone.Collection.extend({
  url: null,
  model: SearchResultModel
});

},{"./../model/searchResult":6,"backbone":"backbone"}],4:[function(require,module,exports){
var $ = require('jquery');
var Backbone = require('backbone');
var SearchResults = require('./view/searchResults');
var SearchResultsCollection = require('./collection/searchResults');

module.exports = function() {
  var searchResults = new SearchResults();
  searchResults.render();
};

},{"./collection/searchResults":3,"./view/searchResults":10,"backbone":"backbone","jquery":"jquery"}],5:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: function() {
    if (this.get('start_num')) {
      return '/api/search/count/' + this.get('start_num');
    } else {
      return '/api/search/count/';
    }
  },
  default: {
    'total_items': 0,
    'start_num': 0,
    'end_num': 0
  },

  parse: function(response) {
    return response.result;
  }
});

},{"backbone":"backbone"}],6:[function(require,module,exports){
var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: null,
  default: {
    id: '',
    user_id: '',
    title: '',
    start: '',
    end: '',
    keyword: '',
    mode: '',
    radius: '',
    search_url: '',
    google_maps_img_url: '',
  }
});

},{"backbone":"backbone"}],7:[function(require,module,exports){
var _ = require('underscore');

module.exports = {
  listContainer: _.template(
		'<div id="item-description">' +
			'<span class="info label">登録件数</span> ' +
			'<span id="total-items">計 <%= total_items %> 件</span>' +
		  '<% if(total_items > 1){ %><span id="items-from-to">（<%= start_num %> 件目 〜 <%= end_num %> 件目）</span><% } %>' +
		'</div>' +
	  '<ul id="search-result-lists" class="small-block-grid-1 medium-block-grid-2 large-block-grid-3">' +
    '</ul>'
  ),
  listUnit: _.template(
    '<table class="search-result-title" data-id=<%= id %>>' +
    	'<thead>' +
    		'<tr>' +
    			'<th><%- title %></th>' +
    		'</tr>' +
    	'</thead>' +
    '</table>' +
    '<a href="<%= search_url %>">' +
    	'<img class="th" src="<%= google_maps_img_url %>">' +
    '</a>' +
    '<table class="search-result-detail">' +
    	'<tbody>' +
    		'<tr>' +
    			'<td colspan=2>' +
    				'<a href="<%- search_url %>" class="button small radius">' +
    					'<i class="fa fa-share"></i> 検索結果を表示する' +
    				'</a>' +
    			'</td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>出発地</strong></td>' +
    			'<td><%- start %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>目的地</strong></td>' +
    			'<td><%- end %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>検索ワード</strong></td>' +
    			'<td><%- keyword %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>移動手段</strong></td>' +
    			'<td><%= mode %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>検索半径</strong></td>' +
    			'<td><%= radius %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td colspan=2>' +
    				'<a href="#" class="search-result-delete"><i class="fa fa-trash"></i></a>' +
    				'<a href="#" class="search-result-edit"><i class="fa fa-pencil-square-o"></i></a>' +
    			'</td>' +
    		'</tr>' +
    	'</tbody>' +
    '</table>'
  ),
  empty:
	  '<div data-alert class="alert-box warning radius">' +
		  '<strong><i class="fa fa-exclamation-circle"></i> 検索履歴が登録されていません。</strong>' +
			'<br>' +
			'検索結果を登録することで、再び検索条件を入力することなくすぐに検索結果にアクセスできるようになります。' +
		'</div>'
};

},{"underscore":"underscore"}],8:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var Template = require('./../template/index');

module.exports = Marionette.ItemView.extend({
  tagName: 'div',
  className: 'alert-box warning radius',
  template: Template.empty
});

},{"./../template/index":7,"backbone.marionette":"backbone.marionette"}],9:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var foundation = require('foundation-sites');
var Template = require('./../template/index');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'search-result-list',
  template: Template.listUnit,
  model: null,
  $editModal: null,

  ui: {
    title: '.search-result-title',
    editLink: '.search-result-edit',
    deleteLink: '.search-result-delete'
  },

  events: {
    'click @ui.editLink': 'edit',
    'click @ui.deleteLink': 'delete'
  },

  initialize: function() {
    this.bindUIElements();

    this.$editModal = $('#modal-search-result-title-edit');
    this.$deleteModal = $('#modal-search-result-delete');
  },

  // 編集モーダル表示
  edit: function(event) {
    event.preventDefault();
    // タイトル入力フォームにタイトルを入力させておく
    this.$editModal.find('#form_title').val(this.model.get('title'));
    this.$editModal.foundation('reveal', 'open');

    // 登録名監視のイベントをバインド
    this.$editModal.find('#form_title').keyup(this.observeEditInput);
    // 編集フォーム送信時のイベントをバインド
    this.$editModal.on('submit', {that: this}, this.editSubmit);
    // 編集モーダル格納時のイベントをバインド
    this.$editModal.on('closed.fndtn.reveal', this.closeEditModal);
  },

  // 登録名文字数の監視
  observeEditInput: function(event) {
    var $this = $(this);
    if ($this.data('submit-flag') != 1) {
      var count = $this.val().length;
      $button = $('#button-search-result-save');
      if (count > 0 && count <= 50) {
        $button.removeAttr('disabled');
      } else if (count == 0 || count > 50) {
        $button.attr('disabled', true);
      }
    }
  },

  //TODO: thisがeventオブジェクトを指してしまう問題
  editSubmit: function(event) {
    event.preventDefault();
    event.data.that.editConfirm()
  },

  // 編集実行
  editConfirm: function() {
    // 編集ボタン要素を取得
    var that = this;
    var $button = this.$editModal.find('button');
    this.model.set({title: this.$editModal.find('#form_title').val()});

    this.model.save(null, {
      url: '/api/search/save_title/' + this.model.get('id'),
      timeout: 60000,
      beforeSend: function() {
        // 二重投稿防止
        $button.attr('disabled', true);
      },
      success: function(model, response) {
        // 成功メッセージ表示
        that.$editModal.find('#search-result-title-edit-success').show('slow');
        // 登録名を動的に変更する
        that.ui.title.find('th').text(model.get('title'));
        // 登録名文字数監視の無効化
        that.$editModal.find('#form_title').data('submit-flag', 1)
      },
      error: function(model, response) {
        var $alertBox = that.$editModal.find('#search-result-title-edit-error');
        var errorMessage = response.statusText;
        if (response.responseJSON != undefined && response.responseJSON.message != undefined) {
          errorMessage = response.responseJSON.message;
        }
        $alertBox.find('.error-message').empty().text(errorMessage);
        $alertBox.show('slow');
      }
    });
  },

  // 編集モーダル格納時アクション
  closeEditModal: function() {
    var $editModal = $(this);
    // alert_box非表示
    $editModal.find('#search-result-title-edit-success').hide();
    $editModal.find('#search-result-title-edit-error').hide();
    // 編集ボタン有効化
    $editModal.find('button').removeAttr('disabled');
    // 検索結果登録名文字数の監視の有効化
    $editModal.find('#form_title').data('submit-flag', 0);

    // イベントバインドをoff
    $editModal.find('#form_title').off('keyup');
    $editModal.off('submit');
    $editModal.off('closed.fndtn.reveal');
  },

  // 削除モーダル表示
  delete: function(event) {
    event.preventDefault();
    this.$deleteModal.foundation('reveal', 'open');

    // 編集フォーム送信時のイベントをバインド
    this.$deleteModal.on('submit', {that: this}, this.deleteSubmit);
    // 編集モーダル格納時のイベントをバインド
    this.$deleteModal.on('closed.fndtn.reveal', this.closeDeleteModal);
  },

  //TODO: thisがeventオブジェクトを指してしまう問題
  deleteSubmit: function(event) {
    event.preventDefault();
    event.data.that.deleteConfirm();
  },

  // 削除実行
  deleteConfirm: function() {
    // 編集ボタン要素を取得
    var that = this;
    var $button = this.$deleteModal.find('button');

    this.model.destroy({
      url: '/api/search/delete/' + this.model.get('id'),
      timeout: 60000,
      beforeSend: function() {
        $button.attr('disabled', true);
      },
      success: function(model, response) {
        that.destroy();
      },
      error: function(model, response) {
        var $alertBox = that.$deleteModal.find('#search-result-delete-error');
        var errorMessage = response.statusText;
        if (response.responseJSON != undefined && response.responseJSON.message != undefined) {
          errorMessage = response.responseJSON.message;
        }
        $alertBox.find('.error-message').empty().text(errorMessage);
        $alertBox.show('slow');
      }
    });
  },

  onBeforeDestroy: function() {
    this.$deleteModal.foundation('reveal', 'close');
    this.$el.hide('slow');
  },

  // 削除モーダル格納時アクション
  closeDeleteModal: function() {
    var $deleteModal = $(this);
    $deleteModal.find('#search-result-delete-error').hide();
    // 編集ボタン有効化
    $deleteModal.find('button').removeAttr('disabled');

    // イベントバインドをoff
    $deleteModal.off('submit');
    $deleteModal.off('closed.fndtn.reveal');
  }
});

},{"./../template/index":7,"backbone.marionette":"backbone.marionette","foundation-sites":"foundation-sites","jquery":"jquery"}],10:[function(require,module,exports){
var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');

var Template = require('./../template/index');
var SearchResultView = require('./searchResult');
var EmptyView = require('./empty');

var SearchResultsCollection = require('./../collection/searchResults');
var PaginationModel = require('./../model/pagination');

module.exports = Marionette.CompositeView.extend({
  el: 'div#search-result-container',
  template: Template.listContainer,
  model: null,
  collection: null,

  childView: SearchResultView,
  childViewContainer: 'ul#search-result-lists',

  emptyView: EmptyView,

  initialize: function() {
    // ページング情報jsonをModelに変換
    var jsonPagination = JSON.parse($('#pagination-info').text());
    this.model = new PaginationModel(jsonPagination);

    // 検索結果jsonをCollectionに変換
    var jsonSearchResults = JSON.parse($('#search-results-info').text());
    this.collection = new SearchResultsCollection(jsonSearchResults);
  },

  onRemoveChild: function() {
    var that = this;
    var itemCount = this.collection.length;

    this.model.fetch({
      success: function(model, response) {
        // 全検索結果登録数から表示されている最後の件数を引いた時に余りがある場合はもう1件取得する
        if (model.get('total_items') - model.get('end_num') > 0) {
          that.addSearchResult();
        }
        // 表示すべき最後の件数が9の倍数の場合は1つ下のページにリダイレクトする
        else if (model.get('end_num') % 9 == 0) {
          var url = document.URL;
          if (url.test(/\/\d+$/)) {
            url.replace(/\/(\d+)/, function(match) {
              var resource = match - 1;
              return '/' + resource;
            });
          }
          location.href = url;
        }
      },
      error: function(modal, response) {
        //TODO: エラー処理
      }
    });
  },

  addSearchResult: function() {
    console.log('addSearchResult');
    console.log(this);
  }
});

},{"./../collection/searchResults":3,"./../model/pagination":5,"./../template/index":7,"./empty":8,"./searchResult":9,"backbone":"backbone","backbone.marionette":"backbone.marionette","jquery":"jquery"}],11:[function(require,module,exports){
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

},{"backbone.marionette":"backbone.marionette"}],12:[function(require,module,exports){
var $ = require('jquery');
var SearchBox = require('./view/searchBox');

module.exports = function() {
  new SearchBox();
};

},{"./view/searchBox":14,"jquery":"jquery"}],13:[function(require,module,exports){
var _ = require('underscore');

module.exports = {
  loader: _.template(
    '<div id="over-lay"></div>' +
    '<div id="search-loader">' +
	    '<i class="fa fa-spinner fa-pulse"></i>' +
    '</div>'
  )
};

},{"underscore":"underscore"}],14:[function(require,module,exports){
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

},{"./searchLoader":15,"backbone.marionette":"backbone.marionette","jquery":"jquery"}],15:[function(require,module,exports){
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

},{"./../template/loader":13,"backbone.marionette":"backbone.marionette","jquery":"jquery"}]},{},[1]);
