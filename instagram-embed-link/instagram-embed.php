<?php

/**
 * @link              https://github.com/DFelps/
 * @since             0.1
 * @package           Instagram Embed Link
 *
 * Plugin Name:       Instagram Embed Link
 * Plugin URI:        https://github.com/DFelps/
 * Description:       Facilitate instagram embed links with just the url without login.
 * Version:           0.1
 * Author:            Daniel Siqueira
 * Author URI:        https://github.com/DFelps/
 * Text Domain:       instagram-embed-link
 */

use function GuzzleHttp\Psr7\str;

wp_enqueue_style( 'style', get_home_url() . '/wp-content/plugins/instagram-embed-link/style-instagram.css' );

if (!defined('WPINC')) {
	die;
}


/*
 * Handle Instagram oEmbed
 */
function ebinstagram_embed_callback($attributes)
{
	$instagram_url = trim($attributes['instagram_url']);
	$instagram_blockquote = trim($attributes['instagram_blockquote']);


	if ('' === trim($instagram_url)) {
		$content = '<p>' . esc_html__('Enter the Instagram post link in the text field above.', 'instagram-embed-link/post') . '</p>';
	} else {
		if (filter_var($instagram_url, FILTER_VALIDATE_URL)) {
			$content = $instagram_blockquote;
		} else {
			$content = '<p>' . esc_html__('No information available. Please check the provided URL.', 'instagram-embed-link/post') . '</p>';
		}
	}

	return (apply_filters('the_content',  $content));
}


/*
 * Declare Instagram oEmbed and add assets
 */
function ebinstagram_enqueue_scripts()
{
	wp_register_script(
		'ebinstagram-embed-post',
		plugins_url('instagram-block-admin.js', __FILE__),
		array('wp-blocks', 'wp-components', 'wp-element', 'wp-i18n', 'wp-editor'),
		filemtime(plugin_dir_path(__FILE__) . 'instagram-block-admin.js')
	);

	register_block_type('instagram-embed-link/post', array(
		'editor_script'   => 'ebinstagram-embed-post',
		'render_callback' => 'ebinstagram_embed_callback',
		'attributes'      => array(
			'instagram_url' => array('type' => 'string'),
			'instagram_blockquote' => array('type' => 'string'),
		),
	));
}
add_action('init', 'ebinstagram_enqueue_scripts');
