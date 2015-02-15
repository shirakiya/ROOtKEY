<?php
/**
 * Part of the Fuel framework.
 *
 * @package    Fuel
 * @version    1.7
 * @author     Fuel Development Team
 * @license    MIT License
 * @copyright  2010 - 2014 Fuel Development Team
 * @link       http://fuelphp.com
 */


return array(
	// 'base_url'  => null,

	// 'url_suffix'  => '',

	// 'index_file' => false,

	'profiling'  => true,

	// 'cache_dir'       => APPPATH.'cache/',

	// 'caching'         => false,
	// 'cache_lifetime'  => 3600, // In Seconds

	// 'ob_callback'  => null,

	// 'errors'  => array(
		// Which errors should we show, but continue execution? You can add the following:
		// E_NOTICE, E_WARNING, E_DEPRECATED, E_STRICT to mimic PHP's default behaviour
		// (which is to continue on non-fatal errors). We consider this bad practice.
		// 'continue_on'  => array(),
		// How many errors should we show before we stop showing them? (prevents out-of-memory errors)
		// 'throttle'     => 10,
		// Should notices from Error::notice() be shown?
		// 'notices'      => true,
		// Render previous contents or show it as HTML?
		// 'render_prior' => false,
	// ),

	'language'           => 'ja', // Default language
	'language_fallback'  => 'en', // Fallback language when file isn't available for default language
	'locale'             => 'ja_JP.UTF-8', // PHP set_locale() setting, null to not set

	'encoding'  => 'UTF-8',

	// 'server_gmt_offset'  => 0,
	'default_timezone'   => 'Asia/Tokyo',

	'log_threshold'    => Fuel::L_WARNING,
	'log_path'         => APPPATH.'logs/',
	'log_date_format'  => 'Y-m-d H:i:s',

	'security' => array(
		'csrf_autoload'    => true,
		'csrf_token_key'   => 'fuel_csrf_token',
		'csrf_expiration'  => 0,
		'token_salt'       => 'ggLM2Q1rDm0K7dL8tBlu',
		'allow_x_headers'  => false,
		'uri_filter'       => array('htmlentities'),
		// 'input_filter'  => array(),
		'output_filter'    => array('Security::htmlentities'),
		'htmlentities_flags' => ENT_QUOTES,
		'htmlentities_double_encode' => false,
		// 'auto_filter_output'  => true,
		'whitelisted_classes' => array(
			'Fuel\\Core\\Presenter',
			'Fuel\\Core\\Response',
			'Fuel\\Core\\View',
			'Fuel\\Core\\ViewModel',
			'Closure',
		),
	),

	'cookie' => array(
		'expiration'  => 86400,
		'path'        => '/',
		'domain'      => null,
		'secure'      => false,
		'http_only'   => false,
	),

	// 'validation' => array(
		// 'global_input_fallback' => true,
	// ),

	'controller_prefix' => 'Controller_',

	'routing' => array(
		'case_sensitive' => true,
		// 'strip_extension' => true,
	),

	// 'module_paths' => array(
	// 	//APPPATH.'modules'.DS
	// ),

	'package_paths' => array(
		PKGPATH
	),


	/**************************************************************************/
	/* Always Load                                                            */
	/**************************************************************************/
	'always_load'  => array(
		'packages'  => array(
			'orm',
			'auth',
			'opauth',
		),
		// 'modules'  => array(),
		'classes'  => array(),
		'config'  => array(),
		'language'  => array(),
	),

);
