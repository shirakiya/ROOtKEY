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
var mainController = require('./lib/mainController');

app.addInitializer(function() {
  // foundationの初期化
  $(document).foundation();

  new Router({ controller: mainController });
  Backbone.history.start({pushState: true});
});

app.start();
