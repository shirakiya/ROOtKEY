<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>500エラー | ROOtKEY</title>
	<?php echo Asset::css('normalize.css'); ?>
	<?php echo Asset::css('foundation.css'); ?>
	<?php echo Asset::js('vendor/modernizr.js'); ?>
  </head>
  <body>
	<p><h2>エラーが発生しました。</h2></p>
	<p><a href="<?php echo Uri::create('top'); ?>">トップページへ</a></p>

	<?php echo Asset::js('vendor/jquery.js'); ?>
	<?php echo Asset::js('foundation.min.js'); ?>
    <script>
      $(document).foundation();
    </script>
  </body>
</html>
