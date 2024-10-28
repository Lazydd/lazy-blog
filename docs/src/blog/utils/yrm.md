# Yrm

源管理工具

## 安装

```bash
npm install -g yrm
```

## 查看是否安装完成

```bash
yrm --version
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281011193.png"></Image>

## Yrm 命令

:::tip 注意
下面命令中 `npm` `lazy` 为源名称，可根据实际替代
:::

### 查看可用源

```bash
yrm ls
```

### 使用其中一个源

```bash
yrm use npm
```

### 新增

```bash
yrm add lazy <url>
```

### 删除

```bash
yrm del lazy
```

### 修改名称

```bash
yrm rename <旧名称> <新名称>
```
