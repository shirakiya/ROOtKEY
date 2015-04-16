<?php

namespace Fuel\Migrations;

class Create_users
{
	private static $_table_name = 'users';

	public function up()
	{
		\DBUtil::create_table(static::$_table_name, array(
			'id'          => array('type' => 'int',     'constraint' => 11,  'null' => false, 'auto_increment' => true, 'unsigned' => true),
			'name'        => array('type' => 'varchar', 'constraint' => 255, 'null' => false),
			'login_type'  => array('type' => 'varchar', 'constraint' => 15,  'null' => false),
			'facebook_id' => array('type' => 'varchar', 'constraint' => 255, 'null' => true),
			'twitter_id'  => array('type' => 'varchar', 'constraint' => 255, 'null' => true),
			'deleted_at'  => array('type' => 'timestamp', 'null' => true),
			'created_at'  => array('type' => 'timestamp', 'null' => false),
			'updated_at'  => array('type' => 'timestamp', 'null' => false),
		), array('id'), true, 'InnoDB', 'utf8_general_ci');

		\DBUtil::create_index(static::$_table_name, 'name', 'idx_name');
		\DBUtil::create_index(static::$_table_name, array('id', 'name'), 'idx_id_name');
	}

	public function down()
	{
		\DBUtil::drop_table(static::$_table_name);
	}
}
