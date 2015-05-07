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
		// 登録名のバリデーション
		$val = Model_Search::validate();

		if (!$val->run()) {
			\Log::error($val->error_message('title'));
			throw new ApiHttpServerErrorException;
		}

		// 入力値の保存
		$params = Input::post();

		try {
			//hogehoge  // エラーを返させるときにコメントを外す
			DB::start_transaction();

			$search = Model_Search::forge();
			$search->user_id = $this->user->id;
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
