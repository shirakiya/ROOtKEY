<?php

return array(
	// the active pagination template
	'active'                      => 'default',
	'default'                     => array(
		'wrapper'                 => "<ul class=\"pagination\">\n\t{pagination}\n</ul>\n",

		'first'                   => "<li class=\"arrow\">\n\t{link}\n</li>\n",
		'first-marker'            => "<i class=\"fa fa-angle-double-left\"></i>",
		'first-link'              => "\t\t<a href=\"{uri}\">{page}</a>\n",

		'first-inactive'          => "",
		'first-inactive-link'     => "",

		'previous'                => "<li class=\"previous\">\n\t{link}\n</li>\n",
		'previous-marker'         => "<i class=\"fa fa-angle-left\"></i>",
		'previous-link'           => "\t\t<a href=\"{uri}\" rel=\"prev\">{page}</a>\n",

		'previous-inactive'       => "<li class=\"previous-current\">\n\t{link}\n</li>\n",
		'previous-inactive-link'  => "\t\t<a href=\"#\" rel=\"prev\">{page}</a>\n",

		'regular'                 => "<li>\n\t{link}\n</li>\n",
		'regular-link'            => "\t\t<a href=\"{uri}\">{page}</a>\n",

		'active'                  => "<li class=\"current\">\n\t{link}\n</li>\n",
		'active-link'             => "\t\t<a href=\"#\">{page}</a>\n",

		'next'                    => "<li class=\"next\">\n\t{link}\n</li>\n",
		'next-marker'            => "<i class=\"fa fa-angle-right\"></i>",
		'next-link'               => "\t\t<a href=\"{uri}\" rel=\"next\">{page}</a>\n",

		'next-inactive'           => "<li class=\"next-current\">\n\t{link}\n</li>\n",
		'next-inactive-link'      => "\t\t<a href=\"#\" rel=\"next\">{page}</a>\n",

		'last'                    => "<li class=\"arrow\">\n\t{link}\n</li>\n",
		'last-marker'             => "<i class=\"fa fa-angle-double-right\"></i>",
		'last-link'               => "\t\t<a href=\"{uri}\">{page}</a>\n",

		'last-inactive'           => "",
		'last-inactive-link'      => "",
	),

	'config' => array(
		'mypage' => array(
			'uri_segment' => 3,
			'num_links'   => 5,
			'per_page'    => 9,
			'show_first'  => true,
			'show_last'   => true,
		),
	),
);
