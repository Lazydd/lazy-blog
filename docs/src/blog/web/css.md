<script setup>
import { ref } from 'vue'
const range = ref(100)
</script>

# Css

## 宽高比

<div class="demo">
	<div class="box" :style="`width: ${range}px; aspect-ratio: 16 / 9; background: var(--vp-c-brand-1)`"/>
	<input type="range" v-model="range" max="400" min="100"/>
</div>

```html
<div class="box" />
```

```css{3}
.box {
	width: 100px;
	aspect-ratio: 16 / 9; /* [!code focus] */
}
```

## 篮球

<div class="ball-box">
	<div class="ball" />
</div>

<style lang="scss">
.ball-box{
	height: 200px
}
.ball {
	display: block;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: var(--vp-button-brand-bg);
	animation: bounce 0.575s alternate cubic-bezier(0.6, 0.08, 0.8, 0.6) infinite;
}

@keyframes bounce {
	from {
		transform: translate(0, 0);
	}
	to {
		transform: translate(0, 160px);
	}
}
</style>

```html
<div class="ball-box">
	<div class="ball" />
</div>
```

```css
.ball-box {
	height: 200px;
}
.ball {
	display: block;
	width: 50px;
	height: 50px;
	border-radius: 50%;
	background-color: var(--vp-button-brand-bg);
	animation: bounce 0.575s alternate cubic-bezier(0.6, 0.08, 0.8, 0.6) infinite;
}

@keyframes bounce {
	from {
		transform: translate(0, 0);
	}
	to {
		transform: translate(0, 160px);
	}
}
```

## 文字滚动

<marquee behavior="scroll" direction="left" scrollamount="6" onmouseover="this.stop()"
            onmouseout="this.start()">
<span>
测试文字
</span>
</marquee>

```html
<marquee
	behavior="scroll"
	direction="left"
	scrollamount="6"
	onmouseover="this.stop()"
	onmouseout="this.start()"
>
	<span>测试文字</span>
</marquee>
```

## 文字特效

<div class="text-demo">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>

<style>
.text-demo {
	position: relative;
	display: inline-block;
	cursor: pointer;
}
.text-demo:after {
	content: '';
	position: absolute;
	border-bottom: 2px solid var(--vp-c-brand-1);
	bottom: -2px;
	left: 100%;
	width: 0;
	transition: width 350ms, left 350ms;
}
.text-demo:hover:after {
	left: 0;
	width: 100%;
	transition: width 350ms;
}
</style>

```html
<div class=".text-demo">啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊</div>
```

```css
.text-demo {
	position: relative;
	display: inline-block;
	cursor: pointer;
}
.text-demo:after {
	content: '';
	position: absolute;
	border-bottom: 2px solid var(--vp-c-brand-1);
	bottom: -2px;
	left: 100%;
	width: 0;
	transition: width 350ms, left 350ms;
}
.text-demo:hover:after {
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
	background-color: var(--vp-c-brand-1);
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
	background-color: var(--vp-c-brand-1);
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
        fill="none" />
</svg>

<style>
  .container-box {
    --uib-size: 40px;
    --uib-color: var(--vp-c-brand-1);
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
	--uib-color: var(--vp-c-brand-1);
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

<style>
  .container-box {
    --uib-size: 45px;
    --uib-color: var(--vp-c-brand-1);
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
	--uib-color: var(--vp-c-brand-1);
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
  <span v-for="tag in 7">{{ 'tag' + tag }}</span>
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
    background: var(--vp-c-brand-1);
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
	<span v-for="tag in 7">{{ 'tag' + tag }}</span>
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

## 文本的展开和收起

<div class="text-wrap-2">
	<div
		class="text-demo2"
		title="啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
	>
		<div class="text-size-wrap">
			<div class="text-flex-2">
				<div class="text-content-2">
					<label class="expand"
						><input type="checkbox" hidden
					/></label>
					啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
				</div>
			</div>
		</div>
	</div>
	<div class="text-content-2 text-place">
		啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
	</div>
</div>

<style>
.text-wrap-2 {
	display: flex;
	position: relative;
	padding: 8px;
	outline: 1px dashed var(--vp-c-brand-1);
	border-radius: 4px;
	line-height: 1.5;
	text-align: justify;
}
.expand {
	font-size: 80%;
	padding: 0.1em 0.5em;
	background-color: var(--vp-c-brand-1);
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
}
.expand::after {
	content: "展开";
}
.text-content-2 {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.text-demo2 {
	position: absolute;
	inset: 8px 8px auto;
}
.text-size-wrap {
	position: absolute;
	inset: 0;
	container-type: size;
}
@container (height <= 4.5em) {
	.text-size-wrap .expand {
		display: none;
	}
}
.text-demo2::before {
	content: attr(title);
	opacity: 0;
}
.text-content-2::before {
	content: "";
	float: right;
	height: calc(min(100%, 100cqh) - 1.4em);
}
.expand {
	float: right;
	clear: both;
	position: relative;
}
.text-flex-2 {
	display: flex;
}
.text-place {
	visibility: hidden;
}
.text-wrap-2:has(:checked) .text-content-2 {
	-webkit-line-clamp: 999;
}
.text-wrap-2:has(:checked) .expand::after {
	content: "收起";
}
</style>

```html
<div class="text-wrap-2">
	<div
		class="text-demo2"
		title="啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊"
	>
		<div class="text-size-wrap">
			<div class="text-flex-2">
				<div class="text-content-2">
					<label class="expand"><input type="checkbox" hidden /></label>
					啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
				</div>
			</div>
		</div>
	</div>
	<div class="text-content-2 text-place">
		啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
	</div>
