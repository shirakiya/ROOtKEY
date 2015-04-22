<?php
/**
 * API系のException定義
 */

/**
 * 403 エラー
 */
class ApiHttpForbiddenException extends ApiHttpException
{
	protected $code    = 403;
	protected $message = 'Forbidden';
}

/**
 * 404 エラー
 */
class ApiHttpNotFoundException extends ApiHttpException
{
	protected $code    = 404;
	protected $message = 'Not Found';
}

/**
 * 500 エラー
 */
class ApiHttpServerErrorException extends ApiHttpException
{
	protected $code    = 500;
	protected $message = 'Internal Server Error';
}
