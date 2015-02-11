<?php

class Asset extends \Fuel\Core\Asset
{
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
		static::_compile($filename);
		static::_write($filename);
		return static::js($filename.'.js');
	}

	/**
	 * coffeescriptをコンパイルする
	 *
	 * @param $filename coffeescriptのファイル名
	 */
	private static function _compile($filename)
	{
		try {
			// 目的のファイルの内容を文字列としてフルパスで取得
			$coffee = File::read(Config::get('coffeescript.coffee_dir').$filename.'.coffee', true);

			static::$_js = CoffeeScript\Compiler::compile($coffee, array(
				'filename' => $filename,
				'header'   => false,
			));
		} catch (Exception $e) {
			Log::error($e->getMessage());
		}
	}

	/**
	 * コンパイル結果のjavascriptをpublic/asset/js以下に設置する
	 *
	 * @param $filename coffeescriptのファイル名
	 */
	private static function _write($filename)
	{
		$js_filename = $filename.'.js';
		File::update(Config::get('coffeescript.js_dir'), $js_filename, static::$_js);
	}
}
