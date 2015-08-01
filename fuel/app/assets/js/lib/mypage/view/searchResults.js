var Marionette = require('backbone.marionette');
var Backbone = require('backbone');
var $ = require('jquery');

var Template = require('./../template/index');
var SearchResultView = require('./searchResult');
var EmptyView = require('./empty');

var SearchResultModel = require('./../model/searchResult');
var SearchResultsCollection = require('./../collection/searchResults');
var SearchCountModel = require('./../model/searchCount');

module.exports = Marionette.CompositeView.extend({
  el: 'div#search-result-container',
  template: Template.listContainer,
  model: SearchCountModel,
  collection: SearchResultsCollection,

  childView: SearchResultView,
  childViewContainer: 'ul#search-result-lists',

  emptyView: EmptyView,

  initialize: function() {
    // 検索結果情報jsonをModelに変換
    var jsonSearchResultTotalItems = JSON.parse($('#search-result-total-items').text());
    this.model = new SearchCountModel(jsonSearchResultTotalItems);

    // 検索結果jsonをCollectionに変換
    var jsonSearchResults = JSON.parse($('#search-results-info').text());
    this.collection = new SearchResultsCollection(jsonSearchResults);
    this.listenTo(this.collection, 'remove', this.removeSearchResult);
    this.listenTo(this.collection, 'add', this.addSearchResult);
  },

  // 削除後の検索履歴総数更新, リダイレクト
  onRemoveChild: function() {
    var count = this.model.get('total_items') - 1;
    this.model.set('total_items', count);
    this.$el.find('#total-items').text('計 ' + count + ' 件');
  },

  // 検索履歴を削除した時の追加分の取得
  removeSearchResult: function() {
    var self = this;
    var itemCount = this.collection.length;

    if (this.collection.length === 0) {
      location.reload();
      return;
    }

    // 今現在のCollectionの最後のModelのIDを取得する
    var lastModelId = this.collection.models[itemCount-1].get('id');

    var addedModel = new SearchResultModel();
    var url = addedModel.url() + lastModelId;

    addedModel.fetch({
      url: url,
      success: function(model, response) {
        if (response.data != null) {
          self.collection.add(model);
        }
      },
      error: function(model, response) {
        //TODO: エラー処理
      }
    });
  }
});
