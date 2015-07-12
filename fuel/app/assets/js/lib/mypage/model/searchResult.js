var Backbone = require('backbone');

module.exports = Backbone.Model.extend({
  urlRoot: null,
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
  }
});
