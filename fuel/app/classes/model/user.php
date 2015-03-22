<?php

class Model_User extends \Orm\Model_Soft
{
	protected static $_properties = array(
		'id',
		'name',
		'login_type',
		'image_url',
		'facebook_id',
		'twitter_id',
		'deleted_at',
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

	protected static $_table_name = 'users';

}
