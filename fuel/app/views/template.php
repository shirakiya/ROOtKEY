<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title><?php echo $title; ?></title>
	<?php echo Asset::css('normalize.css'); ?>
	<?php echo Asset::css('foundation.css'); ?>
	<?php echo Asset::js('vendor/modernizr.js'); ?>
	<?php echo Asset::coffee('sample'); ?>
  </head>
  <body>
	<?php // ヘッダー ?>
	<?php echo View::forge('element/header', array(
		'user' => $user,
	)); ?>

	<?php echo $content; ?>

	<?php // フッター ?>
	<?php echo View::forge('element/footer'); ?>

	<?php echo Asset::js('vendor/jquery.js'); ?>
	<?php echo Asset::js('foundation.min.js'); ?>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>
