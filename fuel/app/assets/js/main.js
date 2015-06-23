'use strict';

var $ = require('jquery');
var jQuery = $;
var foundation = require('foundation-sites');
var _ = require('underscore');
var Backbone = require('backbone');
Backbone.$ = $;
var Marionette = require('backbone.marionette');

var app = new Marionette.Application();
app.addRegions({
  body: 'body',
  header: '#header',
  content: '#content',
  footer: '#footer'
});

app.addInitializer(function(){
  $(document).foundation();
  console.log('hoge');
  console.log(app.body);
});

app.start();