</div>
```

```css
.text-wrap-2 {
	display: flex;
	position: relative;
	padding: 8px;
	outline: 1px dashed var(--vp-c-brand-1);
	border-radius: 4px;
	line-height: 1.5;
	text-align: justify;
}
.expand {
	font-size: 80%;
	padding: 0.1em 0.5em;
	background-color: var(--vp-c-brand-1);
	color: #fff;
	border-radius: 4px;
	cursor: pointer;
}
.expand::after {
	content: '展开';
}
.text-content-2 {
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 3;
	overflow: hidden;
}
.text-demo2 {
	position: absolute;
	inset: 8px 8px auto;
}
.text-size-wrap {
	position: absolute;
	inset: 0;
	container-type: size;
}
@container (height <= 4.5em) {
	.text-size-wrap .expand {
		display: none;
	}
}
.text-demo2::before {
	content: attr(title);
	opacity: 0;
}
.text-content-2::before {
	content: '';
	float: right;
	height: calc(min(100%, 100cqh) - 1.4em);
}
.expand {
	float: right;
	clear: both;
	position: relative;
}
.text-flex-2 {
	display: flex;
}
.text-place {
	visibility: hidden;
}
.text-wrap-2:has(:checked) .text-content-2 {
	-webkit-line-clamp: 999;
}
.text-wrap-2:has(:checked) .expand::after {
	content: '收起';
}
```

## 相机聚焦框

<div style="display: flex; gap: 20px">
	<div class="focus-border"></div>
	<div class="focus-border" style="width: 200px"></div>
</div>

<style>
.focus-border {
	overflow: hidden;
	width: 100px;
	height: 100px;
	border: 4px solid var(--vp-c-brand-1);
	border-radius: 10px;

	/* 核心代码 */
	-webkit-mask: conic-gradient(from -90deg at 40px 40px, red 90deg, transparent 0deg);
	-webkit-mask-position: -20px -20px;
}
</style>

```html
<div class="flex-row-center gap-8">
	<div class="focus-border"></div>
	<div class="focus-border" style="width: 200px"></div>
