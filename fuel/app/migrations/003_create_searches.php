<?php

namespace Fuel\Migrations;

class Create_searches
{
	private static $_table_name = 'searches';

	public function up()
	{
		\DBUtil::create_table(static::$_table_name, array(
			'id'         => array('type' => 'int',     'constraint' => 11,  'null' => false, 'auto_increment' => true, 'unsigned' => true),
			'user_id'    => array('type' => 'int',     'constraint' => 11,  'null' => false, 'unsigned' => true),
			'title'      => array('type' => 'varchar', 'constraint' => 255, 'null' => false),
			'start'      => array('type' => 'varchar', 'constraint' => 255, 'null' => false),
			'end'        => array('type' => 'varchar', 'constraint' => 255, 'null' => false),
			'keyword'    => array('type' => 'varchar', 'constraint' => 255, 'null' => false),
			'mode'       => array('type' => 'tinyint',                      'null' => false),
			'radius'     => array('type' => 'int',     'constraint' => 11,  'null' => false),
			'deleted_at' => array('type' => 'timestamp', 'null' => true),
			'created_at' => array('type' => 'timestamp', 'null' => false),
			'updated_at' => array('type' => 'timestamp', 'null' => false),
		), array('id'), true, 'InnoDB', 'utf8_general_ci');

		\DBUtil::create_index(static::$_table_name, 'user_id', 'idx_user_id');
		\DBUtil::create_index(static::$_table_name, 'deleted_at', 'idx_deleted_at');
		\DBUtil::create_index(static::$_table_name, array('user_id', 'deleted_at'), 'idx_user_id_deleted_at');

		// 設定の仕方のサンプルのために残しておく
		//\DBUtil::add_foreign_key(static::$_table_name, array(
		//	'constraint' => 'fk_searches_user_id',
		//	'key'        => 'user_id',
		//	'reference'  => array(
		//		'table'  => 'users',
		//		'column' => 'id',
		//	),
		//	'on_update'	 => 'CASCADE',
		//	'on_delete'	 => 'CASCADE'
		//));
	}

	public function down()
	{
		\DBUtil::drop_foreign_key(static::$_table_name, 'fk_searches_user_id');
		\DBUtil::drop_table(static::$_table_name);
	}
}
