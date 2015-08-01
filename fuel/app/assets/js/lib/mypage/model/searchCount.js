var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: null,
  default: {
    'total_items': 0,
  }
});
