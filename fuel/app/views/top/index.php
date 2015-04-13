<?php // タイトル ?>
<?php echo View::forge('element/title'); ?>

<?php // Maps ?>
<div class="row">
	<div class="large-12 columns">
	<?php if ($is_map_shown): ?>
		<?php
			$map_view = View::forge('element/map', array(
				'is_success' => $is_success,
				'map_class'  => 'map-top',
			));
			if ($is_success) {
				$map_view->set(array(
					'marker_info' => $marker_info,
					'search_co'   => $search_co,
				));
			}
			echo  $map_view;
		?>
	<?php endif; ?>
	</div>
</div>

<?php // エラーメッセージ ?>
<?php if ($message = Session::get_flash('error')): ?>
<div class="row">
	<div class="large-12 columns">
		<div data-alert class="alert-box alert round">
			<i class="fa fa-exclamation-triangle"></i> <?php echo $message; ?>
		</div>
	</div>
</div>
<?php endif; ?>


<?php // 検索フォーム ?>
<div class="search-area">
	<div class="row">
		<div class="large-7 columns">
		<?php echo View::forge('element/search_box'); ?>
		</div>
		<div class="large-5 columns">
		</div>
	</div>
</div>

<?php // 検索登録フォーム ?>
<?php if (isset($user) && isset($is_success)): ?>
<div class="search-register-area">
	<div class="row">
		<div class="large-7 columns">
			<?php echo View::forge('element/register_search_box'); ?>
		</div>
	</div>
</div>
<?php endif; ?>
