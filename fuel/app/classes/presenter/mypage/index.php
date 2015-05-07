<?php

class Presenter_Mypage_Index extends Presenter
{
	public function view()
	{
		// ページャー
		Config::load('pagination', true);

		$query = Model_Search::query()->where('user_id', $this->user->id);

		$count_searches = $query->count();
		$current_url = Uri::current();
		$current_url = stripos($current_url, 'index') ? $current_url : $current_url.'/index';

		$config = array_merge(Config::get('pagination.config.mypage'), array(
			'pagination_url' => $current_url,
			'total_items'    => $count_searches,
		));
		$pagination = Pagination::forge('default', $config);

		// 検索履歴の取得
		$searches =
			$query
			->order_by('id', 'DESC')
			->limit($pagination->per_page)
			->offset($pagination->offset)
			->get();

		$this->set('searches', $searches);
		$this->set('pagination', $pagination, false);
	}
}
