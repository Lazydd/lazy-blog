# font-spider

[Github 地址](https://github.com/aui/font-spider)字体压缩工具

## 安装

```bash
npm install font-spider -g
```

## 使用

:::info 使用方法

1. 创建一个 `html` 文件，命名为 `index.html`
    - 其中 `html` 部分中 `div` 中的内容就是需要压缩的字体，下面代码中突出显示部分
    - 其中 `css` 中的 `font-family`的值为你需要的字体，可以使外部的字体文件，改下路径即可
2. 在根目录在创建一个文件夹命名为 `fonts`
    - 代码压缩的字体文件都会在该目录中
3. 执行命令
    - ```bash
        font-spider index.html
      ```

:::

```html{21}
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Document</title>
		<style>
			@font-face {
				font-family: 'Lato-Medium';
				src: url('./fonts/Lato-Medium.eot');
				src: url('./fonts/Lato-Medium.eot?#font-spider') format('embedded-opentype'), url('./fonts/Lato-Medium.woff')
						format('woff'), url('./fonts/Lato-Medium.ttf') format('truetype'), url('./fonts/Lato-Medium.svg')
						format('svg');
				font-weight: normal;
				font-style: normal;
			}
		</style>
	</head>
	<body>
		<div>123456789</div> // [!code ++]
	</body>
</html>
```
