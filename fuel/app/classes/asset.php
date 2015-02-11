<?php

class Asset extends \Fuel\Core\Asset
{
	// @var string coffeescriptのファイル名(拡張子付き)
	protected static $_cs_filename = '';

	// @var string javascriptのファイル名(拡張子付き)
	protected static $_js_filename = '';

	// @var string coffeescriptのファイルのフルパス
	protected static $_cs_fullpath = '';

	// @var string javascriptのファイルのフルパス
	protected static $_js_fullpath = '';

	// @var string コンパイル結果のjavascript
	protected static $_js = '';


	public static function _init()
	{
		parent::_init();
		Config::load('coffeescript', true, false, false);
	}

	/**
	 * coffeescriptをコンパイルして、jsとして吐き出す
	 * 例) <?php echo Asset::coffee('hoge'); ?>
	 * <script type="text/javascript" src='http://sample.com/asset/js/hoge.js'></script>
	 * と出力される
	 *
	 * @param $filename coffeescriptのファイル名
	 * @return Asset::js('$filename)の返り値
	 */
	public static function coffee($filename)
	{
		static::$_cs_filename = $filename.'.coffee';
		static::$_js_filename = $filename.'.js';
		static::$_cs_fullpath = Config::get('coffeescript.coffee_dir').static::$_cs_filename;
		static::$_js_fullpath = Config::get('coffeescript.js_dir').static::$_js_filename;

		// 既にあるファイルとの差分がある場合にコンパイル実行
		if (File::exists(static::$_js_fullpath) && (File::get_time(static::$_cs_fullpath) > File::get_time(static::$_js_fullpath)))
		{
			static::_compile($filename);
			static::_write($filename);
		}

		return static::js(static::$_js_filename);
	}

	/**
	 * coffeescriptをコンパイルする
	 *
	 * @param $filename coffeescriptのファイル名
	 */
	private static function _compile($filename)
	{
		try {
			$coffee = File::read(static::$_cs_fullpath, true);
			static::$_js = CoffeeScript\Compiler::compile($coffee, array('header' => false));
		} catch (Exception $e) {
			Log::error($e->getMessage());
		}
	}

	/**
	 * コンパイル結果のjavascriptをpublic/asset/js以下に設置する
	 *
	 * @param $filename coffeescriptのファイル名
	 */
	private static function _write()
	{
		File::update(Config::get('coffeescript.js_dir'), static::$_js_filename, static::$_js);
	}
}
