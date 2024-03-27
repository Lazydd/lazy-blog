---
comment: false
---

# Config

## 接入 `Github` 评论功能

### 安装 `giscus`

在 `Github` 仓库中[安装](https://github.com/apps/giscus) `giscus`

### 开启 `Discussions`

在 `Github` 中的 `Settings` 中开启 `Discussions`

<Image src="https://cdn.ddlazy.cn/fastboot/2023/09/15/1694757833/discussions.png"></Image>

### 配置 `giscus`

[配置](https://giscus.app/zh-CN) `giscus`

**1. 输入自己的一个公开的仓库地址，需要[开启 Discussions](/config#开启-discussions)**

<Image src="https://cdn.ddlazy.cn/fastboot/2023/09/15/1694758429/discussions-step-1.png"></Image>

**2. 设置分类别为 `Announcements`**

<Image src="https://cdn.ddlazy.cn/fastboot/2023/09/15/1694758452/discussions-step-2.png"></Image>

**3. 将关键部分拷贝出来**

<Image src="https://cdn.ddlazy.cn/fastboot/2023/09/15/1694758470/discussions-step-3.png"></Image>

**4. 在 `Vue` 中使用则创建一个 `.vue` 文件**

```vue-html
<component
	:is="'script'"
	src="https://giscus.app/client.js"
	:data-repo="Lazydd/lazy-blog"
	:data-repo-id="R_kgDOKPGS7g"
	:data-category="Announcements"
	:data-category-id="DIC_kwDOKPGS7s4CZRAd"
	:data-mapping="'pathname'"
	data-reactions-enabled="1"
	data-emit-metadata="0"
	:data-input-position="'top'"
	:data-theme="'light'"
	:data-lang="'zh-CN'"
	crossorigin="anonymous"
	:data-loading="'eager'"
	async
/>
```

**5. 在 `Vue` 中使用该组件**

**6. 博客中如果某些页面不需要则添加 `frontmatter` 会忽略**

```txt
---
comment: false
---
```