</div>
```

```css
.focus-border {
	overflow: hidden;
	width: 100px;
	height: 100px;
	border: 4px solid var(--vp-c-brand-1);
	border-radius: 10px;

	/* 核心代码 */
	-webkit-mask: conic-gradient(from -90deg at 40px 40px, red 90deg, transparent 0deg);
	-webkit-mask-position: -20px -20px;
}
```

## 华为充电

<div class="g-container">
    <div class="g-number">98.7%</div>
    <div class="g-contrast">
        <div class="g-circle"></div>
        <ul class="g-bubbles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
        </ul>
    </div>
</div>

<style lang="scss">
.g-number {
    position: absolute;
    width: 300px;
    top: 27%;
    text-align: center !important;
    font-size: 32px;
    z-index: 10;
    color: #fff;
}

.g-container {
    position: relative;
    width: 300px;
    height: 400px;
    margin: auto;
}

.g-contrast {
    filter: contrast(10) hue-rotate(0);
    width: 300px;
    height: 400px;
    background-color: #000;
    overflow: hidden;
    animation: hueRotate 10s infinite linear;
}

.g-circle {
    position: relative;
    width: 300px;
    height: 300px;
    box-sizing: border-box;
    filter: blur(8px);
	&::after {
		content: "";
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(0);
		width: 200px;
		height: 200px;
		background-color: #00ff6f;
		border-radius: 42% 38% 62% 49% / 45%;
		animation: rotate2 10s infinite linear;
	}
	&::before{
		content: "";
		position: absolute;
		width: 176px;
		height: 176px;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background-color: #000;
		z-index: 10;
	}
}

.g-bubbles {
	position: absolute;
    left: 50%;
    bottom: 0;
    width: 100px;
    height: 40px;
    transform: translate(-50%, 0);
    border-radius: 100px 100px 0 0;
    background-color: #00ff6f;
    filter: blur(5px);
	& > li {
		position: absolute;
		border-radius: 50%;
		background: #00ff6f;
	}
	@for $i from 0 through 15 { 
		li:nth-child(#{$i}) {
			$width: 15 + random(15) + px;
			left: 15 + random(70) + px;
			top: 50%;
			transform: translate(-50%, -50%);
			width: $width;
			height: $width;
			animation: moveToTop #{random(6) + 3}s ease-in-out -#{calc(random(5000) / 1000)}s infinite;
		}
	}
}
@keyframes rotate2 {
    50% {
        border-radius: 45% / 42% 38% 58% 49%;
    }
    100% {
        transform: translate(-50%, -50%) rotate(720deg);
    }
}

@keyframes moveToTop {
    90% {
        opacity: 1;
    }
    100% {
        opacity: .1;
        transform: translate(-50%, -180px);
    }
}

@keyframes hueRotate {
    100% {
        filter: contrast(15) hue-rotate(360deg);
    }
}
</style>

```html
<div class="g-container">
	<div class="g-number">98.7%</div>
	<div class="g-contrast">
		<div class="g-circle"></div>
		<ul class="g-bubbles">
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</div>
```

```scss
.g-number {
	position: absolute;
	width: 300px;
	top: 27%;
	text-align: center !important;
	font-size: 32px;
	z-index: 10;
	color: #fff;
}

.g-container {
	position: relative;
	width: 300px;
	height: 400px;
	margin: auto;
}

.g-contrast {
	filter: contrast(10) hue-rotate(0);
	width: 300px;
	height: 400px;
	background-color: #000;
	overflow: hidden;
	animation: hueRotate 10s infinite linear;
}

.g-circle {
	position: relative;
	width: 300px;
	height: 300px;
	box-sizing: border-box;
	filter: blur(8px);
	&::after {
		content: '';
		position: absolute;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%) rotate(0);
		width: 200px;
		height: 200px;
		background-color: #00ff6f;
		border-radius: 42% 38% 62% 49% / 45%;
		animation: rotate2 10s infinite linear;
	}
	&::before {
		content: '';
		position: absolute;
		width: 176px;
		height: 176px;
		top: 40%;
		left: 50%;
		transform: translate(-50%, -50%);
		border-radius: 50%;
		background-color: #000;
		z-index: 10;
	}
}

.g-bubbles {
	position: absolute;
	left: 50%;
	bottom: 0;
	width: 100px;
	height: 40px;
	transform: translate(-50%, 0);
	border-radius: 100px 100px 0 0;
	background-color: #00ff6f;
	filter: blur(5px);
	& > li {
		position: absolute;
		border-radius: 50%;
		background: #00ff6f;
	}
	@for $i from 0 through 15 {
		li:nth-child(#{$i}) {
			$width: 15 + random(15) + px;
			left: 15 + random(70) + px;
			top: 50%;
			transform: translate(-50%, -50%);
			width: $width;
			height: $width;
			animation: moveToTop
				#{random(6) +
				3}s
				ease-in-out -#{calc(random(5000) / 1000)}s
				infinite;
		}
	}
}
@keyframes rotate2 {
	50% {
		border-radius: 45% / 42% 38% 58% 49%;
	}
	100% {
		transform: translate(-50%, -50%) rotate2(720deg);
	}
}

@keyframes moveToTop {
	90% {
		opacity: 1;
	}
	100% {
		opacity: 0.1;
		transform: translate(-50%, -180px);
	}
}

@keyframes hueRotate {
	100% {
		filter: contrast(15) hue-rotate(360deg);
	}
}
```
