<script setup>
	import { ref } from 'vue'
	const range = ref(100)
  const tagList = ref(['tag1', 'tag2', 'tag3','tag4','tag5','tag6','tag7'])
</script>

# Css

## 宽高比

<div class="demo">
	<div class="box" :style="`width: ${range}px; aspect-ratio: 16 / 9; background:red`"/>
	<input type="range" v-model="range" max="400" min="100"/>
</div>

```html
<div class="box" />
```

```css{3}
.box {
	width: 100px;
	aspect-ratio: 16 / 9; // [!code focus]
}
```

## 文字特效

<div class="text">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>

<style scoped>
.text {
	position: relative;
	display: inline-block;
	cursor: pointer;
}
.text:after {
	content: '';
	position: absolute;
	border-bottom: 2px solid #3476d2;
	bottom: -2px;
	left: 100%;
	width: 0;
	transition: width 350ms, left 350ms;
}
.text:hover:after {
	left: 0;
	width: 100%;
	transition: width 350ms;
}
</style>

```html
<div class="text">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
```

```css
.text {
	position: relative;
	display: inline-block;
	cursor: pointer;
}
.text:after {
	content: '';
	position: absolute;
	border-bottom: 2px solid #3476d2;
	bottom: -2px;
	left: 100%;
	width: 0;
	transition: width 350ms, left 350ms;
}
.text:hover:after {
	left: 0;
	width: 100%;
	transition: width 350ms;
}
```

## 圆角三角形

<div class="container-triangle">
	<div class="rounded-triangle" />
</div>

<style>
.container-triangle{
	position: relative;
	height: 300px;
}
.rounded-triangle::after,
.rounded-triangle::before {
	content: '';
	position: absolute;
	background-color: inherit;
}
.rounded-triangle,
.rounded-triangle::before,
.rounded-triangle::after {
	width: 8em;
	height: 8em;
	border-top-right-radius: 30%;
}
.rounded-triangle {
	position: absolute;
	left: 50%;
	top: 50%;
	background-color: steelblue;
	text-align: left;
	transform: translate(-50%, -50%) rotate(-60deg) skewX(-30deg) scale(1, 0.866);
}
.rounded-triangle::before {
	transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707) translate(0, -50%);
}
.rounded-triangle::after {
	transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
}
</style>

```html
<div class="container-triangle">
	<div class="rounded-triangle" />
</div>
```

```css
.container-triangle {
	position: relative;
	height: 300px;
}
.rounded-triangle::after,
.rounded-triangle::before {
	content: '';
	position: absolute;
	background-color: inherit;
}
.rounded-triangle,
.rounded-triangle::before,
.rounded-triangle::after {
	width: 8em;
	height: 8em;
	border-top-right-radius: 30%;
}
.rounded-triangle {
	position: absolute;
	left: 50%;
	top: 50%;
	background-color: steelblue;
	text-align: left;
	transform: translate(-50%, -50%) rotate(-60deg) skewX(-30deg) scale(1, 0.866);
}
.rounded-triangle::before {
	transform: rotate(-135deg) skewX(-45deg) scale(1.414, 0.707) translate(0, -50%);
}
.rounded-triangle::after {
	transform: rotate(135deg) skewY(-45deg) scale(0.707, 1.414) translate(50%);
}
```

## 加载中动画

<svg
    class="container-box"
    viewBox="0 0 40 40"
    height="40"
    width="40">
<circle class="track"
        cx="20"
        cy="20"
        r="17.5"
        pathlength="100"
        stroke-width="5px"
        fill="none" />
<circle
        class="car"
        cx="20"
        cy="20"
        r="17.5"
        pathlength="100"
        stroke-width="5px"
        fill="none"
    />
</svg>

