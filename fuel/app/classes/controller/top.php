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
	}
}
