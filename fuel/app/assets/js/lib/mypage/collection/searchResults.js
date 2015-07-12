var Backbone = require('backbone');
var SearchResultModel = require('./../model/searchResult');

module.exports = Backbone.Collection.extend({
  url: null,
  model: SearchResultModel
});
