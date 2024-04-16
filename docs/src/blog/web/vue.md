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
