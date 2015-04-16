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
	 * 文字列の移動手段を受け取り、対応する移動手段の定数値を返す
	 * @static
	 * @param string $string 移動手段の文字列
	 * @return int|false 移動手段の定数値 or 存在しない移動手段の場合はfalse
	 */
	public static function get_mode_num($string)
	{
		return array_search($string, static::$_mode);
	}
}
