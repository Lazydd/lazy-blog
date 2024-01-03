# JavaScript

## 字符串方法

### **_`padStart`_**

:::info 描述
`padStart` 当字符串长度小于第一个参数时，在字符串前方补充第二个参数，直到字符串长度等于第一个参数为止

相反的有 [`padEnd`](/blog/web/javaScript#padend)
:::

```js
let a = 'abcdef';
const b = a.padStart(10, '0');
console.log(b); //'0000abcdef'
```

### **_`padEnd`_**

:::info 描述
`padEnd` 当字符串长度小于第一个参数时，在字符串后方补充第二个参数，直到字符串长度等于第一个参数为止

相反的有 [`padStart`](/blog/web/javaScript#padstart)
:::

```js
let a = 'abcdef';
const b = a.padEnd(10, '0');
console.log(b); //'abcdef0000'
```

## 深拷贝

### **_`structuredClone`_**

```js
let a = {
	num: 132,
	arr: [1, 2, 3],
};
const b = structuredClone(a);
```

## 数组去重

### **_`reduce`_**

::: code-group

```ts [TypeScript]
const unique = <T>(array: T[]): T[] => {
	return array.reduce((pre: T[], value: T) => {
		if (pre.includes(value)) {
			return pre;
		} else {
			return [...pre, value];
		}
	}, []);
};
```

```js [JavaScript]
const unique = (array) => {
	return array.reduce((pre, value) => {
		if (pre.includes(value)) {
			return pre;
		} else {
			return [...pre, value];
		}
	}, []);
};
```

:::

### **_`Set`_**

::: code-group

```ts [TypeScript]
const unique = <T>(arr: T[]): T[] => [...new Set(arr)];
```

```js [JavaScript]
const unique = (arr) => [...new Set(arr)];
```

:::

## 数组对象根据某个属性去重

### **_`Object`_**

::: code-group

```ts [TypeScript]
const unique = <T>(array: T[], key: string) => {
	return Object.keys(
		array.reduce((pre, value) => {
			if (!pre[value[key]]) {
				pre[value[key]] = value;
			}
			return pre;
		}, {})
	);
};
```

```js [JavaScript]
const unique = (array, key) => {
	return Object.keys(
		array.reduce((pre, value) => {
			if (!pre[value[key]]) {
				pre[value[key]] = value;
			}
			return pre;
		}, {})
	);
};
```

:::

## 统计元素出现次数

### **_`reduce`_**

::: code-group

```ts [TypeScript]
const unique = (array: any[]) => {
	return array.reduce((pre: any, value: any) => {
		if (value in pre) {
			pre[value]++;
		} else {
			pre[value] = 1;
		}
		return pre;
	}, {});
};
```

```js [JavaScript]
const unique = (array) => {
	return array.reduce((pre, value) => {
		if (value in pre) {
			pre[value]++;
		} else {
			pre[value] = 1;
		}
		return pre;
	}, {});
};
```

:::

## 数组对象根据另一个数组筛选

### **_`reduce`_**

```js
let a = [
	{ value: 'jack', label: 'Jack' },
	{ value: 'lucy', label: 'Lucy' },
	{ value: 'tom', label: 'Tom' },
	{ value: 'tom2', label: 'Tom2' },
	{ value: 'tom3', label: 'Tom3' },
	{ value: 'tom4', label: 'Tom4' },
	{ value: 'tom5', label: 'Tom5' },
	{ value: 'tom6', label: 'Tom6' },
];

let b = ['jack', 'tom'];
const tem = new Set(b);
let c = a.reduce((acc, curr) => {
	const { value, label } = curr;
	if (tem.has(value)) {
		acc.push(label);
	}
	return acc;
}, []);
console.log(c); //['Jack','Tom']
```

## 扩展

### 拷贝文字 **_`writeText`_**

```js
const copyText = async (text) => await navigator.clipboard.writeText(text);
copyText('writeText');
```

### 图片懒加载 **_`getBoundClientRect `_**

```js
let imgList = [...document.querySelectorAll('img')];
let length = imgList.length;

// 修正错误，需要加上自执行
const imgLazyLoad = (function () {
	let count = 0;

	return function () {
		let deleteIndexList = [];
		imgList.forEach((img, index) => {
			let rect = img.getBoundingClientRect();
			if (rect.top < window.innerHeight) {
				img.src = img.dataset.src;
				deleteIndexList.push(index);
				count++;
				if (count === length) {
					document.removeEventListener('scroll', imgLazyLoad);
				}
			}
		});
		imgList = imgList.filter((img, index) => !deleteIndexList.includes(index));
	};
})();

// 这里最好加上防抖处理
document.addEventListener('scroll', imgLazyLoad);
```

### 下载文件 **_`createObjectURL`_**

```js
const download = (blob, filename) => {
	const blobURL = window.URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = blobURL;
	a.download = filename || +new Date() + '';
	document.body.appendChild(a);
	a.click();
	a.remove();
	window.URL.revokeObjectURL(blobURL);
};
```

### 获取窗体宽高 **_`clientWidth`_**

```js
const getWindow = () => {
	let width = document.documentElement.clientWidth || document.body.clientWidth;
	let height = document.documentElement.clientHeight || document.body.clientHeight;
	return { width, height };
};
```
