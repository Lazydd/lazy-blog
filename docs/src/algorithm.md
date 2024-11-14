# 算法

## 数组中找到唯一一个出现一次的数字

:::info 异或操作

`a ^ a = 0`

`a ^ 0 = a`
:::

对数组中的所有元素进行异或运算，所有出现两次的数字会相互抵消，最终剩下的就是那个只出现一次的数字

```js
let a = [1, 1, 2, 2, 3, 3, 4, 5, 5];
let result = 0;
a.forEach((v) => (result ^= v));
console.log(result); //4
```

## 格式化数字

将一个不带千分位逗号的数字字符串转换为带千分位逗号的格式，并且保留小数部分。同时，还需要去除字符串前面的无用 `0`。

```js
function solution(s) {
	let str = s.replace(/^0+/, '');
	let parts = str.split('.');
	let integerPart = parts[0];
	let decimalPart = parts[1] || '';
	let result = '';
	for (let i = 0; i < integerPart.length; i++) {
		if ((integerPart.length - i) % 3 == 0 && i > 0) {
			result += ',';
		}
		result += integerPart[i];
	}
	if (decimalPart) {
		result += '.' + decimalPart;
	}
	return result;
}
solution('1294512.12412'); //1,294,512.12412
solution('0000123456789.99'); //123,456,789.99
solution('987654321'); //987,654,321
```

## 查找次数超过一半的数

```js
function solution(array) {
	let countMap = array.reduce((obj, acc) => {
		if (obj[acc]) obj[acc] += 1;
		else obj[acc] = 1;
		return obj;
	}, {});
	let majorityCount = Math.floor(array.length / 2);
	for (let num in countMap) {
		if (countMap[num] > majorityCount) return Number(num);
	}
}
solution([1, 3, 8, 2, 3, 1, 3, 3, 3]); //3
```
