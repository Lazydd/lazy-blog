<script setup lang="ts">
import { withBase } from 'vitepress';
import { onMounted, useTemplateRef } from 'vue';
import mediumZoom from 'medium-zoom';

defineOptions({ name: 'ZoomImg' });

const { src = '' } = defineProps<{
	src: string;
}>();

const imgRef = useTemplateRef('img');

onMounted(() => {
	mediumZoom(imgRef.value, { background: 'var(--vp-c-bg)' });
});
</script>

<template>
	<img ref="img" :src="withBase(src)" :alt="withBase(src)" :title="withBase(src)" />
</template>

<style>
.medium-zoom-overlay {
	z-index: 20;
}
.medium-zoom-image {
	/* width: 100%; */
	border-radius: 8px;
	z-index: 26;
}
</style>
