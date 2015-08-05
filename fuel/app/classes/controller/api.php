<?php

class Controller_Api extends Controller_Rest
{
	public function before()
	{
		parent::before();

		Config::load('app', true);
		Lang::load('app', true);
		Lang::load('error', true);

		if ($user_id = Session::get('user_id')) {
			$this->user = Model_User::find($user_id);
		}
	}
}
