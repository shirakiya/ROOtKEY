var $ = require('jquery');
var Marionette = require('backbone.marionette');
var foundation = require('foundation-sites');
var SearchResultModel = require('./../model/searchResult');

module.exports = Marionette.ItemView.extend({
  el: '#register-search-box',
  ui: {
    searchSaveForm: '#search-save',
    formTitle: '#form_title',
    formButton: '#button-search-save',
    successModal: '#success-modal',
    failedModal: '#failed-modal'
  },
  template: false,
  model: null,

  events: {
    'submit @ui.searchSaveForm': 'submitForm'
  },

  initialize: function() {
    this.bindUIElements();
    this._observeInput();

    this.model = new SearchResultModel({
      start: this.ui.searchSaveForm.find('#form_start').val(),
      end: this.ui.searchSaveForm.find('#form_end').val(),
      keyword: this.ui.searchSaveForm.find('#form_keyword').val(),
      mode: this.ui.searchSaveForm.find('#form_mode').val(),
      radius: this.ui.searchSaveForm.find('#form_radius').val(),
    });
  },

  _observeInput: function() {
    var self = this;

    this.ui.formTitle.keyup(function() {
      if ($(this).data('submit-flag') != 1) {  // 一度も保存していない場合に限り有効
        var count = $(this).val().length;

        if (count > 0 && count <= 50) {
          self.ui.formButton.removeAttr('disabled');
        } else if (count === 0 || count > 50) {
          self.ui.formButton.attr('disabled', true);
        }
      }
    });
  },

  submitForm: function(event) {
    event.preventDefault();
    this.ui.searchSaveForm.blur();
    var self = this;

    this.model.set({title: this.ui.formTitle.val()});
    var url = this.model.url();

    this.model.save({}, {
      url: url,
      timeout: 60000,
      beforeSend: function() {
        self.ui.formButton.attr('disabled', true);
      },
      success: function(model, response) {
        self.ui.successModal.foundation('reveal', 'open');
        self.ui.formTitle.data('submit-flag', 1);
      },
      error: function(model, response) {
        if (response.responseJSON instanceof Object && response.responseJSON.message != null) {
          self.ui.failedModal.find('.error-message').text(response.responseJSON.message);
        }
        self.ui.failedModal.foundation('reveal', 'open');
      }
    });
  }
});
