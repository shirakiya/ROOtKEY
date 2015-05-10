$(function(){
  /* 編集アイコン押下時 */
  $('.search-result-edit').on('click', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    var $search_result = JSON.parse($(this).siblings('.search-result-info').text());
    var $modal = $('#modal-search-result-title-edit');
    // タイトル入力フォームにタイトルを入力させておく
    $('#form_title').val($search_result.title);
    // hidden要素にidを格納させておく
    $modal.find('#form_id').val($search_result.id);
    // モーダルの表示
    $modal.foundation('reveal', 'open');
  });

  // 検索結果登録名文字数の監視
  $('#form_title').keyup(function(){
    if ($(this).data('submit-flag') != 1) {
      var count = $(this).val().length;
      if (count > 0 && count <= 50) {
        $('#button-search-result-save').removeAttr('disabled');
      } else if (count == 0 || count > 50) {
        $('#button-search-result-save').attr('disabled', true);
      }
    }
  });

  /* 編集ボタン押下時 */
  $('#form-search-result-title-edit').on('submit', function(event){
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
      // 登録名を動的に変更する
      $('table[data-id='+data.id+']').find('th').text(data.title);
      // 検索結果登録名文字数の監視の無効化
      $form.find('#form_title').data('submit-flag', 1);
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
    // 検索結果登録名文字数の監視の有効化
    $modal.find('#form_title').data('submit-flag', 0);
  });


  /* 削除アイコン押下時 */
  $('.search-result-delete').on('click', function(event){
    // HTMLでの送信をキャンセル
    event.preventDefault();

    var $search_result = JSON.parse($(this).siblings('.search-result-info').text());
    var $modal = $('#modal-search-result-delete');
    // hidden要素にidを格納させておく
    $modal.find('#form_id').val($search_result.id);
    $modal.foundation('reveal', 'open');
  });

  /* 削除ボタン押下時 */
  $('#form-search-result-delete').on('submit', function(event){
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
      // 削除した検索結果のDOMを削除する
      var $search = $('table[data-id='+data.id+']').parent('li');
      $search.hide('slow', function(){ $search.remove(); });
      // -- 登録件数の処理 ここから --
      var $item_desc = $('#item-description');
      // 計〜件をデクリメントする
      var $total_items = $item_desc.find('#total-items');
      $total_items.text(
        $total_items.text().replace(/(\d+)/, function(match){
          return Number(match) - 1;
        })
      );
      // （x 件目 〜 y 件目）の数字を変更する
      // 1件以下の時は要素が存在しないのでチェックする
      if (document.getElementById('items-from-to') != null) {
        var $from_to = $item_desc.find('#items-from-to');
        var nums = $from_to.text().match(/(\d+)\D+(\d+)/);
        var from_num = Number(nums[1]);
        var to_num   = Number(nums[2]) -1;
        // 残り1件になった場合
        if (from_num === to_num) {
          $from_to.empty();
        } else {
          $from_to.text(
            $from_to.text().replace(/(\d+)(\D+)$/, function(match, p1, p2){
              return to_num + p2;
            })
          );
        }
      }
      // -- 登録件数の処理 ここまで --
      // モーダルを格納
      $('#modal-search-result-delete').foundation('reveal', 'close');
      $button.removeAttr('disabled');
    })
    .fail(function(xhr, status, errorThrown){  // 失敗時
      var $alert_box = $('#search-result-delete-error');
      $alert_box.find('.error-message').empty().text(status + '：' + errorThrown);
      $alert_box.show('slow');
    });
  });

  /* 削除モーダル格納時 */
  $('#modal-search-result-delete').on('closed.fndtn.reveal', '', function(){
    var $modal = $('#modal-search-result-title-edit');
    $modal.find('#search-result-delete-error').hide();
    // 編集ボタン有効化
    $modal.find('button').removeAttr('disabled');
  });
});
