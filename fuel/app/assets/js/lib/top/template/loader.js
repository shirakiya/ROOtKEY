var _ = require('underscore');

module.exports = {
  loader: _.template(
    '<div id="over-lay"></div>' +
    '<div id="search-loader">' +
	    '<i class="fa fa-spinner fa-pulse"></i>' +
    '</div>'
  )
};
