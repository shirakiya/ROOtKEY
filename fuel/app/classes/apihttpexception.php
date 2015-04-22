<?php
/**
 * API系のException定義
 */
class ApiHttpException extends \Fuel\Core\Exception
{
	/**
	 * レスポンスを返す
	 * @return json 下記形式のResponseを返す
	 *
	 * Status: <code>
	 * Content-Type: application/json; charset=utf-8
	 * X-Content-Type-Options: nosniff;
	 *
	 * { 'error' => 1, 'message' => '<message>' }
	 */
	public function response()
	{
		$response = new Response();
		$response->set_status($this->getCode());
		$response->set_header('Content-Type', 'application/json; charset=utf-8');
		$response->set_header('X-Content-Type-Options', 'nosniff');

		Log::error('thrown message:'.$this->getMessage());

		return $response->body(Format::forge(array(
			'error'   => 1,
			'message' => $this->getMessage(),
		))->to_json());
	}
}
