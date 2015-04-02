<?php

class Calc
{
	const DISTANCE_BY_LAT = 111319.489;  // 緯度1度当たりの地球表面上の直線距離

	/**
	 * 座標間距離を計算し、結果を返す
	 *
	 * @param int $start_lat 始点の緯度
	 * @param int $start_lng 始点の軽度
	 * @param int $end_lat   終点の緯度
	 * @param int $end_lng   終点の軽度
	 * @return int 座標間距離 [m]
	 */
	public static function distance($start_lat, $start_lng, $end_lat, $end_lng)
	{
		$delta_lat = $end_lat - $start_lat;
		$delta_lng = $end_lng - $start_lng;

		$delta_lat_distance = ($end_lat - $start_lat) * self::DISTANCE_BY_LAT;
		$delta_lng_distance = ($end_lng - $start_lng) * cos(2 * pi() * $end_lat / 360) * self::DISTANCE_BY_LAT;

		return sqrt(pow($delta_lat_distance, 2) + pow($delta_lng_distance, 2));
	}
}
