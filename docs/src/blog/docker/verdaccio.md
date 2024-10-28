# Verdaccio

## 拉取镜像

```bash
docker pull verdaccio/verdaccio
```

## 配置 Verdaccio

```bash
vi /home/verdaccio/conf/config.yaml
```

## 写入配置

```yaml
# 所有包的保存路径
 storage: /verdaccio/storage/data
# 插件的保存路径
 plugins: /verdaccio/plugins

 # 通过web访问
 web:
   title: "Verdaccio"

 # 账号密码文件，初始不存在
 auth:
     htpasswd:
     file: /verdaccio/storage/htpasswd
     algorithm: md5 # 这里选择 md5 作为加密算法
     # max_users: -1 # 不允许自由注册
     # max_users：1000
     # 默认1000，允许用户注册数量。为-1时，不能通过 npm adduser 注册，此时可以直接修改 file 文件添加用户。
     # 本地不存在时，读取仓库的地址
uplinks:
    npmjs:
      url: https://registry.npm.taobao.org
    yarn:
      url: https://registry.yarnpkg.com/

# 对包的访问操作权限，可以匹配某个具体项目，也可以通配
# access 访问下载；publish 发布；unpublish 取消发布；
# proxy 对应着uplinks名称，本地不存在，去unplinks里取
# $all 表示所有人都可以执行该操作
# $authenticated 已注册账户可操作
# $anonymous 匿名用户可操作
# 还可以明确指定 htpasswd 用户表中的用户，可以配置一个或多个。
packages:
  '@*/*':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs
  '**':
    access: $all
    publish: $authenticated
    unpublish: $authenticated
    proxy: npmjs

# 服务器相关
sever:
  keepAliveTimeout: 60

middlewares:
  audit:
    enabled: true

# 日志设定
logs: { type: stdout, format: pretty, level: http }
```

## 创建放置包文件

```bash
mkdir -p /home/verdaccio/storage
```

## 进入该目录，创建一个保存用户密码的文件

```bash
touch htpasswd
```

## 给容器读取和写入的权限

```bash
chown -R 100:101 /home/verdaccio/
```

## 运行容器

```bash
docker run -it --name verdaccio -p 4873:4873 \
--restart=always \
-v /home/verdaccio/conf:/home/verdaccio/conf \
-v /home/verdaccio/storage:/home/verdaccio/storage verdaccio/verdaccio
```

## 访问 4837 端口

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281020100.png"></Image>

## 进行包发布

```bash
npm login
npm publish
```

<Image src="https://raw.githubusercontent.com/Lazydd/images/main/202410281020917.png"></Image>
