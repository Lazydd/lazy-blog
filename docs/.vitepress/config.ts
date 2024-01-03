import { headerPlugin } from './plugin/headerMdPlugin';
import { MarkdownTransform } from './plugin/markdownTransform';
import { ChangeLog } from './plugin/changelog';
import { getChangeLog } from '../../scripts/changelog';
import { demoblockPlugin, demoblockVitePlugin } from 'vitepress-theme-demoblock-fork';
import { RssPlugin, RSSOptions } from 'vitepress-plugin-rss';
import vueJsx from '@vitejs/plugin-vue-jsx';
import algoliaSearchOptions from './search/algolia';
import UnoCSS from 'unocss/vite';
import { siteName, githubRepoLink, githubLink } from './meta';

const RSS: RSSOptions = {
	title: 'ddlazy',
	baseUrl: githubLink,
	id: githubLink,
	link: githubLink,
	description: 'lazy-blog',
	language: 'zh-cn',
	copyright: 'Copyright © 2023-present ddlazy',
	url: `${githubLink}/feed.rss`,
};

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
			RssPlugin(RSS),
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
	themeConfig: {
		i18nRouting: true,
		logo: '/logo.svg',
		socialLinks: [{ icon: 'github', link: githubRepoLink }],
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
			text: 'rust',
			items: [
				{
					text: '安装',
					link: '/blog/rust/install',
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
