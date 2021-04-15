<?php

/*
Plugin Name: Block Editor Custom Field Sample
Plugin URI: http://URI_Of_Page_Describing_Plugin_and_Updates
Description: A brief description of the Plugin.
Version: 1.0
Author: torounit
Author URI: https://torounit.com
License: GPL2 or later.
*/

require_once __DIR__ . '/vendor/autoload.php';

add_action( 'init', function () {
	$fields = new \HAMWORKS\Block_Editor_Custom_Field_Sample\Fields( __DIR__ . '/fields.json' );
});

add_action(
	'enqueue_block_editor_assets',
	function() {
		$asset_file = include __DIR__ . '/build/index.asset.php';
		wp_enqueue_script(
			'block-editor-custom-field-sample',
			plugins_url( 'build/index.js', __FILE__ ),
			$asset_file['dependencies'],
			$asset_file['version'],
			true
		);
	}
);
