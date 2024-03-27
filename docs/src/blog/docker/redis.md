# Redis

## 拉取镜像

```bash
docker pull redis
```

## 创建配置目录

```bash
mkdir -p /root/docker/redis/data
mkdir -p /root/docker/redis/conf
```

## 配置 Redis

```bash
vi /root/docker/redis/conf/redis.conf
```

## 写入配置

:::warning 警告
此处密码设置为 `123456` ，可自行修改
:::

```bash
#bind 127.0.0.1 //允许远程连接
protected-mode no
appendonly yes
requirepass 123456
```

## 运行容器

```bash
docker run --name redis -p 6379:6379 \
--restart=always \
-v /root/docker/redis/data:/data \
-v /root/docker/redis/conf/redis.conf:/etc/redis/redis.conf \
-d redis redis-server /etc/redis/redis.conf \
--appendonly yes
```
