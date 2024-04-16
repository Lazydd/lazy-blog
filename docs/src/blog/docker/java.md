# Java

## 创建 Dockerfile 文件

```bash
vi Dockerfile
```

## 写入配置

```bash
#Java镜像
FROM java:8
#指定目录
VOLUME /home/java/fastboot
ADD fastboot-1.0-SNAPSHOT.jar app.jar
# 暴露端口 8888 -- 容器内部端口
EXPOSE 8888
#入口，jar文件的启动命令
ENTRYPOINT ["java","-jar","/app.jar"]
```

## 生成镜像

:::tip 注意
`fastboot` 后面的 `:1.0` 可省略，如果不省略后面在运行的时候要加上，最后的 `.` 则是当前目录，
:::

```bash
docker build -t fastboot:1.0 .
```

## 运行镜像

```bash
docker run -d --name fastboot -p 8888:8888 fastboot --restart=always
```
