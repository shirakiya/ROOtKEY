<?php

class Controller_Api extends Controller_Rest
{
	public function before()
	{
		parent::before();

		if ($user_id = Session::get('user_id')) {
			$this->user = Model_User::find($user_id);
		}
	}
}
