<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title><?php echo $title; ?></title>
		<?php echo Asset::css('normalize.css'); ?>
		<?php echo Asset::css('foundation.css'); ?>
		<?php echo Asset::css('font-awesome-4.3.0/css/font-awesome.min.css'); ?>
		<?php echo Asset::css('rootkey.css'); ?>
		<?php echo Asset::js('vendor/modernizr.js'); ?>
	</head>
	<body>
		<?php // ヘッダー ?>
		<?php echo View::forge('element/header', array(
			'user' => $user,
		)); ?>

		<div class="content">
			<?php echo $content; ?>
		</div>

		<?php // フッター ?>
		<?php echo View::forge('element/footer'); ?>

		<?php echo Asset::js('vendor/jquery.js'); ?>
		<?php echo Asset::js('foundation.min.js'); ?>
		<?php echo Asset::js(Config::get('app.maps_api.places')); ?>
		<?php echo Asset::js('rootkey/autocomplete.js'); ?>
	<?php if ($is_map_shown): ?>
		<?php echo Asset::js('rootkey/maps.js'); ?>
		<?php echo Asset::js('rootkey/search_save.js'); ?>
	<?php endif; ?>
		<script>$(document).foundation();</script>
	</body>
</html>
