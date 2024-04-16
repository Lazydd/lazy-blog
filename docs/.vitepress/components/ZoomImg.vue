<script setup lang="ts">
import { withBase } from 'vitepress';
import { onMounted, ref } from 'vue';
import mediumZoom from 'medium-zoom';

defineOptions({ name: 'ZoomImg' });

withDefaults(
	defineProps<{
		src: string;
	}>(),
	{
		src: '',
	}
);

const imgRef = ref();

onMounted(() => {
	mediumZoom(imgRef.value, { background: 'var(--vp-c-bg)' });
});
</script>

<template>
	<img ref="imgRef" :src="withBase(src)" :alt="withBase(src)" :title="withBase(src)" />
</template>

<style>
.medium-zoom-overlay {
	z-index: 20;
}
.medium-zoom-image {
	/* width: 100%; */
	border-radius: 8px;
	z-index: 21;
}
</style>
