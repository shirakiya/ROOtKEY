<?php

class Model_Search extends \Orm\Model_Soft
{
	protected static $_properties = array(
		'id',
		'user_id',
		'title',
		'start',
		'end',
		'keyword',
		'mode',
		'radius',
		'deleted_at' => array('default' => null),
		'created_at',
		'updated_at',
	);

	protected static $_observers = array(
		'Orm\Observer_CreatedAt' => array(
			'events' => array('before_insert'),
			'mysql_timestamp' => true,
		),
		'Orm\Observer_UpdatedAt' => array(
			'events' => array('before_update'),
			'mysql_timestamp' => true,
		),
	);

	protected static $_soft_delete = array(
		'mysql_timestamp' => true,
	);

	protected static $_table_name = 'searches';

	protected static $_belongs_to = array(
		'users' => array(
			'key_from'       => 'user_id',
			'model_to'       => 'Model_User',
			'key_to'         => 'id',
			'cascade_save'   => false,
			'cascade_delete' => false,
		)
	);

	const MODE_DRIVING   = 1;
	const MODE_WALKING   = 2;
	const MODE_BICYCLING = 3;

	const MODE_STRING_DRIVING   = 'driving';
	const MODE_STRING_WALKING   = 'walking';
	const MODE_STRING_BICYCLING = 'bycycling';

	protected static $_mode = array();

	public static function _init()
	{
		if (empty(static::$_mode)) {
			static::$_mode = array(
				static::MODE_DRIVING   => static::MODE_STRING_DRIVING,
				static::MODE_WALKING   => static::MODE_STRING_WALKING,
				static::MODE_BICYCLING => static::MODE_STRING_BICYCLING,
			);
		}
	}

	/**
	 * 検索履歴登録時のvalidationオブジェクトを返す
	 * @param string $factory
	 *	ex) save, save_title
	 * @return Validation
	 */
	public static function validate($factory)
	{
		$val = Validation::forge();

		switch ($factory) {
			case 'save':
				$val->add_field('title', '登録名', 'required|max_length[50]');
				break;
			case 'save_title':
				$val->add_callable(__class__);
				$val->add_field('title', '登録名', 'required|max_length[50]');
				$val->add_field('user_id', 'user_id', 'match_user_id');
				break;
		}

		return $val;
	}

	/**
	 * [validation method]
	 * セッション中のユーザーと一致しているか
	 * @param int $id ユーザーID
	 * @return bool 一致している場合はtrue
	 */
	public static function _validation_match_user_id($user_id)
	{
		return $user_id === Session::get('user_id');
	}

	/**
	 * 移動手段の文字列を返す
	 * @return string 移動手段の文字列
	 */
	public function convert_mode_to_string()
	{
		return static::get_mode_string($this->mode);
	}

	/**
	 * 定数値の移動手段を受け取り、対応する移動手段の文字列を返す
	 * @static
	 * @param int $string 移動手段の定数値
	 * @return string|false 移動手段の文字列 or 存在しない移動手段の場合はfalse
	 */
	public static function get_mode_string($mode)
	{
		if (array_key_exists((int)$mode, static::$_mode)) {
			return static::$_mode[$mode];
		}
		return false;
	}

	/**
	 * 文字列の移動手段を受け取り、対応する移動手段の定数値を返す
	 * @static
	 * @param string $string 移動手段の文字列
	 * @return int|false 移動手段の定数値 or 存在しない移動手段の場合はfalse
	 */
	public static function get_mode_num($string)
	{
		return array_search($string, static::$_mode);
	}

	/**
	 * 検索時のURLパラメータを返す
	 * @return string URLパラメータ形式の文字列 ex.) start=hoge&end=fuga
	 */
	public function create_search_params_for_url()
	{
		return Uri::build_query_string(
			array('start'   => $this->start),
			array('end'     => $this->end),
			array('keyword' => $this->keyword),
			array('mode'    => $this->convert_mode_to_string()),
			array('radius'  => $this->radius)
		);
	}

	/**
	 * 検索トップ画面でのURLを返す
	 * @return string ex.) http://rootkey/top?start=hoge&end=fuga&...
	 */
	public function create_search_url_with_params()
	{
		return Uri::create('top?'.$this->create_search_params_for_url());
	}

	/**
	 * プロパティの値を連想配列にして返す
	 * @param array $props プロパティ名の一次元配列
	 * @return array プロパティ名 => 値 の連想配列
	 */
	public function get_assoc_array($props)
	{
		if (!is_array($props)) {
			return false;
		}

		$array = array();
		foreach ($props as $prop) {
			if (in_array($prop, self::$_properties)) {
				$array[$prop] = $this->$prop;
			}
		}

		return $array;
	}
}
