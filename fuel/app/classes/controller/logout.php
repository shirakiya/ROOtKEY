<?php
/**
 * ログアウト
 */
class Controller_Logout extends Controller_Base
{
	public function action_index()
	{
		Session::delete('user_id');
		return Response::redirect('top');
	}
}
