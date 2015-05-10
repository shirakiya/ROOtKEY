<div class="row">
	<div class="large-12 columns">
		<h2><i class="fa fa-user"></i> マイページ</h2>
		<h5 class="subheader">ここでは過去の検索履歴が閲覧できます。クリックすると検索画面から結果が見られます。</h5>

		<hr>

		<div id="item-description">
			<span class="info label"><?php echo __('app.pagination.count_save'); ?></span>
			<span id="total-items">
				<?php echo __('app.pagination.total_items', array('param' => $pagination->total_items)); ?>
			</span>
		<?php if ($pagination->total_items > 1): ?>
			<span id="items-from-to">
				<?php
					echo __('app.pagination.from_to', array(
						'from' => $pagination->get_start_num(),
						'to'   => $pagination->get_end_num(),
					));
				?>
			</span>
		<?php endif; ?>
		</div>
		<div class="pagination-centered">
			<?php echo $pagination->render(); ?>
		</div>

		<ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-3">
	<?php if (empty($searches)): ?>
		<div data-alert class="alert-box warning radius">
			<strong><i class="fa fa-exclamation-circle"></i> 検索履歴が登録されていません。</strong>
			<br>
			検索結果を登録することで、再び検索条件を入力することなくすぐに検索結果にアクセスできるようになります。
		</div>
	<?php else: ?>
		<?php foreach ($searches as $search): ?>
			<li class="list-mypage">
				<table class="table-mypage" data-id="<?php echo $search->id; ?>">
					<thead>
						<tr>
							<th>
								<?php echo $search->title; ?>
							</th>
						</tr>
					</thead>
				</table>

				<a href="<?php echo $search->create_search_url_with_params(); ?>">
					<img class="th" src="<?php echo Googlemaps::get_static_image_url($search->start, $search->end); ?>">
				</a>

				<table class="table-mypage">
					<tbody>
						<tr>
							<td colspan=2>
								<a href="<?php echo $search->create_search_url_with_params(); ?>" class="button small radius">
									<i class="fa fa-share"></i> 検索結果を表示する
								</a>
							</td>
						</tr>
						<tr>
							<td class="grid-3"><strong>出発地</strong></td>
							<td><?php echo $search->start; ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>目的地</strong></td>
							<td><?php echo $search->end; ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>検索ワード</strong></td>
							<td><?php echo $search->keyword; ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>移動手段</strong></td>
							<td><?php echo __('app.mode.'.$search->convert_mode_to_string()); ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>検索半径</strong></td>
							<td><?php echo __('app.radius.km.'.$search->radius); ?></td>
						</tr>
						<tr>
							<td colspan=2>
								<a href="#" class="search-result-delete"><i class="fa fa-trash"></i></a>
								<a href="#" class="search-result-edit"><i class="fa fa-pencil-square-o"></i></a>
								<script type="application/json" class="search-result-info">
									<?php echo Format::forge($search->get_assoc_array(array('id', 'title')))->to_json(); ?>
								</script>
							</td>
						</tr>
					</tbody>
				</table>
			</li>
		<?php endforeach; ?>
	<?php endif; ?>
		</ul>

		<div class="pagination-centered">
			<?php echo $pagination->render(); ?>
		</div>

	</div>
</div>

<?php // 編集モーダル ?>
<div id="modal-search-result-title-edit" class="reveal-modal small" data-reveal area-hidden="true">
	<h3><i class="fa fa-pencil"></i> 検索履歴の登録名を編集</h3>
	<div data-alert id="search-result-title-edit-success" class="alert-box success radius">
		登録名を編集しました
	</div>
	<div data-alert id="search-result-title-edit-error" class="alert-box alert radius">
		<i class="fa fa-exclamation-triangle"></i> 登録に失敗しました
		<p class="error-message"></p>
	</div>
	<?php echo Form::open(array(
		'id'     => 'search-result-title-edit',
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
