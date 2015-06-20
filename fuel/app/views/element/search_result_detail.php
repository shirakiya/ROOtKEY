<div id="search-result-detail">
	<div id="search-result-detail-content">
		<table id="search-result-detail-table">
			<thead>
				<tr>
					<th>
						<span class="label info">出発地</span>
						 <?php echo $params['start']; ?>
						 <i class="fa fa-caret-right"></i>
						 <span class="label info">目的地</span>
						 <?php echo $params['end']; ?>
						<div id="search-result-detail-origin" class="distance"></div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="table-content-loader">
						<div class="loader">
							<i class="fa fa-spinner fa-pulse"></i>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>
