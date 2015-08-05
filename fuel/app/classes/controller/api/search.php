<?php

class Controller_Api_Search extends Controller_Api
{
	public function before()
	{
		parent::before();

		if (!isset($this->user)) {
			throw new ApiHttpForbiddenException(__('error.api.403.message'));
		}
	}

	/**
	 * 検索結果登録処理
	 */
	public function post_save()
	{
		// 入力値の保存
		$params = Input::json();

		// 登録名のバリデーション
		$val = Model_Search::validate('save');
		if (!$val->run($params)) {
			Log::error($val->error_message('title'));
			throw new ApiHttpBadRequestException(__('error.api.400.message'));
		}

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

			return $this->response(array(
				'error' => 0,
				'data' => array(
					'title'   => $search->title,
					'start'   => $search->start,
					'end'     => $search->end,
					'keyword' => $search->keyword,
					'mode'    => $search->mode,
					'radius'  => $search->radius,
				),
			));
		}
		catch (Exception $e) {
			DB::rollback_transaction();
			Log::error($e->getMessage());
			throw new ApiHttpServerErrorException(__('error.api.500.message'));
		}
	}

	/**
	 * 検索結果登録名編集
	 * @param int $id 検索結果ID
	 */
	public function put_save_title($search_id)
	{
		if (! $search = Model_Search::find($search_id)) {
			throw new ApiHttpBadRequestException(__('error.api.400.message'));
		}

		$params = Input::json();
		// バリデーションパラメータにuser_idを追加
		// セッション中のユーザーと一致しているか確認する
		$params['user_id'] = $search->user_id;

		$val = Model_Search::validate('save_title');
		if (!$val->run($params)) {
			foreach ($val->error_message() as $error_message) {
				Log::error($error_message);
			}
			throw new ApiHttpBadRequestException(__('error.api.400.message'));
		}

		try {
			DB::start_transaction();

			// 登録名の更新
			$search->title = $params['title'];
			$search->save();

			DB::commit_transaction();
		} catch (Exception $e) {
			DB::rollback_transaction();
			Log::error($e->getMessage());
			Log::debug('hoge');
			throw new ApiHttpServerErrorException(__('error.api.500.message'));
		}

		return $this->response(array(
			'error' => 0,
			'title' => $params['title'],
		));
	}

	/**
	 * 検索結果の削除
	 * @param int $id 検索結果ID
	 */
	public function delete_delete($search_id)
	{
		if (! $search = Model_Search::find($search_id)) {
			throw new ApiHttpBadRequestException(__('error.api.400.message'));
		}

		$params = array();
		// バリデーションパラメータにuser_idを追加
		// セッション中のユーザーと一致しているか確認する
		$params['user_id'] = $search->user_id;

		$val = Model_Search::validate('delete');
		if (!$val->run($params)) {
			Log::error($val->error_message('user_id'));
			throw new ApiHttpBadRequestException(__('error.api.400.message'));
		}

		try {
			DB::start_transaction();

			// 検索結果の削除
			$search->delete();

			DB::commit_transaction();
		} catch (Exception $e) {
			DB::rollback_transaction();
			Log::error($e->getMessage());
			throw new ApiHttpServerErrorException(__('error.api.500.message'));
		}

		return $this->response(array(
			'error' => 0,
		));
	}

	/**
	 * 指定したIDの１つ前の検索結果を１つ返す
	 * @param int $next_id １つ前の検索結果のID
	 */
	public function get_prev_one($next_id)
	{
		try {
			$search = Model_Search::query()
				->where('id', '<', $next_id)
				->order_by('id', 'DESC')
				->get_one();

			if ($search) {
				return $this->response(array(
					'error' => 0,
					'data' => $search->format_response_array(),
				));
			} else {
				return $this->response(array(
					'error' => 0,
					'data' => null,
				));
			}
		} catch (Exception $e) {
			Log::error($e->getMessage());
			throw new ApiHttpServerErrorException(__('error.api.500.message'));
		}
	}
}
