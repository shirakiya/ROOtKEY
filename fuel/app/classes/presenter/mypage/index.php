<?php

class Presenter_Mypage_Index extends Presenter
{
	public function view()
	{
		// ページャー
		Config::load('pagination', true);

		$count_searches = count(DB::select()
			->from('searches')
			->where('user_id', '=', $this->user->id)
			->execute()
		);

		$current_url = Uri::current();
		$current_url = stripos($current_url, 'index') ? $current_url : $current_url.'/index';

		$config = array_merge(Config::get('pagination.config.mypage'), array(
			'pagination_url' => $current_url,
			'total_items'    => $count_searches,
		));
		$pagination = Pagination::forge('default', $config);

		// 検索履歴の取得
		$searches = DB::select()
			->from('searches')
			->where('deleted_at', null)
			->where('user_id', '=', $this->user->id)
			->limit($pagination->per_page)
			->offset($pagination->offset)
			->order_by('id', 'DESC')
			->execute()
			->as_array('id');

		$this->set('searches', $searches);
		$this->set('pagination', $pagination, false);
	}
}
