$(function(){
  // 検索結果タイトル文字数の監視
  $('#form_title').keyup(function(){
    var count = $(this).val().length;
    if (count > 0 && count <= 50) {
      $('#button-search-save').removeAttr('disabled');
    } else if (count == 0 || count > 50) {
      $('#button-search-save').attr('disabled', true);
    }
  });

  // 検索結果保存Ajax
  $('#search-save').on('submit', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    // 対象のフォーム要素を取得
    var $form = $(this);
    // 登録ボタン要素を取得
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
      $('#success-modal').foundation('reveal', 'open');
    })
    .fail(function(xhr, status, errorThrown){  // 失敗時
      $('#failed-modal .error-message').text(status + '：' + errorThrown);
      $('#failed-modal').foundation('reveal', 'open');
    });
  });
});
