<?php

class Controller_Top extends Controller_Base
{
	public function action_index()
	{
		$this->template->content = View::forge('top/index');
	}
}
