<?php // タイトル ここから ?>
<div id="top">
	<div id="title" class="row">
		<div class="large-12 columns">
			<div class="text-center">
				<h1>ROOtKEY</h1>
				<h5>For Your Happiness Through Your Own Way.</h5>
				<h5>あなたのルートにある探し物に出会えるアプリケーション</h5>
			</div>
		</div>
	</div><?php // タイトル ここまで ?>

	<?php // Maps ここから ?>
	<div id="search-show-map" class="row">
		<div class="large-12 columns">
		<?php if ($is_map_shown): ?>
			<?php if ($is_success): ?>
				<script type="application/json" id="marker_info"><?php echo Format::forge($marker_info)->to_json(); ?></script>
				<?php /* ?>
				<script type="application/json" id="search_co"><?php echo Format::forge($search_co)->to_json(); ?></script>
				<?php */ ?>
			<?php endif; ?>
			<div id="map_canvas"></div>
		<?php endif; ?>
		</div>
	</div><?php // Maps ここまで ?>

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

	<div id="top-below-map">
		<div class="row">
			<?php // 左カラム ?>
			<div id="top-left" class="large-7 columns">
				<?php echo View::forge('element/search_box'); // 検索フォーム ?>
			<?php if (isset($user) && isset($is_success)): // 検索登録フォーム ?>
				<?php echo View::forge('element/register_search_box'); ?>
			<?php endif; ?>
			</div>

			<?php // 右カラム ?>
			<div id="top-right" class="large-5 columns">
			<?php if (isset($is_success)): // 検索結果詳細 ?>
				<?php echo View::forge('element/search_result_detail.php'); ?>
			<?php else: // トップヘルプ ?>
				<?php echo View::forge('element/top_help.php'); ?>
			<?php endif; ?>
			</div>
		</div>
	</div>
</div>
