var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'api/search/save',
  default: {
    title: '',
    start: '',
    end: '',
    keyword: '',
    mode: '',
    radius: 0
  },

  parse: function(response) {
    if (response.data != null) {
      return response.data;
    }
  }
});
