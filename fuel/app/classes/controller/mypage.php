<?php

class Controller_Mypage extends Controller_Base
{
	public function before()
	{
		parent::before();

		if (!isset($this->user)) {
			return Response::redirect('top');
		}
	}

	public function action_index()
	{
		// マイページ表示処理
		$this->template->content = Presenter::forge('mypage/index')->set('user', $this->user);
	}
}
