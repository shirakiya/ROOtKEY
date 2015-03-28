<?php

namespace Fuel\Migrations;

class Add_image_url_to_users
{
	public function up()
	{
		\DBUtil::add_fields('users', array(
			'image_url' => array('type' => 'varchar', 'constraint' => 255, 'null' => true, 'after' => 'twitter_id'),
		));
	}

	public function down()
	{
		\DBUtil::drop_fields('users', array(
			'image_url'
		));
	}
}
