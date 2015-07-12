var Marionette = require('backbone.marionette');
var $ = require('jquery');
var foundation = require('foundation-sites');
var Template = require('./../template/index');

module.exports = Marionette.ItemView.extend({
  tagName: 'li',
  className: 'search-result-list',
  template: Template.listUnit,
  model: null,
  $editModal: null,

  ui: {
    title: '.search-result-title',
    editLink: '.search-result-edit',
    deleteLink: '.search-result-delete'
  },

  events: {
    'click @ui.editLink': 'edit',
    'click @ui.deleteLink': 'delete'
  },

  initialize: function() {
    this.bindUIElements();

    this.$editModal = $('#modal-search-result-title-edit');
    this.$deleteModal = $('#modal-search-result-delete');
  },

  // 編集モーダル表示
  edit: function(event) {
    event.preventDefault();
    // タイトル入力フォームにタイトルを入力させておく
    this.$editModal.find('#form_title').val(this.model.get('title'));
    this.$editModal.foundation('reveal', 'open');

    // 登録名監視のイベントをバインド
    this.$editModal.find('#form_title').keyup(this.observeEditInput);
    // 編集フォーム送信時のイベントをバインド
    this.$editModal.on('submit', {that: this}, this.editSubmit);
    // 編集モーダル格納時のイベントをバインド
    this.$editModal.on('closed.fndtn.reveal', this.closeEditModal);
  },

  // 登録名文字数の監視
  observeEditInput: function(event) {
    var $this = $(this);
    if ($this.data('submit-flag') != 1) {
      var count = $this.val().length;
      $button = $('#button-search-result-save');
      if (count > 0 && count <= 50) {
        $button.removeAttr('disabled');
      } else if (count == 0 || count > 50) {
        $button.attr('disabled', true);
      }
    }
  },

  //TODO: thisがeventオブジェクトを指してしまう問題
  editSubmit: function(event) {
    event.preventDefault();
    event.data.that.editConfirm()
  },

  // 編集実行
  editConfirm: function() {
    // 編集ボタン要素を取得
    var that = this;
    var $button = this.$editModal.find('button');
    this.model.set({title: this.$editModal.find('#form_title').val()});

    this.model.save(null, {
      url: '/api/search/save_title/' + this.model.get('id'),
      timeout: 60000,
      beforeSend: function() {
        // 二重投稿防止
        $button.attr('disabled', true);
      },
      success: function(model, response) {
        // 成功メッセージ表示
        that.$editModal.find('#search-result-title-edit-success').show('slow');
        // 登録名を動的に変更する
        that.ui.title.find('th').text(model.get('title'));
        // 登録名文字数監視の無効化
        that.$editModal.find('#form_title').data('submit-flag', 1)
      },
      error: function(model, response) {
        var $alertBox = that.$editModal.find('#search-result-title-edit-error');
        var errorMessage = response.statusText;
        if (response.responseJSON != undefined && response.responseJSON.message != undefined) {
          errorMessage = response.responseJSON.message;
        }
        $alertBox.find('.error-message').empty().text(errorMessage);
        $alertBox.show('slow');
      }
    });
  },

  // 編集モーダル格納時アクション
  closeEditModal: function() {
    var $editModal = $(this);
    // alert_box非表示
    $editModal.find('#search-result-title-edit-success').hide();
    $editModal.find('#search-result-title-edit-error').hide();
    // 編集ボタン有効化
    $editModal.find('button').removeAttr('disabled');
    // 検索結果登録名文字数の監視の有効化
    $editModal.find('#form_title').data('submit-flag', 0);

    // イベントバインドをoff
    $editModal.find('#form_title').off('keyup');
    $editModal.off('submit');
    $editModal.off('closed.fndtn.reveal');
  },

  // 削除モーダル表示
  delete: function(event) {
    event.preventDefault();
    this.$deleteModal.foundation('reveal', 'open');

    // 編集フォーム送信時のイベントをバインド
    this.$deleteModal.on('submit', {that: this}, this.deleteSubmit);
    // 編集モーダル格納時のイベントをバインド
    this.$deleteModal.on('closed.fndtn.reveal', this.closeDeleteModal);
  },

  //TODO: thisがeventオブジェクトを指してしまう問題
  deleteSubmit: function(event) {
    event.preventDefault();
    event.data.that.deleteConfirm();
  },

  // 削除実行
  deleteConfirm: function() {
    // 編集ボタン要素を取得
    var that = this;
    var $button = this.$deleteModal.find('button');

    this.model.destroy({
      url: '/api/search/delete/' + this.model.get('id'),
      timeout: 60000,
      beforeSend: function() {
        $button.attr('disabled', true);
      },
      success: function(model, response) {
        that.destroy();
      },
      error: function(model, response) {
        var $alertBox = that.$deleteModal.find('#search-result-delete-error');
        var errorMessage = response.statusText;
        if (response.responseJSON != undefined && response.responseJSON.message != undefined) {
          errorMessage = response.responseJSON.message;
        }
        $alertBox.find('.error-message').empty().text(errorMessage);
        $alertBox.show('slow');
      }
    });
  },

  onBeforeDestroy: function() {
    this.$deleteModal.foundation('reveal', 'close');
    this.$el.hide('slow');
  },

  // 削除モーダル格納時アクション
  closeDeleteModal: function() {
    var $deleteModal = $(this);
    $deleteModal.find('#search-result-delete-error').hide();
    // 編集ボタン有効化
    $deleteModal.find('button').removeAttr('disabled');

    // イベントバインドをoff
    $deleteModal.off('submit');
    $deleteModal.off('closed.fndtn.reveal');
  }
});
