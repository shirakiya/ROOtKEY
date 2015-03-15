<?php
/*
 * エラーページ
 */
class Controller_Error extends Controller
{
	public function action_index()
	{
		return Response::redirect('error/404');
	}

	public function action_404()
	{
		return Response::forge(View::forge('error/404'), 404);
	}

	public function action_500()
	{
		return Response::forge(View::forge('error/500'), 500);
	}
}
