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

	public function post_register()
	{
		// 検索結果登録処理
		Debug::dump(Input::post());exit;
	}
}
