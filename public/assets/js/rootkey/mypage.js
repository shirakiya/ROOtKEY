$(function(){
  /* 編集アイコン押下時 */
  $('.search-result-edit').on('click', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    var $search_result = JSON.parse($(this).siblings('.search-result-info').text());
    // タイトル入力フォームにタイトルを入力させておく
    $('#form_title').val($search_result.title);
    // hidden要素にidを格納させておく
    $('#form_id').val($search_result.id);
    // モーダルの表示
    $('#modal-search-result-title-edit').foundation('reveal', 'open');
  });

  /* 編集ボタン押下時 */
  $('#search-result-title-edit').on('submit', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    // フォーム要素を取得
    var $form = $(this);
    // 編集ボタン要素を取得
    var $button = $form.find('button');

    $.ajax({
      url: $form.attr('action'),
      type: $form.attr('method'),
      data: $form.serialize(),
      dataType: 'json',
      cache: true,
      timeout: 60000,
      // 送信前処理
      beforeSend: function(xhr, settings){
        // 二重投稿防止
        $button.attr('disabled', true);
      }
    })
    .done(function(data, status, xhr){  // 成功時
      $('#search-result-title-edit-success').show('slow');
    })
    .fail(function(xhr, status, errorThrown){  // 失敗時
      var $alert_box = $('#search-result-title-edit-error');
      $alert_box.find('.error-message').empty().text(status + '：' + errorThrown);
      $alert_box.show('slow');
    });
  });

  /* 編集モーダル格納時アクション */
  $('#modal-search-result-title-edit').on('closed.fndtn.reveal', '', function(){
    var $modal = $('#modal-search-result-title-edit');
    // alert_box非表示
    $modal.find('#search-result-title-edit-success').hide();
    $modal.find('#search-result-title-edit-error').hide();
    // 編集ボタン有効化
    $modal.find('button').removeAttr('disabled');
  });

  /* 削除アイコン押下時 */
  /* 削除ボタン押下時 */
});
