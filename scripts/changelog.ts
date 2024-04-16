import md5 from 'md5';
import Git from 'simple-git';
import type { CommitInfo, ContributorInfo } from './types/changelog';
const git = Git({
	maxConcurrentProcesses: 200,
});

let cache: CommitInfo[] | undefined;
function uniq<T extends any[]>(a: T) {
	return Array.from(new Set(a));
}
export async function getChangeLog(count = 200) {
	if (cache) return cache;

	const logs = (await git.log({ maxCount: count })).all.filter((i) => {
		return (
			i.message.includes('release: ') ||
			i.message.includes('!') ||
			i.message.startsWith('feat') ||
			i.message.startsWith('fix') ||
			i.message.startsWith('style')
		);
	}) as CommitInfo[];

	for (const log of logs) {
		if (log.message.includes('release: ')) {
			log.version = log.message.split(' ')[1].trim();
			continue;
		}
		const raw = await git.raw([
			'diff-tree',
			'--no-commit-id',
			'--name-only',
			'-r',
			'-M',
			log.hash,
		]);
		delete log.body;
		const files = raw.replace(/\\/g, '/').trim().split('\n');

		log.path = uniq(files);
		log.authorAvatar = md5(log.author_email);
	}
	const result = logs.filter((i) => i.path?.length || i.version);
	cache = result;
	return result;
}

export async function getContributorsAt(path: string) {
	const list = (await git.raw(['log', '--pretty=format:"%an|%ae"', '--', path]))
		.split('\n')
		.map((i) => i.slice(1, -1).split('|') as [string, string]);
	const map: Record<string, ContributorInfo> = {};

	list.filter((i) => i[1]).forEach((i) => {
		if (!map[i[1]]) {
			map[i[1]] = {
				name: i[0],
				count: 0,
				hash: md5(i[1]),
			};
		}
		map[i[1]].count++;
	});

	return Object.values(map).sort((a, b) => b.count - a.count);
}
