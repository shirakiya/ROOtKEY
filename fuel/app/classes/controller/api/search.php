<?php

class Controller_Api_Search extends Controller_Api
{
	public function before()
	{
		parent::before();
	}

	/**
	 * 検索結果登録処理
	 */
	public function post_save()
	{
		//TODO 要バリデーション

		$user = $this->user;
		$params = Input::post();

		try {
			DB::start_transaction();

			$search = Model_Search::forge();
			$search->user_id = $user->id;
			$search->title   = $params['title'];
			$search->start   = $params['start'];
			$search->end     = $params['end'];
			$search->keyword = $params['keyword'];
			$search->mode    = Model_Search::get_mode_num($params['mode']);
			$search->radius  = $params['radius'];
			$search->save();

			DB::commit_transaction();
		}
		catch (Exception $e) {
			DB::rollback_transaction();
			\Log::error($e->getMessage());
			throw new ApiHttpServerErrorException;
		}

		return $this->response(array(
			'error' => 0,
		));
	}
}
