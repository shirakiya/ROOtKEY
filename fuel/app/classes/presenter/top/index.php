<?php

class Presenter_Top_Index extends Presenter
{
	public function view()
	{
		/** Directions検索 **/
		$directions = Googlemaps::forge('directions');
		$directions->execute($this->params);

		// エラーがあった場合は終了
		if ($directions->is_error()) {
			//TODO エラーなのにMapsが表示されてしまう問題の解決
			// 発生の可能性も少ないのでとりあえず後回し
			Session::set_flash('error', __('app.message.error.request'));
			$this->set('is_success', false);
			return;
		}

		/** Places検索座標の導出 **/
		$legs = $directions->get_legs();
		$steps = $legs['steps'];
		$radius = $this->params['radius'];
		$search_co = array();  // Places検索を行う座標を保持する配列

		// 全行程の始点/終点/全行程距離を取り出しやすいように配列にする
		$whole_process = array(
			'dep_lat'      => $legs['start_location']['lat'],
			'dep_lng'      => $legs['start_location']['lng'],
			'des_lat'      => $legs['end_location']['lat'],
			'des_lng'      => $legs['end_location']['lng'],
			'sum_distance' => $legs['distance']['value'],
		);

		// 始点はPlaces検索をかける
		$search_co[] = array(
			'lat' => $whole_process['dep_lat'],
			'lng' => $whole_process['dep_lng'],
		);

		// 全行程距離が検索円の直径(始点と終点でPlaces検索を行うので直径を使う)よりも大きな場合はPlaces検索座標を分割する
		if ($whole_process['sum_distance'] > (2 * $radius)) {
			$accumulated_value = 0;  // 分割計算上の積算距離
			$step_co = array();      // 分割行程の始点座標と終点座標

			foreach ($legs['steps'] as $step) {
				$step_co = array(
					'start_lat' => $step['start_location']['lat'],
					'start_lng' => $step['start_location']['lng'],
					'end_lat'   => $step['end_location']['lat'],
					'end_lng'   => $step['end_location']['lng'],
				);

				$step_d = Calc::distance(
					$step_co['start_lat'],
					$step_co['start_lng'],
					$step_co['end_lat'],
					$step_co['end_lng']
				);

				// 分割行程(=step)の距離が検索円の直径よりも大きい場合はさらに分割
				if ($step_d > (2 * $radius)) {
					// 分割行程を更に分割する(検索円の直径で割った値)
					$split_step_num = ceil($step_d / (2 * $radius));

					$inc_delta_lat = ($step_co['end_lat'] - $step_co['start_lat']) / $split_step_num;
					$inc_delta_lng = ($step_co['end_lng'] - $step_co['start_lng']) / $split_step_num;

					if ($accumulated_value > $radius) {
						$search_co[] = array(
							'lat' => $step_co['start_lat'],
							'lng' => $step_co['start_lng'],
						);
					}

					for ($i=0; $i < $split_step_num; $i++) {
						$step_co['start_lat'] += $inc_delta_lat;
						$step_co['start_lng'] += $inc_delta_lng;

						$search_co[] = array(
							'lat' => $step_co['start_lat'],
							'lng' => $step_co['start_lng'],
						);
					}
					$accumulated_value = 0;  // 積算距離の初期化
				}
				// 積算距離と分割行程の距離が検索円の直径よりも大きくなった場合はPlaces検索座標として始点座標を保存
				elseif (($accumulated_value + $step['distance']['value']) > (2 * $radius)) {
					$search_co[] = array(
						'lat' => $step_co['start_lat'],
						'lng' => $step_co['start_lng'],
					);
					$accumulated_value = 0;  // 積算距離の初期化
				}
				// 分割行程が検索円の直径よりも小さい場合は積算距離に分割行程距離を足すのみ
				else {
					$accumulated_value += $step['distance']['value'];
				}
			}
		}
		// 終点座標もPlaces検索をかけるために配列に保存
		$search_co[] = array(
			'lat' => $whole_process['des_lat'],
			'lng' => $whole_process['des_lng'],
		);

		/** Places検索 **/
		$place_ids   = array();
		$marker_info = array();

		foreach ($search_co as $co) {
			$places = Googlemaps::forge('places');
			$places->execute(array(
				'lat'     => $co['lat'],
				'lng'     => $co['lng'],
				'radius'  => $radius,
				'keyword' => $this->params['keyword'],
			));

			if ($places->is_error()) {
				//TODO エラーなのにMapsが表示されてしまう問題の解決
				// 発生の可能性も少ないのでとりあえず後回し
				Session::set_flash('error', __('app.message.error.request'));
				$this->set('is_success', false);
				return;
			}

			foreach ($places->get_places_results() as $place_info) {
				if (!in_array($place_info['id'], $place_ids)) {
					$places_ids[] = $place_info['id'];

					$marker_info[] = array(
						'id'        => $place_info['id'],
						'name'      => $place_info['name'],
						'vicinity'  => $place_info['vicinity'],
						'lat'       => $place_info['geometry']['location']['lat'],
						'lng'       => $place_info['geometry']['location']['lng'],
						'reference' => $place_info['reference'],
					);
				}
			}
		}

		$this->set(array(
			'is_success'  => true,  // 検索成功フラグ
			'marker_info' => $marker_info,
			'search_co'   => $search_co,
		));
	}
}
