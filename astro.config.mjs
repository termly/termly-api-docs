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
						{ label: '(POST) Collaborators', slug: 'endpoints/collaborators-post' },
						{ label: '(GET) Collaborators', slug: 'endpoints/collaborators-get' },
						{ label: '(PUT) Collaborators', slug: 'endpoints/collaborators-put' },
						{ label: '(DELETE) Collaborators', slug: 'endpoints/collaborators-delete' },
					],
				},
			],
		}),
	],
});
