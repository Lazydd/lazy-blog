# 安装

## 安装

```bash
curl -fsSL https://get.docker.com | bash -s docker --mirror Aliyun
```

## 开机自启

```bash
systemctl enable docker
```

## 配置可视化容器 <Badge type="tip" text="可选" />

```bash
docker run -p 9000:9000 -p 8000:8000 --name portainer \
--restart=always \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /mydata/portainer/data:/data \
-d portainer/portainer-ce
```

## 查看镜像

```bash
docker ps -a
```

## 删除镜像

```bash
docker rm <容器id/容器名称>
```

## 容器开机自启

```bash
docker update <容器id/容器名称> --restart=always
```

## 进入容器

`docker exec -it <容器id/容器名称> bash`

下面是一个例子

```bash
docker exec -it nginx bash
```

## 查看容器网关

```bash
docker inspect <容器id/容器名称>
```
