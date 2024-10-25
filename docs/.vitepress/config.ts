import { headerPlugin } from './plugin/headerMdPlugin';
import { MarkdownTransform } from './plugin/markdownTransform';
import { ChangeLog } from './plugin/changelog';
import { getChangeLog } from '../../scripts/changelog';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock-fork';
import { createRssFile } from './plugin/rss';
import vueJsx from '@vitejs/plugin-vue-jsx';
import algoliaSearchOptions from './search/algolia';
import UnoCSS from 'unocss/vite';
import { siteName, githubRepoLink, githubLink } from './meta';
import type { SiteConfig } from 'vitepress';

const extraHead =
	process.env.NODE_ENV === 'production'
		? [
				[
					'script',
					{
						async: '',
						src: 'https://www.googletagmanager.com/gtag/js?id=G-Z1JVP1P6MT',
					},
				],
				[
					'script',
					{},
					`window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());

					gtag('config', 'G-Z1JVP1P6MT');`,
				],
				[
					'script',
					{},
					`var _hmt = _hmt || [];
					(function() {
					  var hm = document.createElement("script");
					  hm.src = "https://hm.baidu.com/hm.js?3eccaa8a84828bdf267676a4b44f01bb";
					  var s = document.getElementsByTagName("script")[0];
					  s.parentNode.insertBefore(hm, s);
					})();`,
				],
		  ]
		: [];

const [changeLog] = await Promise.all([getChangeLog(800)]);

