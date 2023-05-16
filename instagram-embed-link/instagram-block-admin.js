(function (blocks, editor, components, i18n, element) {

	//wordpress elements used for component creation

	var el = wp.element.createElement
	var registerBlockType = wp.blocks.registerBlockType
	var TextControl = components.TextControl
	var ServerSideRender = wp.serverSideRender
	var { ServerSideRender } = wp.components;


	//SVG Icon

	var instagram_icon =
		el('svg', {
			'width': '40',
			'height': '30',
			'viewBox': '0 0 40 30',
		},
			el('g', {},
				el('path', {
					'fill': '#333333',
					'd': 'M 20 11.875 C 18.277344 11.875 16.878906 13.273438 16.882812 15 C 16.882812 16.726562 18.277344 18.125 20 18.125 C 21.726562 18.125 23.121094 16.726562 23.121094 15 C 23.121094 13.273438 21.722656 11.875 20 11.875 Z M 27.296875 9.472656 C 26.972656 8.65625 26.332031 8.011719 25.515625 7.691406 C 24.289062 7.203125 21.363281 7.3125 20 7.3125 C 18.636719 7.3125 15.714844 7.199219 14.484375 7.691406 C 13.667969 8.011719 13.023438 8.65625 12.703125 9.472656 C 12.21875 10.703125 12.328125 13.636719 12.328125 15 C 12.328125 16.363281 12.21875 19.292969 12.707031 20.527344 C 13.027344 21.34375 13.671875 21.988281 14.484375 22.308594 C 15.714844 22.792969 18.640625 22.6875 20.003906 22.6875 C 21.367188 22.6875 24.285156 22.796875 25.519531 22.308594 C 26.332031 21.988281 26.976562 21.34375 27.296875 20.527344 C 27.785156 19.296875 27.675781 16.363281 27.675781 15 C 27.675781 13.636719 27.785156 10.707031 27.296875 9.472656 Z M 20 19.804688 C 18.058594 19.804688 16.3125 18.632812 15.566406 16.839844 C 14.824219 15.042969 15.234375 12.976562 16.609375 11.601562 C 17.980469 10.226562 20.042969 9.816406 21.835938 10.5625 C 23.628906 11.304688 24.796875 13.058594 24.796875 15 C 24.796875 16.273438 24.292969 17.496094 23.394531 18.398438 C 22.492188 19.300781 21.273438 19.804688 20 19.804688 Z M 24.996094 11.117188 C 24.542969 11.117188 24.132812 10.84375 23.960938 10.421875 C 23.785156 10.003906 23.882812 9.523438 24.203125 9.199219 C 24.523438 8.878906 25.003906 8.785156 25.421875 8.957031 C 25.839844 9.132812 26.113281 9.539062 26.113281 9.992188 C 26.113281 10.292969 25.996094 10.578125 25.789062 10.789062 C 25.578125 11 25.292969 11.117188 24.996094 11.117188 Z M 30.296875 1.875 L 9.703125 1.875 C 8.152344 1.875 6.894531 3.132812 6.894531 4.6875 L 6.894531 25.3125 C 6.894531 26.867188 8.152344 28.125 9.703125 28.125 L 30.296875 28.125 C 31.847656 28.125 33.105469 26.867188 33.105469 25.3125 L 33.105469 4.6875 C 33.105469 3.132812 31.847656 1.875 30.296875 1.875 Z M 29.292969 18.867188 C 29.21875 20.367188 28.875 21.699219 27.78125 22.792969 C 26.6875 23.886719 25.359375 24.234375 23.863281 24.308594 C 22.316406 24.394531 17.6875 24.394531 16.140625 24.308594 C 14.640625 24.230469 13.316406 23.890625 12.222656 22.792969 C 11.125 21.699219 10.78125 20.367188 10.710938 18.867188 C 10.621094 17.320312 10.621094 12.679688 10.710938 11.132812 C 10.785156 9.632812 11.121094 8.300781 12.222656 7.207031 C 13.320312 6.113281 14.648438 5.769531 16.140625 5.695312 C 17.6875 5.609375 22.316406 5.609375 23.863281 5.695312 C 25.363281 5.773438 26.691406 6.117188 27.78125 7.210938 C 28.875 8.308594 29.222656 9.636719 29.292969 11.140625 C 29.382812 12.683594 29.382812 17.316406 29.292969 18.867188 Z M 29.292969 18.867188'
				})
			)
		);

	//Recording block information

	registerBlockType('instagram-embed-link/post', {
		title: i18n.__('Instagram Embed'),
		description: i18n.__('A block to embed your Instagram posts.'),
		icon: instagram_icon,
		keywords: [i18n.__('instagram'), i18n.__('ig'), i18n.__('embed')],
		category: 'embed',
		data: {
			instagram_url: {
				type: 'string',
			},
			instagram_blockquote: {
				type: 'string',
			},
		},

		//Rendering of components on the screen.

		//Server Side is responsible for passing the information to the PHP file
		//Text Control is responsible for capturing the text typed by the user

		edit: function (props) {
			var instagram_url = props.instagram_url;

			return [
				el(ServerSideRender, {
					block: 'instagram-embed-link/post',
					attributes: props.attributes
				}),
				el(
					TextControl, {
					type: 'text',
					label: i18n.__('Enter the URL of the Instagram post'),
					value: instagram_url,

					onChange: function (new_url) {

						//Regex to avoid display time errors

						if (new_url.match(/https:\/\/.*?\/.*?\/.*?\/\?.*/)) {
							new_url = new_url.replace(/(https:\/\/.*?\/.*?\/.*?\/)(\?.*)/, '$1embed$2');
						} else if (new_url.match(/https:\/\/.*?\/.*?\/.*?\//)) {
							new_url = new_url.replace(/(https:\/\/.*?\/.*?\/.*?\/)/, '$1embed');
						} else if (new_url.match(/(https:\/\/.*?\/.*?\/.*?)/)) {
							new_url = new_url.replace(/(https:\/\/.*?\/.*?\/\w+)/, '$1/embed');
						}
						props.setAttributes({ instagram_url: new_url, instagram_blockquote: `<iframe class="instagram-frame" src="${new_url}" frameborder="0" scrolling="no" allowtransparency="true"></iframe>` })
					},
				}
				),
			]
		},

		save: () => {
			return null
		}
	})
})(
	window.wp.blocks,
	window.wp.editor,
	window.wp.components,
	window.wp.i18n,
	window.wp.element
)