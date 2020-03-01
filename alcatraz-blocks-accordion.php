<?php
/**
 * Plugin Name:     Alcatraz Blocks Accordion
 * Plugin URI:      https://github.com/alcatraz-components/accordion-block.git
 * Description:     A simple plugin scaffold for a WP Content Block.
 * Author:          carrieforde
 * Author URI:      https://carrieforde.com
 * Text Domain:     alcatraz-blocks-accordion
 * Domain Path:     /languages
 * Version:         1.0.0
 *
 * @package         Block_Scaffold
 */

// Your code starts here.
add_action( 'init', 'alcatraz_blocks_accordion_init' );
/**
 * Registers all block assets so that they can be enqueued through Gutenberg in
 * the corresponding context.
 *
 * @see https://wordpress.org/gutenberg/handbook/designers-developers/developers/tutorials/block-tutorial/applying-styles-with-stylesheets/
 */
function alcatraz_blocks_accordion_init() {
	// Skip block registration if Gutenberg is not enabled/merged.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	$index_js = 'dist/alcatraz-blocks-accordion-block.js';
	wp_register_script(
		'alcatraz-blocks-accordion-editor',
		plugins_url( $index_js, __FILE__ ),
		array(
			'wp-blocks',
			'wp-components',
			'wp-editor',
			'wp-element',
			'wp-i18n',
			'wp-compose',
		),
		'1.0.0',
		false
	);

	register_block_type(
		'alcatraz-blocks-accordion/alcatraz-blocks-accordion',
		array(
			'editor_script' => 'alcatraz-blocks-accordion-editor',
		)
	);
}

add_action( 'wp_enqueue_scripts', 'alcatraz_blocks_accordion_enqueue_scripts' );
/**
 *  Enqueue front end scripts.
 */
function alcatraz_blocks_accordion_enqueue_scripts() {
	if ( has_block( 'alcatraz-blocks-accordion/alcatraz-blocks-accordion' ) ) {

		$index_js = 'dist/alcatraz-blocks-accordion-component.js';

		wp_enqueue_script(
			'alcatraz-blocks-accordion-component',
			plugins_url( $index_js, __FILE__ ),
			array(),
			'1.0.0',
			false
		);
	}
}

add_filter( 'script_loader_tag', 'alcatraz_blocks_accordion_script_attributes', 10, 2 );
/**
 * Modify script attributes.
 */
function alcatraz_blocks_accordion_script_attributes( $tag, $handle ) {
	if ( 'alcatraz-blocks-accordion-component' !== $handle ) {
		return $tag;
	}

	return str_replace( "type='text/javascript' src", ' type="module"  async src', $tag );
}