<style>
  .container-box {
    --uib-size: 40px;
    --uib-color: black;
    --uib-speed: 2s;
    --uib-bg-opacity: 0;
    height: var(--uib-size);
    width: var(--uib-size);
    transform-origin: center;
    animation: rotate var(--uib-speed) linear infinite;
    will-change: transform;
    overflow: visible;
  }

  .car {
    fill: none;
    stroke: var(--uib-color);
    stroke-dasharray: 1, 200;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
    will-change: stroke-dasharray, stroke-dashoffset;
    transition: stroke 0.5s ease;
  }

  .track {
    fill: none;
    stroke: var(--uib-color);
    opacity: var(--uib-bg-opacity);
    transition: stroke 0.5s ease;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes stretch {
    0% {
      stroke-dasharray: 0, 150;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 75, 150;
      stroke-dashoffset: -25;
    }
    100% {
      stroke-dashoffset: -100;
    }
  }
</style>

```html
<svg class="container-box" viewBox="0 0 40 40" height="40" width="40">
	<circle
		class="track"
		cx="20"
		cy="20"
		r="17.5"
		pathlength="100"
		stroke-width="5px"
		fill="none"
	/>
	<circle class="car" cx="20" cy="20" r="17.5" pathlength="100" stroke-width="5px" fill="none" />
</svg>
```

```css
.container-box {
	--uib-size: 40px;
	--uib-color: black;
	--uib-speed: 2s;
	--uib-bg-opacity: 0;
	height: var(--uib-size);
	width: var(--uib-size);
	transform-origin: center;
	animation: rotate var(--uib-speed) linear infinite;
	will-change: transform;
	overflow: visible;
}

.car {
	fill: none;
	stroke: var(--uib-color);
	stroke-dasharray: 1, 200;
	stroke-dashoffset: 0;
	stroke-linecap: round;
	animation: stretch calc(var(--uib-speed) * 0.75) ease-in-out infinite;
	will-change: stroke-dasharray, stroke-dashoffset;
	transition: stroke 0.5s ease;
}

.track {
	fill: none;
	stroke: var(--uib-color);
	opacity: var(--uib-bg-opacity);
	transition: stroke 0.5s ease;
}

@keyframes rotate {
	100% {
		transform: rotate(360deg);
	}
}

@keyframes stretch {
	0% {
		stroke-dasharray: 0, 150;
		stroke-dashoffset: 0;
	}
	50% {
		stroke-dasharray: 75, 150;
		stroke-dashoffset: -25;
	}
	100% {
		stroke-dashoffset: -100;
	}
}
```

## 涟漪效果

<div class="container-box">
  <div class="dot" />
</div>

<style scoped>
  .container-box {
    --uib-size: 45px;
    --uib-color: black;
    --uib-speed: 2s;
    position: relative;
    height: var(--uib-size);
    width: var(--uib-size);
  }

  .container-box::before,
  .container-box::after,
  .dot::before,
  .dot::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    border-radius: 50%;
    background-color: var(--uib-color);
    animation: pulse var(--uib-speed) linear infinite;
    transform: scale(0);
    opacity: 0;
    transition: background-color 0.3s ease;
  }

  .container-box::after {
    animation-delay: calc(var(--uib-speed) / -4);
  }

  .dot::before {
    animation-delay: calc(var(--uib-speed) * -0.5);
  }

  .dot::after {
    animation-delay: calc(var(--uib-speed) * -0.75);
  }

  @keyframes pulse {
    0% {
      transform: scale(0);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 0;
    }
  }
</style>

```html
<div class="container-box">
	<div class="dot" />
</div>
```

```css
.container-box {
	--uib-size: 45px;
	--uib-color: black;
	--uib-speed: 2s;
	position: relative;
	height: var(--uib-size);
	width: var(--uib-size);
}

.container-box::before,
.container-box::after,
.dot::before,
.dot::after {
	content: '';
	position: absolute;
	top: 0;
	left: 0;
	height: 100%;
	width: 100%;
	border-radius: 50%;
	background-color: var(--uib-color);
	animation: pulse var(--uib-speed) linear infinite;
	transform: scale(0);
	opacity: 0;
	transition: background-color 0.3s ease;
}

.container-box::after {
	animation-delay: calc(var(--uib-speed) / -4);
}

.dot::before {
	animation-delay: calc(var(--uib-speed) * -0.5);
}

.dot::after {
	animation-delay: calc(var(--uib-speed) * -0.75);
}

@keyframes pulse {
	0% {
		transform: scale(0);
		opacity: 1;
	}
	100% {
		transform: scale(1);
		opacity: 0;
	}
}
```

## 整块文本溢出省略

<div class="s-multi inlineblock">
  <span v-for="tag in tagList">{{ tag }}</span>
</div>

<style>
.s-multi {
  width: 200px;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  & span {
    background: #673ab7;
    border-radius: 5px;
    color: #fff;
    padding: 2px 6px;
    margin-right: 6px;
  }
}

.inlineblock span {
  display: inline-block;
}
</style>

```html
<div class="s-multi inlineblock">
	<span v-for="tag in tagList">{{ tag }}</span>
</div>
```

```css
.s-multi {
	width: 200px;
	white-space: normal;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	& span {
		background: #673ab7;
		border-radius: 5px;
		color: #fff;
		padding: 2px 6px;
		margin-right: 6px;
	}
}

.inlineblock span {
	display: inline-block;
}
```
