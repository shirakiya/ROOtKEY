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
