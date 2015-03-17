<?php
/**
 * The development database settings. These get merged with the global settings.
 */

return array(
	'default' => array(
		'type'           => 'mysqli',
		'connection'     => array(
			'hostname'       => 'localhost',
			'port'           => '3306',
			'database'       => 'rootkey',
			'username'       => 'root',
			'password'       => '',
			'persistent'     => true,
			'compress'       => true,
		),
		'identifier'     => '`',
		'table_prefix'   => '',
		'charset'        => 'utf8',
		'enable_cache'   => true,
		'profiling'      => true,
		'readonly'       => false,
	),

	'redis' => array(
		'default' => array(
			'hostname' => '127.0.0.1',
			'port'     => '6379',
			'timeout'  => null,
		),
	),
);
