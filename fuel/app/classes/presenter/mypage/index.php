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
		$searches_model_obj =
			$query
			->order_by('id', 'DESC')
			->limit($pagination->per_page)
			->offset($pagination->offset)
			->get();

		$searches = array();
		foreach ($searches_model_obj as $search) {
			$searches[] = $search->format_response_array();
		}

		$pagination_as_array = $pagination->format_response_array();

		$this->set('searches', $searches, false);
		$this->set('pagination', $pagination, false);
		$this->set('pagination_as_array', $pagination_as_array);
	}
}
