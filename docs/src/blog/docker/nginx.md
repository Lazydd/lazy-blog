# Nginx

## 拉取镜像

```bash
docker pull nginx
```

## 运行镜像

:::tip 注意
这里我们需要把 nginx 的配置文件做映射，这里只是运行了容器，待会还要重新运行，具体配置在[重新运行 Nginx](/blog/docker/nginx#重新运行-nginx)
:::

```bash
docker run --name nginx -p 80:80 -d nginx
```

## 拷贝文件

:::info 详情

-   `nginx.conf` 基础配置

-   `conf.d` 详细配置

-   `log` 日志

-   `html` web 目录

:::

```bash
docker cp nginx:/etc/nginx/nginx.conf /home/nginx/conf/nginx.conf \
docker cp nginx:/etc/nginx/conf.d /home/nginx/conf.d \
docker cp nginx:/var/log/nginx /home/nginx/log \
docker cp nginx:/usr/share/nginx/html /home/nginx/html
```

## 删除容器，开始重新配置

```bash
docker rm -f nginx
```

## 重新运行 Nginx

```bash
docker run --name nginx -p 80:80 -p 443:443 \
--restart=always \
-v /home/nginx/conf/nginx.conf:/etc/nginx/nginx.conf \
-v /home/nginx/conf/conf.d:/etc/nginx/conf.d \
-v /home/nginx/log:/var/log/nginx \
-v /home/nginx/html:/usr/share/nginx/html -d nginx
```

## 将 Docker 中的 Nginx 容器重新启动即可访问了

## 配置 SSL 证书

:::tip 注意
如果没有 `/home/nginx/ssl` 目录则创建该目录

```bash
mkdir /home/nginx/ssl
```

:::

```bash
docker cp /home/nginx/ssl nginx:/etc/nginx
```

## 配置 Nginx 中的 SSL 协议

```bash
vi /home/nginx/conf/conf.d/default.conf
```

## 写入配置

:::tip 注意
`/etc/nginx/ssl/` 目录为[配置 SSL 证书](/blog/docker/nginx#配置-ssl-证书)处配置映射路径

如果做过端口的代理，还需将[代理转发到容器的网关](/blog/docker/nginx#给-nginx-配置代理转发到网关) `172.17.0.1` [查询容器网关](/blog/docker/install#查看容器网关)

:::

```bash
server {
    #SSL 默认访问端口号为 443
    listen 443 ssl;
    #请填写绑定证书的域名
    server_name ddlazy.cn;
    #请填写证书文件的相对路径或绝对路径
    ssl_certificate /etc/nginx/ssl/ddlazy.cn.pem; // [!code ++]
    #请填写私钥文件的相对路径或绝对路径
    ssl_certificate_key /etc/nginx/ssl/ddlazy.cn.key; // [!code ++]
    ssl_session_timeout 5m;
    #请按照以下协议配置
    ssl_protocols TLSv1.1 TLSv1.2 TLSv1.3;
    #请按照以下套件配置，配置加密套件，写法遵循 openssl 标准。
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
    ssl_prefer_server_ciphers on;
}
```

## 给 Nginx 配置代理转发到网关 <Badge type="tip" text="可选" />

```bash
location = / {
    proxy_pass http://172.17.0.1:3333;
}

location / {
    root /front; // 前端文件路径，绝对路径
    index index.html; // hash 模式只配置这行支持访问 html 文件就可以了
    try_files $uri $uri/ /index.html; // history 模式下需要加一行这个
}

location /demo { // 子级目录
    alias /front/demo;
    index index.html;
    try_files $uri $uri/ /demo/index.html;
}
```

## 给 SSL 配置路径映射

## Nginx 时间同步系统时间

```bash
docker cp /usr/share/zoneinfo/Asia/Shanghai nginx:/etc/localtime
```
