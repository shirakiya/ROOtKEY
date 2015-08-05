var $ = require('jquery');
var Backbone = require('backbone');
var SearchResults = require('./view/searchResults');
var SearchResultsCollection = require('./collection/searchResults');

module.exports = function() {
  var searchResults = new SearchResults();
  searchResults.render();
};
