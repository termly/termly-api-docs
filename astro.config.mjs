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
			customCss: [
				'./src/styles/custom.css',
			],
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
						{
							label: 'Banners',
							items: [
								{ label: 'GET', slug: 'endpoints/banners-get' },
								{ label: 'PUT', slug: 'endpoints/banners-put' },
							]
						},
						{
							label: 'Collaborators',
							items: [
								{ label: 'GET', slug: 'endpoints/collaborators-get' },
								{ label: 'PUT', slug: 'endpoints/collaborators-put' },
								{ label: 'POST', slug: 'endpoints/collaborators-post' },
								{ label: 'DELETE', slug: 'endpoints/collaborators-delete' },
							]
						},
						{
							label: 'Cookies',
							items: [
								{ label: 'GET', slug: 'endpoints/cookies-get' },
								{ label: 'PUT', slug: 'endpoints/cookies-put' },
								{ label: 'POST', slug: 'endpoints/cookies-post' },
								{ label: 'DELETE', slug: 'endpoints/cookies-delete' },
							]
						},
						{
							label: 'Custom Consent Themes',
							items: [
								{ label: 'GET', slug: 'endpoints/custom-consent-themes-get' },
								{ label: 'PUT', slug: 'endpoints/custom-consent-themes-put' },
								{ label: 'POST', slug: 'endpoints/custom-consent-themes-post' },
								{ label: 'DELETE', slug: 'endpoints/custom-consent-themes-delete' },
							]
						},
						{
							label: 'Documents',
							items: [
								{ label: 'GET', slug: 'endpoints/document-preview' },
								{ label: 'POST', slug: 'endpoints/publish-cookie-policy' },
							]
						},
						{
							label: 'Scan',
							items: [
								{ label: 'POST', slug: 'endpoints/trigger-scan' },
							]
						},
						{
							label: 'Scan Reports',
							items: [
								{ label: 'GET', slug: 'endpoints/scan-reports-get' },
							]
						},
						{
							label: 'Websites',
							items: [
								{ label: 'GET', slug: 'endpoints/websites-get' },
								{ label: 'PUT', slug: 'endpoints/websites-put' },
								{ label: 'POST', slug: 'endpoints/websites-post' },
								{ label: 'DELETE', slug: 'endpoints/websites-delete' },
							]
						},
					],
				},
			],
		}),
	],
});
