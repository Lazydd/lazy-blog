# Mysql

## 拉取镜像

```bash
docker pull mysql:5.7
```

## 启动容器

:::warning 警告
此处密码设置为 `root` ，可自行修改
:::

```bash
docker run -p 3306:3306 --name mysql \
--restart=always \
-e MYSQL_ROOT_PASSWORD=root  \
mysql:5.7
```
