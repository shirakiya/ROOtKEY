<?php // タイトル ここから ?>
<div class="rootkey-title">
	<div class="row">
		<div class="large-12 columns">
			<div class="text-center">
				<h1>ROOtKEY</h1>
				<p>
					For Your Happiness Through Your Own Way.<br>
					あなたのルートにある探し物に出会えるアプリケーション
				</p>
			</div>
		</div>
	</div>
</div><?php // タイトル ここまで ?>

<?php // Maps ここから ?>
<div class="row">
	<div class="large-12 columns">
	<?php if ($is_map_shown): ?>
		<?php if ($is_success): ?>
			<script type="application/json" id="marker_info"><?php echo Format::forge($marker_info)->to_json(); ?></script>
			<script type="application/json" id="search_co"><?php echo Format::forge($search_co)->to_json(); ?></script>
		<?php endif; ?>
		<div id="map_canvas" class="map-top"></div>
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

<?php // 左カラム ?>
<div class="search-area">
	<div class="row">
		<div class="large-7 columns">
		<?php // 検索フォーム ?>
			<?php echo View::forge('element/search_box'); ?>
		<?php // 検索登録フォーム ?>
		<?php if (isset($user) && isset($is_success)): ?>
			<div class="search-register-area">
				<?php echo View::forge('element/register_search_box'); ?>
			</div>
		<?php endif; ?>
		</div>

		<?php // 右カラム ?>
		<div class="large-5 columns">
		</div>
	</div>
</div>

<?php // 検索ローダー ?>
<div id="search-loader">
	<i class="fa fa-spinner fa-pulse"></i>
</div>

