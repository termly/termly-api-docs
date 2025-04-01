// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: 'Termly API Docs',
			social: {
				github: 'https://github.com/termly/apidocs',
			},
			sidebar: [
				{
					label: 'Authentication',
					items: [
						// Each item here is one entry in the navigation menu.
						{ label: 'Authentication', slug: 'introduction/authentication' },
						{ label: 'Make a Request', slug: 'introduction/make-a-request' },
					],
				},
				{
					label: 'Endpoints',
					items: [
						{ label: '(GET) Banners', slug: 'endpoints/banners-get' },
						{ label: '(PUT) Banners', slug: 'endpoints/banners-put' },
					],
				},
			],
		}),
	],
});
