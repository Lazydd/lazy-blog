# PM2

## 安装

```bash
npm install -g pm2
```

## 全局配置

```bash
ln -sf /usr/local/src/nodejs/bin/pm2 /usr/local/bin/pm2
```

## 配置 PM2

```bash
vi ecosystem.config.js
```

## 写入配置

```js
module.exports = {
	apps: [
		{
			name: 'ddlazy',
			exec_mode: 'cluster',
			instances: '2', // Or a number of instances
			script: './node_modules/nuxt/bin/nuxt.js',
			args: 'start',
		},
	],
};
```

## 启动 PM2

:::tip 注意
有时 pm2 会启动失败，尝试使用以下命令

```bash
pm2 start npm --name "ddlazy" -- run start --watch
```

:::

```bash
pm2 start ddlazy --watch
```

## PM2 自启动

```bash
pm2 start
pm2 save
pm2 startup
```
