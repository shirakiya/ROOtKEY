<?php
/**
 * 通常の既定Controller
 */
class Controller_Base extends Controller_Hybrid
{
	public function before()
	{
		parent::before();

		Config::load('app', true);

		// ページタイトルの設定
		$this->template->title = Config::get('app.name');

		$this->template->user = null;
		// ログイン後の場合はユーザーを取得し, Viewへセットする
		if ($user_id = Session::get('user_id')) {
			$this->user = Model_User::find($user_id);
			$this->template->user = $this->user;
		}
	}
}
