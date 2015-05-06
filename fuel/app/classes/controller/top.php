<?php

class Controller_Top extends Controller_Base
{
	public function before()
	{
		parent::before();
	}

	public function action_index()
	{
		// 検索パラメータの初期値
		$params = array(
			'start'   => '',
			'end'     => '',
			'keyword' => '',
			'mode'    => 'driving',
			'radius'  => '500',
		);

		$this->template->content = View::forge('top/index');
		$this->template->content->set_global('params', $params);

		// 検索処理でない場合はここで処理が終了
		if (!Input::get('mode') && !Input::get('radius')) {
			return;
		}

		/* Validation */
		$params = Input::get();

		// 入力パラメータに上書き
		$this->template->content->set_global('params', $params);

		$val = Validation::forge();
		$val->add_field('start', '出発地', 'required|max_length[50]');
		$val->add_field('end', '目的地', 'required|max_length[50]');
		$val->add_field('keyword', '検索ワード', 'required|max_length[50]');
		// getメソッドを使う限りradiusとmodeのバリデーションを加える

		// getメソッドに対するValidation実行
		$is_valid = $val->run(array(
			'start'   => $params['start'],
			'end'     => $params['end'],
			'keyword' => $params['keyword'],
		));

		if (!$is_valid) {
			$this->template->set_global('error', $val->error());
			return;
		}

		View::set_global('is_map_shown', true);
		$this->template->content = Presenter::forge('top/index')->set('params', $params);
	}
}
