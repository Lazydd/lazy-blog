<script setup lang="ts">
import Theme from 'vitepress/theme';
import BlogArticleAnalyze from './BlogArticleAnalyze.vue';
import BlogComment from './BlogComment.vue';
import { useData } from 'vitepress';
import { nextTick, provide } from 'vue';
defineOptions({ name: 'BlogApp' });

const { Layout } = Theme;
const { isDark } = useData();

const enableTransitions = () =>
	'startViewTransition' in document &&
	window.matchMedia('(prefers-reduced-motion: no-preference)').matches;

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
	if (!enableTransitions()) {
		isDark.value = !isDark.value;
		return;
	}

	const clipPath = [
		`circle(0px at ${x}px ${y}px)`,
		`circle(${Math.hypot(
			Math.max(x, innerWidth - x),
			Math.max(y, innerHeight - y)
		)}px at ${x}px ${y}px)`,
	];

	await document.startViewTransition(async () => {
		isDark.value = !isDark.value;
		await nextTick();
	}).ready;

	document.documentElement.animate(
		{ clipPath: isDark.value ? clipPath.reverse() : clipPath },
		{
			duration: 300,
			easing: 'ease-in',
			pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
		}
	);
});
</script>

<template>
	<Layout>
		<template #layout-top></template>
		<template #doc-before>
			<slot name="doc-before" />
			<ClientOnly>
				<BlogArticleAnalyze />
			</ClientOnly>
		</template>

		<!-- 评论 -->
		<template #doc-after>
			<slot name="doc-after" />
			<BlogComment />
		</template>

		<!-- 透传默认主题的其它插槽 -->
		<!-- navbar -->
		<template #nav-bar-title-before><slot name="nav-bar-title-before" /></template>
		<template #nav-bar-title-after><slot name="nav-bar-title-after" /></template>
		<template #nav-bar-content-after><slot name="nav-bar-content-after" /></template>
		<template #nav-screen-content-before><slot name="nav-screen-content-before" /></template>
		<template #nav-screen-content-after><slot name="nav-screen-content-after" /></template>

		<!-- sidebar -->
		<template #sidebar-nav-before><slot name="sidebar-nav-before" /></template>

		<!-- content -->
		<template #page-top><slot name="page-top" /></template>
		<template #page-bottom><slot name="page-bottom" /></template>

		<template #not-found><slot name="not-found" /></template>
		<template #home-hero-info><slot name="home-hero-info" /></template>
		<template #home-hero-image><slot name="home-hero-image" /></template>
		<template #home-hero-after><slot name="home-hero-after" /></template>
		<template #home-features-before><slot name="home-features-before" /></template>
		<template #home-features-after><slot name="home-features-after" /></template>

		<template #doc-footer-before><slot name="doc-footer-before" /></template>

		<template #doc-top><slot name="doc-top" /></template>
		<template #doc-bottom><slot name="doc-bottom" /></template>

		<template #aside-top><slot name="aside-top" /></template>
		<template #aside-bottom><slot name="aside-bottom" /></template>
		<template #aside-outline-before><slot name="aside-outline-before" /></template>
		<template #aside-outline-after><slot name="aside-outline-after" /></template>
		<template #aside-ads-before><slot name="aside-ads-before" /></template>
		<template #aside-ads-after><slot name="aside-ads-after" /></template>
	</Layout>
</template>
<style lang="scss">
::view-transition-old(root),
::view-transition-new(root) {
	animation: none;
	mix-blend-mode: normal;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
	z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
	z-index: 9999;
}

.VPSwitchAppearance {
	width: 22px !important;
}

.VPSwitchAppearance .check {
	transform: none !important;
}
</style>
