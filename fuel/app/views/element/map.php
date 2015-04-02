<?php if ($is_success): ?>
	<script type="application/json" id="marker_info"><?php echo Format::forge($marker_info)->to_json(); ?></script>
	<script type="application/json" id="search_co"><?php echo Format::forge($search_co)->to_json(); ?></script>
<?php endif; ?>
<div id="map_canvas" class="<?php echo $map_class; ?>"></div>
