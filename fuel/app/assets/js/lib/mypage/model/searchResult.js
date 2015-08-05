var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: 'api/search/prev_one/',
  default: {
    id: '',
    user_id: '',
    title: '',
    start: '',
    end: '',
    keyword: '',
    mode: '',
    radius: '',
    search_url: '',
    google_maps_img_url: '',
  },

  parse: function(response) {
    if (response.data != null) {
      return response.data;
    }
  }
});
