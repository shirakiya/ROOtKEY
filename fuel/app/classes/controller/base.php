<?php
/**
 * 通常の既定Controller
 */
class Controller_Base extends Controller_Template
{
	public function before()
	{
		parent::before();

		Config::load('app', true);
		Lang::load('app', true);

		// Mapsを表示するかどうかを司る(デフォルトは表示させない)
		View::set_global('is_map_shown', false);

		// ページタイトルの設定
		$this->template->title = Config::get('app.name');

		$this->template->set_global('user', null);
		// ログイン後の場合はユーザーを取得し, Viewへセットする
		if ($user_id = Session::get('user_id')) {
			$this->user = Model_User::find($user_id);
			$this->template->set_global('user', $this->user);
		}
	}
}
