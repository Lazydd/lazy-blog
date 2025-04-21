import path from 'path';
import { writeFileSync } from 'fs';
import { Feed } from 'feed';
import { createContentLoader, type SiteConfig } from 'vitepress';

export async function createRssFile(config: SiteConfig, githubLink: string) {
	const feed = new Feed({
		title: 'ddlazy',
		description: 'lazy-blog',
		id: githubLink,
		link: githubLink,
		language: 'zh-CH',
		image: 'https://gravatar.com/avatar/76088aecc65b259ba9f53f8cbf0d2e30?d=retro',
		favicon: `https://gravatar.com/avatar/76088aecc65b259ba9f53f8cbf0d2e30?d=retro`,
		copyright: 'Copyright © 2023-present ddlazy',
	});

	const posts = await createContentLoader('/blog/**/*.md', {
		excerpt: true,
		render: true,
	}).load();

	posts.sort((a, b) => Number(+getDate(b.url) - +getDate(a.url)));

	for (const { url, excerpt, html } of posts) {
		const lastStr = url.split('/').pop();
		const title = lastStr?.substring(2, lastStr.length - 5) || '';
		feed.addItem({
			title,
			id: `${githubLink}${url}`,
			link: `${githubLink}${url}`,
			description: excerpt,
			content: html?.replaceAll('&ZeroWidthSpace;', ''),
			author: [
				{
					name: 'lazy',
					email: 'ddlazy@qq.com',
					link: githubLink,
				},
			],
			date: getDate(url),
		});
	}

	writeFileSync(path.join(config.outDir, 'feed.xml'), feed.rss2(), 'utf-8');
}

export function getDate(url: string) {
	const date = new Date(url.substring(4, 14));
	if (!isNaN(date.getTime())) return date;
	else return new Date('2024-01-01'); // url中提取不出日期的默认值
}
