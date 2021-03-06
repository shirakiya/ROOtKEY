<?php

class Pagination extends \Fuel\Core\Pagination
{
	/**
	 * 現在表示しているページの要素の開始件数を返す
	 * @return int
	 */
	public function get_start_num()
	{
		return (int)$this->offset + 1;
	}

	/**
	 * 現在表示しているページの要素の終了件数を返す
	 * @return int
	 */
	public function get_end_num()
	{
		$end_num = $this->offset + $this->per_page;

		if ($end_num <= $this->total_items) {
			return $end_num;
		}
		return $this->total_items;
	}

	/**
	 * ページング情報を配列にして返す
	 * @return array
	 */
	public function format_response_array()
	{
		return array(
			'total_items' => $this->total_items,
			'start_num'   => $this->get_start_num(),
			'end_num'     => $this->get_end_num(),
		);
	}
}
