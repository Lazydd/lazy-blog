# Maven

配置JAVA依赖镜像[下载地址](https://maven.apache.org/download.cgi)，我们选择下图红框的文件下载进行安装

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/20260629104923.webp"></Image>

## 配置环境变量

添加系统变量

```bash
MAVEN_HOME
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/20260629111423039.webp"></Image>

添加 `Path`

```bash
%MAVEN_HOME%\bin
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/20260629111505829.webp"></Image>

## 查看是否安装完成

```bash
mvn --version
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/20260629111649611.webp"></Image>

## 配置国内镜像（阿里云）

打开 `maven` 目录下的 `conf/settings.xml`，在 `mirrors` 下面添加新的 `mirror`

```xml
<mirror>
    <id>aliyun-maven</id>
    <mirrorOf>central</mirrorOf>
    <name>阿里云公共仓库</name>
    <url>https://maven.aliyun.com/repository/public</url>
</mirror>
```
