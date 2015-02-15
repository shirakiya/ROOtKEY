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
	}
}
