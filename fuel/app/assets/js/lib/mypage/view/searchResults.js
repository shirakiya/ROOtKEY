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
