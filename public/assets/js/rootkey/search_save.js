$(function(){
  // submitを拾う
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
      // 成功したバナーを表示させる
    })
    .fail(function(xhr, status, errorThrown){  // 失敗時
      console.log(xhr);
      alert(status + '：' + errorThrown);
    });
  });
});
