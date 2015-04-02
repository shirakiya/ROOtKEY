<?php

class Googlemaps
{
	const DIRECTIONS = 'directions';
	const PLACES     = 'places';

	const URL_DIRECTIONS = 'http://maps.googleapis.com/maps/api/directions/json';
	const URL_PLACES     = 'https://maps.googleapis.com/maps/api/place/search/json';

	const STATUS_OK = 'OK';
	const STATUS_NG = 'NG';

	/**
	 * @var APIサービス
	 */
	protected $service = '';

	/**
	 * @var リクエストのレスポンスbody
	 */
	protected $result = array();


	public static function forge($service)
	{
		return new static($service);
	}

	public function __construct($service)
	{
		$this->service = $service;
	}

	/**
	 * APIのリクエストを実行する
	 * ($this->result に結果:bodyをセットする)
	 *
	 * @param array $params
	 */
	public function execute($params)
	{
		if (empty($this->result)) {
			if ($this->service === static::DIRECTIONS) {
				$this->_execute_directions($params);
			}
			elseif ($this->service === static::PLACES) {
				$this->_execute_places($params);
			}
		}
	}

	/**
	 * Directions API のリクエストを実行する
	 *
	 * @param array $params
	 */
	protected function _execute_directions($params)
	{
		$directions_req = Request::forge(static::URL_DIRECTIONS, 'curl')->set_params(array(
				'origin'      => $params['start'],
				'destination' => $params['end'],
				'sensor'      => 'false',
				'mode'        => $params['mode'],
				'avoid'       => 'tolls',
				'units'       => 'metric',
		));
		$directions = $directions_req->execute()->response()->body();

		$this->result = Format::forge($directions, 'json')->to_array();
	}

	protected function _execute_places($params)
	{
		$places_req = Request::forge(static::URL_PLACES, 'curl')->set_params(array(
			'key'      => Config::get('app.maps_api.key'),
			'location' => $params['lat'].','.$params['lng'],
			'radius'   => $params['radius'],
			'sensor'   => 'false',
			'keyword'  => $params['keyword'],
			'language' => 'ja',
		));
		$places = $places_req->execute()->response()->body();

		$this->result = Format::forge($places, 'json')->to_array();
	}

	/**
	 * リクエストがエラーかどうかを返す
	 *
	 * @return bool エラーならばtrue
	 */
	public function is_error()
	{
		if ($this->result['status'] === static::STATUS_NG) {
			return true;
		}
		return false;
	}

	/**
	 * APIレスポンスのbody部を返す
	 *
	 * @return array
	 */
	public function get()
	{
		return $this->result;
	}

	/**
	 * Directions APIレスポンスのlegs部を返す
	 *
	 * @return array
	 */
	public function get_legs()
	{
		if ($this->service !== static::DIRECTIONS) {
			Log::error("Don't support service! Only Directions API can use.");
			throw new HttpServerErrorException;
		}

		return $this->result['routes'][0]['legs'][0];
	}

	/**
	 * Places APIレスポンスからマーカーに必要な情報を返す
	 *
	 * @return array
	 */
	public function get_places_results()
	{
		if ($this->service !== static::PLACES) {
			Log::error("Don't support service! Only Places API can use.");
			throw new HttpServerErrorException;
		}

		return $this->result['results'];
	}
}
