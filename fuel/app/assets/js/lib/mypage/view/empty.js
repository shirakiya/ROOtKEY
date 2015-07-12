var Marionette = require('backbone.marionette');
var Template = require('./../template/index');

module.exports = Marionette.ItemView.extend({
  tagName: 'div',
  className: 'alert-box warning radius',
  template: Template.empty
});
