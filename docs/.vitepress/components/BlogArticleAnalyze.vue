<script setup lang="ts">
import { useData } from 'vitepress';
import { computed, ref, onMounted, reactive, toRefs } from 'vue';

import { countWord, formatShowDate } from '@ddlazy/utils';

import EditPen from './icon/EditPen.vue';
import AlarmClock from './icon/AlarmClock.vue';
import UserFilled from './icon/UserFilled.vue';
import Clock from './icon/Clock.vue';

defineOptions({ name: 'BlogArticleAnalyze' });

const { frontmatter, theme } = useData();

const data = reactive({
	author: frontmatter.value?.author ?? theme.value.articleMetadataConfig.author,
	date: frontmatter.value?.date || '',
});
const { author, date } = toRefs(data);

const hiddenTime = computed(() => frontmatter.value.date === false);

const $des = ref<HTMLDivElement>();
const timeTitle = computed(() => (frontmatter.value.date ? '发布时间' : '最近修改时间'));

const showAnalyze = computed(
	() => frontmatter.value?.readingTime ?? theme.value?.readingTime ?? true
);

const wordCount = ref(0);
const imageCount = ref(0);

const wordTime = computed(() => {
	return ~~((wordCount.value / 275) * 60);
});

const imageTime = computed(() => {
	const n = imageCount.value;
	if (imageCount.value <= 10) {
		// 等差数列求和
		return n * 13 + (n * (n - 1)) / 2;
	}
	return 175 + (n - 10) * 3;
});

const readTime = computed(() => {
	return Math.ceil((wordTime.value + imageTime.value) / 60);
});

const publishDate = computed(() => formatShowDate(date.value));

const analyze = () => {
	if (!$des.value) {
		return;
	}
	document.querySelectorAll('.meta-des').forEach((v) => v.remove());
	const docDomContainer = window.document.querySelector('#VPContent');

	const imgs = docDomContainer?.querySelectorAll<HTMLImageElement>(
		'.content-container .main img'
	);
	imageCount.value = imgs?.length || 0;

	const words = docDomContainer?.querySelector('.content-container .main')?.textContent || '';
	wordCount.value = countWord(words);

	docDomContainer?.querySelector('h1')?.after($des.value!);
};

onMounted(() => {
	const observer = new MutationObserver(() => {
		const targetInstance = document.querySelector('#hack-article-des');
		if (!targetInstance) {
			analyze();
		}
	});
	observer.observe(document.body, {
		childList: true, // 观察目标子节点的变化，是否有添加或者删除
		subtree: true, // 观察后代节点，默认为 false
	});

	// 初始化时执行一次
	analyze();
});
</script>

<template>
	<div class="doc-analyze" v-if="showAnalyze" data-pagefind-ignore="all">
		<span>
			<EditPen />
			字数：{{ wordCount }} 个字
		</span>
		<span>
			<AlarmClock />
			预计：{{ readTime }} 分钟
		</span>
	</div>
	<div class="meta-des" ref="$des" id="hack-article-des">
		<span v-if="author" class="author">
			<UserFilled title="本文作者" />
			{{ author }}
		</span>
		<span v-if="publishDate && !hiddenTime" class="date">
			<Clock :title="timeTitle" />
			{{ publishDate }}
		</span>
	</div>
</template>

<style scoped lang="less">
.doc-analyze {
	color: var(--vp-c-text-2);
	font-size: 14px;
	margin-bottom: 20px;
	display: flex;
	justify-content: center;
	span {
		margin-right: 16px;
		display: flex;
		align-items: center;
		.dd-icon {
			margin-right: 4px;
		}
	}
}
.meta-des {
	text-align: left;
	color: var(--vp-c-text-2);
	font-size: 14px;
	margin-top: 6px;
	display: flex;
	flex-wrap: wrap;
	span {
		margin-right: 16px;
		display: flex;
		align-items: center;
		.dd-icon {
			margin-right: 4px;
		}
	}
}
</style>
