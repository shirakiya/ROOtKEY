<div class="register-search-box">
<?php echo Form::open(array(
	'id'     => 'search-save',
	'action' => Uri::create('api/search/save'),
	'method' => 'post'
)); ?>
	<fieldset>
		<legend>検索結果の登録</legend>

		<h6 class="subheader">検索結果を登録しておくことで、マイページから過去に行った検索を簡単に再度検索することができます。</h6>
		<br>

		<caption><strong>登録内容</strong></caption>
		<table class="table-register-search">
			<tbody>
				<tr>
					<td><strong>出発地</strong></td>
					<td><?php echo $params['start']; ?></td>
				</tr>
				<tr>
					<td><strong>目的地</strong></td>
					<td><?php echo $params['end']; ?></td>
				</tr>
				<tr>
					<td><strong>検索ワード</strong></td>
					<td><?php echo $params['keyword']; ?></td>
				</tr>
				<tr>
					<td><strong>移動手段</strong></td>
					<td><?php echo __('app.mode.'.$params['mode']); ?></td>
				</tr>
				<tr>
					<td><strong>検索半径</strong></td>
					<td><?php echo $params['radius']; ?></td>
				</tr>
			</tbody>
		</table>

		<div class="row">
			<div class="large-12 columns">
				<div class="row">
					<div class="small-3 columns">
						<label for="form_title" class="right inline"><strong>登録名</strong></label>
					</div>
					<div class="small-9 columns">
						<?php echo Form::input('title', '', array(
							'placeholder'      => '検索結果の登録名を入力',
							'data-submit-flag' => 0,
						)); ?>
					</div>
				</div>
			<?php
				foreach ($params as $key => $param) {
					echo Form::hidden($key, $param);
				}
			?>
			<?php echo Form::button('', '<i class="fa fa-plus"></i> 登録', array(
				'id'       => 'button-search-save',
				'class'    => 'button round right',
				'type'     => 'submit',
				'disabled' => 'disabled'
			)); ?>
			</div>
		</div>
	</fieldset>
<?php echo Form::close(); ?>
</div>

<?php // 成功時メッセージモーダル ?>
<div id="success-modal" class="reveal-modal tiny" data-reveal>
	<div data-alert class="alert-box success radius">
		<i class="fa fa-check-circle"></i> 検索結果を登録しました
	</div>
	<a href="<?php echo Uri::create('/mypage'); ?>"><i class="fa fa-angle-double-right"></i> 検索結果を一覧で見る</a>
</div>

<?php // 失敗時メッセージモーダル ?>
<div id="failed-modal" class="reveal-modal tiny" data-reveal>
	<div data-alert class="alert-box alert radius">
		<i class="fa fa-exclamation-triangle"></i> 登録に失敗しました<br>
		<p class="error-message"></p>
	</div>
<div>