export default {
	title: siteName,
	head: [
		[
			'meta',
			{
				name: 'google-site-verification',
				content: 'pliM8nmbxXXWli97aWKp8dgPJttPmxt0lvBTSquCjJI',
			},
		],
		['link', { rel: 'icon', href: '/lazy-blog/favicon.ico', type: 'image/x-icon' }],
		...extraHead,
	],
	outDir: '../dist/lazy-blog',
	srcDir: 'src',
	base: '/lazy-blog/',
	description: 'lazy-blog',
	lastUpdated: true,
	cleanUrls: true,
	ignoreDeadLinks: true,
	sitemap: {
		hostname: githubLink,
		// transformItems(items) {
		// 	return items.filter((item) => !item.url.includes('migration'));
		// },
	},
	markdown: {
		// lineNumbers: true,//行号
		config(md) {
			md.use(headerPlugin);
			md.use(demoblockPlugin, {
				customClass: 'demoblock-custom',
			});
		},
		image: {
			lazyLoading: true,
		},
	},
	vue: {
		template: {
			ssr: true,
			compilerOptions: {
				isCustomElement: (tag) => customElements.includes(tag),
			},
		},
	},
	vite: {
		plugins: [
			demoblockVitePlugin(),
			vueJsx(),
			MarkdownTransform(),
			ChangeLog(changeLog),
			UnoCSS(),
		],
		resolve: {
			alias: {
				'@': process.cwd(),
			},
		},
		server: {
			host: true,
		},
		json: {
			stringify: true,
		},
	},
	buildEnd: (config: SiteConfig) => {
		createRssFile(config, githubLink);
	},
	themeConfig: {
		i18nRouting: true,
		logo: '/logo.svg',
		socialLinks: [
			{ icon: 'github', link: githubRepoLink },
			{
				icon: {
					svg: '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512"><title>RSS</title><path d="M108.56,342.78a60.34,60.34,0,1,0,60.56,60.44A60.63,60.63,0,0,0,108.56,342.78Z"/><path d="M48,186.67v86.55c52,0,101.94,15.39,138.67,52.11s52,86.56,52,138.67h86.66C325.33,312.44,199.67,186.67,48,186.67Z"/><path d="M48,48v86.56c185.25,0,329.22,144.08,329.22,329.44H464C464,234.66,277.67,48,48,48Z"/></svg>',
				},
				link: '/lazy-blog/feed.xml',
			},
		],
		nav: [
			{
				text: '更新日志',
				link: '/changeLog',
				activeMatch: '^/changeLog',
			},
			{
				text: '文档',
				link: '/blog/web/html',
				activeMatch: '^/blog/',
			},
			{
				text: '软件',
				link: '/softWare',
				activeMatch: '^/softWare',
			},
			{
				text: '配置',
				link: '/config',
				activeMatch: '^/config',
			},
		],
		sidebar: {
			'/blog/': getGuide(),
		},
		outline: {
			label: '本页目录',
			level: 'deep',
		},
		editLink: {
			pattern: `${githubRepoLink}/edit/main/docs/src/:path`,
			text: '在GitHub上编辑',
		},
		lastUpdated: {
			text: '上次更新',
		},
		docFooter: {
			prev: '上一页',
			next: '下一页',
		},
		search: {
			provider: 'algolia',
			options: algoliaSearchOptions,
		},
		footer: {
			message: 'Released under the MIT License.',
			copyright: 'Copyright © 2023-present ddlazy',
		},
		articleMetadataConfig: {
			author: 'lazy',
		},
		commentConfig: {
			repo: 'Lazydd/lazy-blog',
			repoId: 'R_kgDOKPGS7g',
			category: 'Announcements',
			categoryId: 'DIC_kwDOKPGS7s4CZRAd',
			inputPosition: 'top',
		},
	},
};
const customElements = [
	'mjx-container',
	'mjx-assistive-mml',
	'math',
	'maction',
	'maligngroup',
	'malignmark',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mi',
	'mlongdiv',
	'mmultiscripts',
	'mn',
	'mo',
	'mover',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'ms',
	'mscarries',
	'mscarry',
	'mscarries',
	'msgroup',
	'mstack',
	'mlongdiv',
	'msline',
	'mstack',
	'mspace',
	'msqrt',
	'msrow',
	'mstack',
	'mstack',
	'mstyle',
	'msub',
	'msup',
	'msubsup',
	'mtable',
	'mtd',
	'mtext',
	'mtr',
	'munder',
	'munderover',
	'semantics',
	'math',
	'mi',
	'mn',
	'mo',
	'ms',
	'mspace',
	'mtext',
	'menclose',
	'merror',
	'mfenced',
	'mfrac',
	'mpadded',
	'mphantom',
	'mroot',
	'mrow',
	'msqrt',
	'mstyle',
	'mmultiscripts',
	'mover',
	'mprescripts',
	'msub',
	'msubsup',
	'msup',
	'munder',
	'munderover',
	'none',
	'maligngroup',
	'malignmark',
	'mtable',
	'mtd',
	'mtr',
	'mlongdiv',
	'mscarries',
	'mscarry',
	'msgroup',
	'msline',
	'msrow',
	'mstack',
	'maction',
	'semantics',
	'annotation',
	'annotation-xml',
];
function getGuide() {
	return [
		{
			text: 'web',
			// collapsed: false,
			items: [
				{
					text: 'html',
					link: '/blog/web/html',
				},
				{
					text: 'css',
					link: '/blog/web/css',
				},
				{
					text: 'javaScript',
					link: '/blog/web/javaScript',
				},
				{
					text: 'vue',
					link: '/blog/web/vue',
				},
				{
					text: 'react',
					link: '/blog/web/react',
				},
				{
					text: 'axios',
					link: '/blog/web/axios',
				},
			],
		},
		{
			text: 'node',
			items: [
				{
					text: 'mqtt',
					link: '/blog/node/mqtt',
				},
			],
		},
		{
			text: 'rust',
			items: [
				{
					text: '安装',
					link: '/blog/rust/install',
				},
			],
		},
		{
			text: '多媒体',
			items: [
				{
					text: '实时语音通信',
					link: '/blog/多媒体/实时语音通信',
				},
			],
		},
		{
			text: '嵌入式',
			items: [
				{
					text: '蓝牙通信',
					link: '/blog/嵌入式/蓝牙通信',
				},
			],
		},
		{
			text: 'docker',
			items: [
				{
					text: '安装',
					link: '/blog/docker/install',
				},
				{
					text: 'Nginx',
					link: '/blog/docker/nginx',
				},
				{
					text: 'Java',
					link: '/blog/docker/java',
				},
				{
					text: 'Mysql',
					link: '/blog/docker/mysql',
				},
				{
					text: 'Redis',
					link: '/blog/docker/redis',
				},
				{
					text: 'Verdaccio',
					link: '/blog/docker/verdaccio',
				},
			],
		},
		{
			text: 'utils',
			items: [
				{
					text: 'Nvm',
					link: '/blog/utils/nvm',
				},
				{
					text: 'Fvm',
					link: '/blog/utils/fvm',
				},
				{
					text: 'Yrm',
					link: '/blog/utils/yrm',
				},
				{
					text: 'Git',
					link: '/blog/utils/git',
				},
				{
					text: 'PM2',
					link: '/blog/utils/pm2',
				},
				{
					text: 'font-spider',
					link: '/blog/utils/font-spider',
				},
			],
		},
	];
}
