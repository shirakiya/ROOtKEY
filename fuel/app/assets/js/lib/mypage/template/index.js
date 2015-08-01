var _ = require('underscore');

module.exports = {
  listContainer: _.template(
		'<div id="item-description">' +
			'<span class="info label">登録件数</span> ' +
			'<span id="total-items">計 <%= total_items %> 件</span>' +
		'</div>' +
	  '<ul id="search-result-lists" class="small-block-grid-1 medium-block-grid-2 large-block-grid-3">' +
    '</ul>'
  ),
  listUnit: _.template(
    '<table class="search-result-title" data-id=<%= id %>>' +
    	'<thead>' +
    		'<tr>' +
    			'<th><%- title %></th>' +
    		'</tr>' +
    	'</thead>' +
    '</table>' +
    '<a href="<%= search_url %>">' +
    	'<img class="th" src="<%= google_maps_img_url %>">' +
    '</a>' +
    '<table class="search-result-detail">' +
    	'<tbody>' +
    		'<tr>' +
    			'<td colspan=2>' +
    				'<a href="<%- search_url %>" class="button small radius">' +
    					'<i class="fa fa-share"></i> 検索結果を表示する' +
    				'</a>' +
    			'</td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>出発地</strong></td>' +
    			'<td><%- start %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>目的地</strong></td>' +
    			'<td><%- end %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>検索ワード</strong></td>' +
    			'<td><%- keyword %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>移動手段</strong></td>' +
    			'<td><%= mode %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td class="grid-3"><strong>検索半径</strong></td>' +
    			'<td><%= radius %></td>' +
    		'</tr>' +
    		'<tr>' +
    			'<td colspan=2>' +
    				'<a href="#" class="search-result-delete"><i class="fa fa-trash"></i></a>' +
    				'<a href="#" class="search-result-edit"><i class="fa fa-pencil-square-o"></i></a>' +
    			'</td>' +
    		'</tr>' +
    	'</tbody>' +
    '</table>'
  ),
  empty:
	  '<div data-alert class="alert-box warning radius">' +
		  '<strong><i class="fa fa-exclamation-circle"></i> 検索履歴が登録されていません。</strong>' +
			'<br>' +
			'検索結果を登録することで、再び検索条件を入力することなくすぐに検索結果にアクセスできるようになります。' +
		'</div>'
};
