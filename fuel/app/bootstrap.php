<?php
// Bootstrap the framework DO NOT edit this
require COREPATH.'bootstrap.php';

Autoloader::add_core_namespace('Fuel\\App');
Autoloader::add_classes(array(
	'Fuel\\App\\Asset' => APPPATH.'classes/asset.php',
	'Fuel\\App\\Googlemaps' => APPPATH.'classes/googlemaps.php',
));

// Register the autoloader
Autoloader::register();

/**
 * Your environment.  Can be set to any of the following:
 *
 * Fuel::DEVELOPMENT
 * Fuel::TEST
 * Fuel::STAGING
 * Fuel::PRODUCTION
 */
Fuel::$env = (isset($_SERVER['FUEL_ENV']) ? $_SERVER['FUEL_ENV'] : Fuel::DEVELOPMENT);

// Initialize the framework with the config file.
Fuel::init('config.php');
