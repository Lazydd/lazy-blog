# Nvm

`Node` 版本管理工具

## 安装

[Github 下载地址](https://github.com/coreybutler/nvm-windows/releases)，我们选择下图红框的文件下载进行安装

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281016807.png"></Image>

## 安装完成后进行配置

在对应的安装目录打开文件 `settings.txt`

## 写入配置

失效了，下面是新的

<del><code>node_mirror: https://npm.taobao.org/mirrors/node/</code></del>

<del><code>npm_mirror: https://npm.taobao.org/mirrors/npm/</code></del>

```txt
node_mirror: https://npmmirror.com/mirrors/node/
npm_mirror: https://npmmirror.com/mirrors/npm/
```

## 查看是否安装完成

```bash
nvm -v
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281013241.png"></Image>

## Nvm 命令

### 查看本地已安装的 node 版本

```bash
nvm list
```

### 查看可安装的 node 版本

```bash
nvm list available
```

### 安装 node

```bash
nvm install 16.20.0
```

### 卸载 node

```bash
nvm uninstall 16.20.0
```

### 切换 node 版本

```bash
nvm use 16.20.0
```

### 设置默认版本

```bash
nvm alias default 16.20.0
```
