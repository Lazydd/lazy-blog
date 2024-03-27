import { relative, resolve } from 'node:path';
import type { Plugin } from 'vite';
import { includes } from '../meta';
export function MarkdownTransform(): Plugin {
	const ROOT = resolve(__dirname, '../../src');

	return {
		name: 'vueuse-md-transform',
		enforce: 'pre',
		async transform(code, id) {
			if (!id.endsWith('.md')) return null;
			const ids = relative(ROOT, id);
			const [pkg, name, i] = id.split('/').slice(-3);
			if (
				ids
					.replace(/\\/g, '/')
					.replace('.md', '/.md')
					.match(RegExp(`^(${includes.join('|')})\\/`))
			) {
				// 对index.md进行处理
				// 使用拼接字符串的方式拼接Demo,贡献者信息和更新日志
				const { footer } = await getFunctionMarkdown(pkg, name);

				code = `${code}\n\n${footer}`;
			}
			return code;
		},
	};
}

export async function getFunctionMarkdown(kg: string, name: string) {
	const contributorsSection = `
  ## 贡献者
  
  <Contributors fn="${name}"/>
  `;

	const changelogSection = `
  ## 变更记录
  
  <Changelog fn="${name}"/>
  `;
	const footer = `${contributorsSection}\n${changelogSection}\n`;

	return {
		footer,
	};
}
