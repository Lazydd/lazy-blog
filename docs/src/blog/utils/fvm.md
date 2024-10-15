# Fvm

`Flutter` 版本管理工具

## 安装

[Github 下载地址](https://github.com/leoafarias/fvm/releases)，我们选择下图红框的文件下载进行安装

<Image src="https://cdn.ddlazy.cn/fastboot/2023/09/05/1693879437/fvm.png"></Image>

或者使用命令安装

```bash
dart pub global activate fvm

```

## 安装完成后进行配置

## 配置环境变量

:::tip 注意
[配置存储地址](/blog/utils/fvm#配置存储地址)，[配置代理地址](/blog/utils/fvm#配置代理地址)都配置在用户变量上
:::

### 配置系统环境变量

```txt
E:\fvm
```

### 配置存储地址

```txt
FVM_CACHE_PATH
E:\fvm
```

### 配置代理地址

```txt
FLUTTER_STORAGE_BASE_URL
https://mirrors.tuna.tsinghua.edu.cn/flutter
```

## 查看是否安装完成

```bash
fvm -v
```

<Image src="https://cdn.ddlazy.cn/fastboot/2023/09/05/1693879973/fvm-version.png"></Image>

## fvm 命令

### 查看本地已安装的 flutter 版本

```bash
fvm list
```

### 查看可安装的 flutter 版本

```bash
fvm releases
```

### 安装 flutter

```bash
fvm install 3.24.3
```

### 卸载 flutter

```bash
fvm uninstall 3.24.3
```

### 切换 flutter 版本

```bash
fvm use 16.20.0
```

### 设置全局版本

```bash
fvm global 3.24.3
```
