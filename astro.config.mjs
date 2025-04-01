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
						{ label: '(GET) Collaborators', slug: 'endpoints/collaborators-get' },
						{ label: '(PUT) Collaborators', slug: 'endpoints/collaborators-put' },
						{ label: '(POST) Collaborators', slug: 'endpoints/collaborators-post' },
						{ label: '(DELETE) Collaborators', slug: 'endpoints/collaborators-delete' },
						{ label: '(GET) Cookies', slug: 'endpoints/cookies-get' },
						{ label: '(PUT) Cookies', slug: 'endpoints/cookies-put' },
						{ label: '(POST) Cookies', slug: 'endpoints/cookies-post' },
						{ label: '(DELETE) Cookies', slug: 'endpoints/cookies-delete' },
						{ label: '(GET) Custom Consent Themes', slug: 'endpoints/custom-consent-themes-get' },
						{ label: '(PUT) Custom Consent Themes', slug: 'endpoints/custom-consent-themes-put' },
						{ label: '(POST) Custom Consent Themes', slug: 'endpoints/custom-consent-themes-post' },
						{ label: '(DELETE) Custom Consent Themes', slug: 'endpoints/custom-consent-themes-delete' },
						{ label: '(GET) Websites', slug: 'endpoints/websites-get' },
						{ label: '(PUT) Websites', slug: 'endpoints/websites-put' },
						{ label: '(POST) Websites', slug: 'endpoints/websites-post' },
						{ label: '(DELETE) Websites', slug: 'endpoints/websites-delete' },
					],
				},
			],
		}),
	],
});
