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
		$val = Model_Search::validate('save');
		if (!$val->run()) {
			\Log::error($val->error_message('title'));
			throw new ApiHttpServerErrorException;
		}

		// 入力値の保存
		$params = Input::post();

		try {
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

	/**
	 * 検索結果登録名編集
	 */
	public function post_save_title()
	{
		$params = Input::post();
		$search = Model_Search::find($params['id']);
		// バリデーションパラメータにuser_idを追加
		// セッション中のユーザーと一致しているか確認する
		$params['user_id'] = $search->user_id;

		// 登録名のバリデーション
		$val = Model_Search::validate('save_title');
		if (!$val->run($params)) {
			foreach ($val->error_message() as $error_message) {
				\Log::error($error_message);
			}
			throw new ApiHttpServerErrorException;
		}

		try {
			DB::start_transaction();

			// 登録名の更新
			$search->title = $params['title'];
			$search->save();

			DB::commit_transaction();
		} catch (Exception $e) {
			DB::rollback_transaction();
			\Log::error($e->getMessage());
			throw new ApiHttpServerErrorException;
		}

		return $this->response(array(
			'error' => 0,
		));
	}
}
