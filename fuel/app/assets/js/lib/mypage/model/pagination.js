var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: function() {
    if (this.get('start_num')) {
      return '/api/search/count/' + this.get('start_num');
    } else {
      return '/api/search/count/';
    }
  },
  default: {
    'total_items': 0,
    'start_num': 0,
    'end_num': 0
  },

  parse: function(response) {
    return response.result;
  }
});
