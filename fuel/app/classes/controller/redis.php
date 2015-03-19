<?php

class Controller_Redis extends Controller
{
	public function action_index()
	{
		Cookie::set('theme', 'fuel');
		Session::set('hoge', 'fuga');
		return Response::forge(View::forge('redis/form'));
	}

	public function post_redirect()
	{
		$hoge = Session::get('hoge');
		return Response::forge(View::forge('redis', array(
			'hoge' => $hoge,
			'piyo' => Input::post('piyo'),
		)));
	}
}
