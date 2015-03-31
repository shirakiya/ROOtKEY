<div class="search-box">
	<div class="panel radius">
		<?php echo Form::open(array('action' => Uri::create('top'), 'method' => 'get')); ?>
		<div class="row">
			<div class="large-8 columns">
			<?php if (isset($error) and $error['start']): ?>
				<label class="error"><?php echo $error['start']; ?>
			<?php endif; ?>
					<div class="row collapse prefix-radius">
						<div class="small-3 columns">
							<span class="prefix"><strong>出発地</strong></span>
						</div>
						<div class="small-9 columns">
							<?php echo Form::input('start', '', array('placeholder' => '出発地')); ?>
						</div>
					</div>
			<?php if (isset($error) and $error['start']): ?>
				</label>
			<?php endif; ?>
				<div class="text-center"><i class="fa fa-caret-down"></i></div>
			<?php if (isset($error) and $error['end']): ?>
				<label class="error"><?php echo $error['end']; ?>
			<?php endif; ?>
					<div class="row collapse prefix-radius">
						<div class="small-3 columns">
							<span class="prefix"><strong>目的地</strong></span>
						</div>
						<div class="small-9 columns">
							<?php echo Form::input('end', '', array('placeholder' => '目的地')); ?>
						</div>
					</div>
			<?php if (isset($error) and $error['end']): ?>
				</label>
			<?php endif; ?>
				<br>
				<i class="fa fa-chevron-circle-down"></i> ルート上の探し物を入力
			<?php if (isset($error) and $error['keyword']): ?>
				<label class="error"><?php echo $error['keyword']; ?>
			<?php endif; ?>
					<div class="row collapse prefix-radius">
						<div class="small-3 columns">
							<span class="prefix"><strong>検索ワード</strong></span>
						</div>
						<div class="small-9 columns">
							<?php echo Form::input('keyword', '', array('placeholder' => '検索ワード')); ?>
						</div>
					</div>
			<?php if (isset($error) and $error['keyword']): ?>
				</label>
			<?php endif; ?>
			</div>
			<div class="large-4 columns">
				<div class="panel white">
					<div class="panel-title">条件設定</div>
					<div class="panel-body">
						<label><strong>移動手段</strong>
							<?php echo Form::select('mode', '', array(
								'walk'  => '徒歩',
								'car'   => '車',
								'train' => '電車',
							)); ?>
						</label>
						<label><strong>検索半径</strong>
							<?php echo Form::select('radius', '', array(
								'500'   => '500m',
								'1000'  => '1km',
								'2000'  => '2km',
								'5000'  => '5km',
								'10000' => '10km',
							)); ?>
						</label>
					</div>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="large-12 columns">
				<?php echo Form::button('', '<i class="fa fa-angle-double-right"></i> <strong>検索</strong>', array(
					'class' => 'botton expand',
					'type'  => 'submit'
				)); ?>
			</div>
		</div>
		<?php echo Form::close(); ?>
	</div>
</div>
