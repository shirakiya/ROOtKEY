<div id="mypage" class="row">
	<div class="large-12 columns">
		<div id="page-title">
			<h2><i class="fa fa-user"></i> マイページ</h2>
			<h5 class="subheader">ここでは過去の検索履歴が閲覧できます。クリックすると検索画面から結果が見られます。</h5>
		</div>

		<div class="pagination-centered">
			<?php echo $pagination->render(); ?>
		</div>

		<script type="application/json" id="search-result-total-items">
			<?php echo Format::forge($search_result_total_items)->to_json(); ?>
		</script>
		<script type="application/json" id="search-results-info">
			<?php echo Format::forge($searches)->to_json(); ?>
		</script>
		<div id="search-result-container">
			<div id="search-result-loader"><i class="fa fa-spinner fa-pulse"></i></div>
		</div>

		<div class="pagination-centered">
			<?php echo $pagination->render(); ?>
		</div>

	</div>
</div>

<?php // 編集モーダル ?>
<div id="modal-search-result-title-edit" class="reveal-modal small" data-reveal area-hidden="true">
	<h3><i class="fa fa-pencil"></i> 検索履歴の登録名を編集</h3>
	<div data-alert id="search-result-title-edit-success" class="alert-box success radius">
		<p>登録名を編集しました</p>
	</div>
	<div data-alert id="search-result-title-edit-error" class="alert-box alert radius">
		<p><i class="fa fa-exclamation-triangle"></i> 登録に失敗しました</p>
		<p class="error-message"></p>
	</div>
	<?php echo Form::open(array(
		'id'     => 'form-search-result-title-edit',
		'action' => Uri::create('api/search/save_title'),
		'method' => 'POST',
	)); ?>
		<label>新しいタイトル
			<?php echo Form::input('title', '', array(
				'placeholder'      => '検索履歴のタイトル',
				'data-submit-flag' => 0,
			)); ?>
		</label>
		<?php echo Form::hidden('id', ''); ?>
		<?php echo Form::button('', '編集', array(
			'id'    => 'button-search-result-save',
			'class' => 'button round right',
			'type'  => 'submit'
		)); ?>
	<?php echo Form::close(); ?>
</div>

<?php // 削除モーダル ?>
<div id="modal-search-result-delete" class="reveal-modal tiny" data-reveal area-hidden="true">
	<h3><i class="fa fa-trash"></i> 検索履歴の削除</h3>
	<div data-alert id="search-result-delete-error" class="alert-box alert radius">
		<i class="fa fa-exclamation-triangle"></i> 削除に失敗しました
		<p class="error-message"></p>
	</div>
	<?php echo Form::open(array(
		'id'     => 'form-search-result-delete',
		'action' => Uri::create('api/search/delete'),
		'method' => 'POST',
	)); ?>
		<p class="lead">検索履歴を削除します。よろしいですか？</p>
		<?php echo Form::hidden('id', ''); ?>
		<?php echo Form::button('', '削除', array(
			'id'    => 'button-search-result-delete',
			'class' => 'button round right',
			'type'  => 'submit'
		)); ?>
	<?php echo Form::close(); ?>
</div>
