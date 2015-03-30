<?php echo View::forge('element/title'); ?>

<div class="row">
	<div class="large-12 columns">
	<?php if ($is_map_shown): ?>
		<?php echo View::forge('element/map', array(
			'map_class' => 'map-top',
		)); ?>
	<?php endif; ?>
	</div>
</div>

<div class="search-area">
	<div class="row">
		<div class="large-7 columns">
		<?php echo View::forge('element/search_box'); ?>
		</div>
		<div class="large-5 columns">
		</div>
	</div>
</div>
