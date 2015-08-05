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
