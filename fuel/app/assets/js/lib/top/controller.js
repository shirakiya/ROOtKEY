var $ = require('jquery');
var SearchBox = require('./view/searchBox');
var RegisterBox = require('./view/registerBox');

module.exports = function() {
  new SearchBox();

  if (document.getElementById('register-search-box') != null) {
    new RegisterBox();
  }
};
