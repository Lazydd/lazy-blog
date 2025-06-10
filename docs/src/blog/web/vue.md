# Vue

[官网地址](https://cn.vuejs.org/)

## 环境搭建

:::tip 注意
第三个命令为兼容低版本
:::

```bash
npm install vue
```

```bash
npm install @vue/cli -g
```

```bash
npm install -g @vue/cli-init
```

## 搜索的关键字高亮

:::info 提示
此时我们只需将调整 `<em>` 标签的样式即可
:::

```jsx
const list = [];
const reg = new RegExp(name, 'gi');
const node = list.map((item) => {
	let name = item.name.replace(reg, (key) => {
		return <em>{key}</em>;
	});
	return <li>{name}</li>;
});
```

## 本地开启 https

```bash
npm install vite-plugin-mkcert
```

### vite.config.ts

```ts
import mkcert from 'vite-plugin-mkcert';

export default defineConfig({
	plugins: [mkcert()],
	server: {
		https: true,
	},
});
```

## 读取本地文件

<image src="https://raw.githubusercontent.com/Lazydd/images/main/20250610125404331.webp" />

```vue
<script setup lang="ts">
import hljs from 'highlight.js';
import 'highlight.js/styles/github-dark.css';

import { ref, computed } from 'vue';

const expandedKeys = ref([]);
const treeData = ref();

const result = ref();

const selectFile = async () => {
	const handle = await showDirectoryPicker();
	await processHandle(handle);
	treeData.value = handle;
};

const processHandle = async (handle) => {
	if (handle.kind === 'file') return;

	handle.children = [];
	handle.isLeaf = handle.kind === 'file';
	const values = await handle.values();
	for await (const item of values) {
		handle.children.push(item);
		await processHandle(item);
	}
};

const openFile = async (_, { node }) => {
	const item = node.dataRef;

	if (item.kind === 'directory') return;
	const file = await item.getFile();

	if (file.name.endsWith('.exe') || file.name.endsWith('.zip')) return;

	//读取文件，具体解析什么类型的文件这里写
	const reader = new FileReader();
	reader.onload = (e) => {
		result.value = hljs.highlightAuto(e.target?.result).value;
	};
	reader.readAsText(file);
};

const innerHeight = computed(() => window.innerHeight - 32);
</script>

<template>
	<a-button @click="selectFile">选择文件</a-button>
	<div class="container">
		<a-directory-tree
			v-model:expandedKeys="expandedKeys"
			:tree-data="treeData?.children"
			:field-names="{ title: 'name' }"
			@select="openFile"
			class="catalog"
			:style="{ height: innerHeight + 'px' }"
		/>
		<div class="content" v-html="result" :style="{ height: innerHeight + 'px' }" />
	</div>
</template>

<style>
.container {
	display: flex;

	.catalog {
		width: 300px;
		overflow: auto;
	}

	.content {
		flex: 1;
		overflow: auto;

		/* 自动换行 */
		word-break: normal;

		/* 保留原内容的换行和缩进 */
		white-space: pre-wrap;

		/* 溢出的内容显示为滚动条，而不是溢出页面 */
		word-wrap: break-word;
	}
}
.ant-tree-node-content-wrapper {
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}
</style>
```

## 左右拖拽布局

<image src="https://raw.githubusercontent.com/Lazydd/images/main/20250610125312068.webp" />

```vue
<template>
	<div class="main">
		<div class="left" :style="{ width: left_width + 'px' }">
			<slot name="left" />
		</div>
		<div class="dragLine" :style="{ width: dragLine_width + 'px' }" />
		<div class="right" :style="{ width: right_width + 'px' }">
			<slot name="right" />
		</div>
	</div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue';

const current_width = ref(200);

const left_width = computed(() => {
	return current_width.value;
});
const dragLine_width = ref(5);
const right_width = computed(() => {
	return window.innerWidth - current_width.value - dragLine_width.value;
});
const isTarget = ref(false);

const mousedown = (event) => {
	const targetDom = event.target;
	if (targetDom.className === 'dragLine') {
		isTarget.value = true;
		event.preventDefault();
		event.stopPropagation();
	} else {
		isTarget.value = false;
	}
};
const mouseMove = (event) => {
	if (isTarget.value) {
		requestAnimationFrame(() => {
			current_width.value = event.x;
			event.preventDefault();
			event.stopPropagation();
		});
	}
};
const mouseUp = (event) => {
	isTarget.value = false;
	event.preventDefault();
	event.stopPropagation();
};
onMounted(() => {
	document.addEventListener('mousedown', mousedown);
	document.addEventListener('mousemove', mouseMove);
	document.addEventListener('mouseup', mouseUp);
});

onUnmounted(() => {
	document.removeEventListener('mousedown', mousedown);
	document.removeEventListener('mousemove', mouseMove);
	document.removeEventListener('mouseup', mouseUp);
});
</script>
<style>
.main {
	display: flex;
	height: 100vh;
	.left {
		height: 100%;
		min-width: 200px;
		overflow-y: hidden;
		&:hover {
			overflow-y: overlay;
		}
	}
	.dragLine {
		height: 100%;
		background-color: rgb(0, 183, 255);
		cursor: w-resize;
		&:hover {
			background-color: rgb(0, 102, 255);
		}
	}
	.right {
		height: 100%;
		min-width: 200px;
		overflow-y: hidden;
		&:hover {
			overflow-y: overlay;
		}
	}
}
</style>
```

## 音频可视化

<image src="https://raw.githubusercontent.com/Lazydd/images/main/20250610153253198.webp" />

```vue
<script setup lang="ts">
import { useTemplateRef, onMounted } from 'vue';

const audioRef = useTemplateRef('audio');
const cvsRef = useTemplateRef('cvs');
let ctx: CanvasRenderingContext2D;
let isInit = false;
const initCvs = () => {
	if (!cvsRef.value) return;
	cvsRef.value.width = window.innerWidth * devicePixelRatio;
	cvsRef.value.height = (window.innerHeight / 2) * devicePixelRatio;
	ctx = cvsRef.value?.getContext('2d')!;
};
let analyser: AnalyserNode, buffer: Uint8Array<ArrayBufferLike>;
let bufferLength: number;
onMounted(() => {
	if (!audioRef.value || !cvsRef.value) return;
	initCvs();
	audioRef.value?.addEventListener('play', () => {
		if (isInit) return;
		const audioCtx = new AudioContext();
		const source = audioCtx.createMediaElementSource(audioRef.value!);
		analyser = audioCtx.createAnalyser();
		source.connect(analyser);
		analyser.connect(audioCtx.destination);
		analyser.fftSize = 2048;
		bufferLength = analyser.frequencyBinCount;
		buffer = new Uint8Array(bufferLength);
		isInit = true;
	});
	draw();
});

const draw = () => {
	requestAnimationFrame(draw);
	if (!isInit) return;
	const { width, height } = cvsRef.value!;
	ctx?.clearRect(0, 0, width, height);
	analyser.getByteFrequencyData(buffer);

	const barWidth = width / bufferLength;
	let barHeight;
	for (let i = 0; i < bufferLength; i++) {
		barHeight = (buffer[i] / 255) * height;
		ctx.fillStyle = `rgb(255,50,${i})`;
		ctx?.fillRect(i * barWidth, height - barHeight, barWidth, barHeight);
	}
};
</script>

<template>
	<div class="container">
		<canvas ref="cvs" />
		<audio src="/a.mp3" controls ref="audio" />
	</div>
</template>

<style>
.container {
	display: flex;
	flex-direction: column;
	height: 100vh;
	width: 100%;
	background-color: #000000;
	canvas {
		flex: 1;
		height: 100%;
		width: 100%;
	}
}
</style>
```

## 异步代码转同步代码

首先备份老的`fetch`请求，然后创建一个新的`fetch`，用新的替换掉老的`fetch`，然后执行异步代码，最后把老的`fetch`还原回去。

新的`fetch`先判断有没有缓存，有缓存直接返回缓存结果就可以，没有缓存，就执行老的`fetch`，在老的`fetch`中，等待结果将其写入缓存中，同是将这个`Promise`当做异常抛出，通过`catch`可以捕获到该异常，此时异常得到的是刚刚返回的`Promise`，
只需要执行`finally`就可以再次执行原函数，将新`fetch`重新赋值下，然后执行原函数，最后将老`fetch`还原即可。

```js
const main = () => {
	const user = fetch('https://jsonplaceholder.typicode.com/users/1');
};

const run = (func) => {
	const oldFetch = window.fetch;

	const cache = {
		status: 'pending',
		value: null,
	};
	function newFetch(...args) {
		if (cache.status == 'fulfilled') {
			return cache.value;
		} else if (cache.status == 'rejected') {
			throw cache.value;
		}
		const p = oldFetch(...args)
			.then((res) => {
				cache.status = 'fulfilled';
				cache.value = res;
			})
			.catch((err) => {
				cache.status = 'rejected';
				cache.value = err;
			});
		throw p;
	}

	window.fetch = newFetch;

	try {
		func();
	} catch (err) {
		if (err instanceof Promise) {
			err.finally(() => {
				window.fetch = newFetch;
				func();
				window.fetch = oldFetch;
			});
		}
	}

	window.fetch = oldFetch;
};

run(main);
```
