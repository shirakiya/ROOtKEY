<div class="row">
	<div class="large-12 columns">
		<h2>マイページ</h2>
		<h5 class="subheader">　ここでは過去の検索履歴が閲覧できます。クリックすると検索画面から結果が見られます。</h5>

		<hr>

		<div>
			<span class="info label"><?php echo __('app.pagination.count_save'); ?></span>
			<?php echo __('app.pagination.total_items', array('param' => $pagination->total_items)); ?>
		<?php if ($pagination->total_items > 1): ?>
			<?php
				echo __('app.pagination.from_to', array(
					'from' => $pagination->get_start_num(),
					'to'   => $pagination->get_end_num(),
				));
			?>
		<?php endif; ?>
		</div>
		<div class="pagination-centered">
			<?php echo $pagination->render(); ?>
		</div>

		<ul class="small-block-grid-1 medium-block-grid-2 large-block-grid-3">
		<?php foreach ($searches as $search): ?>
			<li class="list-mypage">
				<a href="<?php echo Uri::create('top'); ?>">
					<img class="th" src="<?php echo Googlemaps::get_static_image_url($search['start'], $search['end']); ?>">
				</a>
				<table class="table-mypage">
					<tbody>
						<tr>
							<td colspan=2>
								<a href="<?php echo Uri::create('top'); ?>" class="button smalj radius">
									<i class="fa fa-share"></i> 検索結果を表示する
								</a>
							</td>
						</tr>
						<tr>
							<td class="grid-3"><strong>出発地</strong></td>
							<td><?php echo $search['start']; ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>目的地</strong></td>
							<td><?php echo $search['end']; ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>検索ワード</strong></td>
							<td><?php echo $search['keyword']; ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>移動手段</strong></td>
							<td><?php echo __('app.mode.'.Model_Search::get_mode_string($search['mode'])); ?></td>
						</tr>
						<tr>
							<td class="grid-3"><strong>検索半径</strong></td>
							<td><?php echo $search['radius']; ?></td>
						</tr>
					</tbody>
				</table>
			</li>
		<?php endforeach; ?>
		</ul>

		<div class="pagination-centered">
			<?php echo $pagination->render(); ?>
		</div>

	</div>
</div>
