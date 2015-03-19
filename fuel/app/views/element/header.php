<div class="contain-to-grid sticky">
	<nav class="top-bar" data-topbar tole="navigation" data-option="stricky_on: large">
		<ul class="title-area">
			<li class="name">
				<h1><a href="<?php echo Uri::create('top'); ?>">ROOtKEY</a></h1>
			</li>
			<li class="toggle-topbar menu-icon"><a href="#"><span>ログイン</span></a></li>
		</ul>

		<section class="top-bar-section">
			<ul class="right">
			<?php // ログインしていたらドロップダウンのメニューを表示する ?>
			<?php if ($user): ?>
				<li class="has-dropdown">
					<a href="#">メニュー</a>
					<ul class="dropdown">
						<li><a href="<?php echo Uri::create('mypage'); ?>">マイページ</a></li>
						<li><a href="<?php echo Uri::create('logout'); ?>">ログアウト</a></li>
					</ul>
				<li>
			<?php else: ?>
				<li class="login"><a href="#" data-reveal-id="login-modal">ログイン</a></li>
			<?php endif; ?>
			</ul>
		</section>
	</nav>
</div>

<?php // ログインモーダル ?>
<div id="login-modal" class="reveal-modal small" data-reveal>
	<h2>ログイン</h2>
	<p>ROOtKEYにログインすると</p>
	<ul>
		<li>検索結果の登録</li>
		<li>知り合いに検索結果の共有</li>
	</ul>
	<p>ができるようになります。</p>
	<a href="<?php echo Uri::create('auth/login/facebook'); ?>" class="button radius">Facebookログイン</a>
	<?php /* ?>
	<a href="#" class="button radius">Twitterログイン</a>
	<?php */ ?>
	<a class="close-reveal-modal">&#215;</a>
</div>
