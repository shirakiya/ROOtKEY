<?php

class Controller_Auth extends Controller
{
    private $_config = null;

	private $_facebook = 'facebook';
	private $_twitter  = 'twitter';

    public function before()
    {
	    if(!isset($this->_config)) {
			$this->_config = Config::load('opauth', 'opauth');
		}
	}

    /**
	 * eg. http://www.exemple.org/auth/login/facebook/ will call the facebook opauth strategy.
	 * Check if $provider is a supported strategy.
	 */
    public function action_login($_provider = null)
    {
	    if(array_key_exists(Inflector::humanize($_provider), Arr::get($this->_config, 'Strategy'))) {
			$_oauth = new Opauth($this->_config, true);
		} else {
			return Response::forge('Strategy not supported');
		}
	}

    // Print the user credentials after the authentication. Use this information as you need. (Log in, registrer, ...)
	public function action_callback()
	{
		$_opauth = new Opauth($this->_config, false);

		switch($_opauth->env['callback_transport']) {
			case 'session':
				session_start();
				$response = $_SESSION['opauth'];
				unset($_SESSION['opauth']);
			break;
		}

		// ここらが好きに実装していい部分
		if (array_key_exists('error', $response)) {
			throw new HttpServerErrorException;
		} else {
			if (empty($response['auth']) || empty($response['timestamp']) || empty($response['signature']) || empty($response['auth']['provider']) || empty($response['auth']['uid'])) {
				throw new HttpServerErrorException;
			} elseif (!$_opauth->validate(sha1(print_r($response['auth'], true)), $response['timestamp'], $response['signature'], $reason)) {
				throw new HttpServerErrorException;
			}
		}

		/* ユーザーの取得処理 */
		$strategy = strtolower($response['auth']['provider']);
		$uid      = $response['auth']['uid'];

		$user = Model_User::find('first', array(
			'where' => array(
				array('login_type', $strategy),
				array("{$strategy}_id", $uid),
			),
		));

		// ユーザーが登録されていない場合
		if (!$user) {
			$user = $this->_register_user($response);
		}

		Session::set('user_id', $user->id);
		return Response::redirect('top');
	}

	/**
	 * ユーザーをDBへ登録する
	 *
	 * @param array $response OAuthレスポンス
	 * @return Model_User 登録したユーザーのModel_Userオブジェクト
	 */
	private function _register_user($response)
	{
		$strategy = strtolower($response['auth']['provider']);

		$user = Model_User::forge();
		$user->login_type = $strategy;
		$user->image_url  = $response['auth']['info']['image'];
		if ($strategy === $this->_facebook) {
			$user->name           = $response['auth']['info']['name'];
			$user->facebook_id = $response['auth']['uid'];
		} elseif ($strategy === $this->_twitter) {
			$user->name           = $response['auth']['info']['nickname'];
			$user->twitter_id = $response['auth']['uid'];
		}
		$user->save();

		return $user;
	}
}
