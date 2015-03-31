<?php

class Controller_Top extends Controller_Base
{
	public function before()
	{
		parent::before();
	}

	public function action_index()
	{
		$this->template->content = View::forge('top/index');

		// 検索処理でない場合はここで処理が終了
		if (!Input::get('mode') && !Input::get('radius')) {
			return;
		}

		/* Validation */
		$params = Input::get();

		$val = Validation::forge();
		$val->add_field('start', '出発地', 'required|max_length[50]');
		$val->add_field('end', '目的地', 'required|max_length[50]');
		$val->add_field('keyword', '検索ワード', 'required|max_length[50]');

		// getメソッドに対するValidation実行
		$is_valid = $val->run(array(
			'start'   => $params['start'],
			'end'     => $params['end'],
			'keyword' => $params['keyword'],
		));

		if (!$is_valid) {
			$this->template->content->set('error', $val->error());
			return;
		}
	}
}
