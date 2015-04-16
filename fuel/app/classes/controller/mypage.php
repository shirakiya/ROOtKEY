<?php

class Controller_Mypage extends Controller_Base
{
	public function before()
	{
		parent::before();
	}

	public function action_index()
	{
		// マイページ表示処理
	}

	/**
	 * 検索結果登録処理
	 */
	public function post_register()
	{
		//TODO 要バリデーション

		$user = $this->user;
		$params = Input::post();

		$search = Model_Search::forge();
		$search->user_id = $user->id;
		$search->title   = $params['title'];
		$search->start   = $params['start'];
		$search->end     = $params['end'];
		$search->keyword = $params['keyword'];
		$search->mode    = Model_Search::get_mode_num($params['mode']);
		$search->radius  = $params['radius'];
		$search->save();

		Response::redirect('top');
	}
}
