---
title: 云服务器宝塔部署Twikoo博客评论系统
tags:
  - 教程
  - 博客
  - Hexo
  - Twikoo
categories:
  - 教程
  - 博客
cover: https://bu.dusays.com/2025/09/07/68bd22b556e1b.webp
abbrlink: c83e94c5
summary: >-
  这里是小尘AI，这篇文章介绍了如何通过云服务器和宝塔面板部署Twikoo博客评论系统，包括选择服务器、配置宝塔、使用Docker部署后端和数据库、设置反代、配置DNS与SSL，以及数据迁移步骤，旨在解决免费方案延迟高和不稳定的问题。
date: 2025-09-07 14:08:05
---

## 前言

时间是真快啊，转眼就开学一周了，之所以想从免费的 **Netlify + MongoDB Atlas** 转到付费的云服务器主要有两点。

1. 看到有人被 **MongoDB Atlas** 的免费机制坑了的（一段时间数据库无交互自动注销）
2. 这个方案评论延迟有点高，慢的一批，有时候信号不好发个评论转半分钟，很搞人心态。

## 需要的东西

- 一台云服务器
- 一个域名
- Cloudflare账户

## 准备工作

### 云服务器

这边依旧使用 [雨云](https://www.rainyun.com/blxc123_) 的云服务器作为例子，我选择了 **香港四区** 带宽更大，延迟也能接受

![香港四区](https://bu.dusays.com/2025/09/07/68bd2515333ee.png)

套餐直接一步到位2c4g 50M对等，性价比很高，以后扩展业务也够用了，一个月50不到，新用户首次还有优惠券只要20出头就能拿下

![套餐](https://bu.dusays.com/2025/09/07/68bd2576110ce.png)

系统这边选择Debian+宝塔组合，开箱即用。

![](https://bu.dusays.com/2025/09/07/68bd26147a854.png)

接下来付款，然后坐和放宽，等待服务器启动

![](https://bu.dusays.com/2025/09/07/68bd2674e29b1.png)

### 配置宝塔

显示运行中进入管理面板，直接点击上方的 **宝塔管理面板** （我一开始没发现，傻傻去后台重新修改了端口和用户名密码，不过入口推荐改一下，雨云默认 ``https://<ip>:8889/rainy`` 个人觉得有点危险）

![](https://bu.dusays.com/2025/09/07/68bd281487eba.png)

## 部署Twikoo

### 配置后端和数据库

我不太喜欢宝塔的docker配置界面，所以是直接ssh的

```bash
$ ssh root@1.1.1.1
root@1.1.1.1's password: 
Linux RainYun-S5CxTACA 6.1.0-27-amd64 #1 SMP PREEMPT_DYNAMIC Debian 6.1.115-1 (2024-11-01) x86_64

The programs included with the Debian GNU/Linux system are free software;
the exact distribution terms for each program are described in the
individual files in /usr/share/doc/*/copyright.

Debian GNU/Linux comes with ABSOLUTELY NO WARRANTY, to the extent
permitted by applicable law.
Last login: Sun Sep  7 14:42:17 2025 from 2.2.2.2
root@RainYun-S5CxTACA:~# cd /www/wwwroot
root@RainYun-S5CxTACA:/www/wwwroot# mkdir twikoo
root@RainYun-S5CxTACA:/www/wwwroot# cd twikoo
root@RainYun-S5CxTACA:/www/wwwroot/twikoo# vim docker-compose.yml
```

创建文件和文件夹，路径： ``/www/wwwroot/twikoo/docker-compose.yml``

```yml
version: "3"
services:
  mongodb:
    image: mongo:latest
    container_name: twikoo-mongo
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: twikoo
      MONGO_INITDB_ROOT_PASSWORD: <随机生成一个16位字符串确保安全>
      MONGO_INITDB_DATABASE: twikoo
    ports:
      - "27017:27017"
    volumes:
      - ./mongo-data:/data/db   # 挂载到宿主机 ./mongo-data

  twikoo:
    image: imaegoo/twikoo
    container_name: twikoo
    restart: always
    ports:
      - 8080:8080
    environment:
      TWIKOO_THROTTLE: 1000
      MONGODB_URI: "mongodb://twikoo:<随机生成一个16位字符串确保安全>@mongodb:27017/twikoo?authSource=admin&retryWrites=true&w=majority"
      TWIKOO_IP_HEADERS: '["headers.cf-connecting-ip"]'
    depends_on:
      - mongodb
    volumes:
      - ./data:/app/data
```

然后部署docker容器

```bash
docker-compose up -d
```

### 设置反代

宝塔 -> 网站 -> 反向代理 -> 添加反代

像我这么填

域名：填写一个好记的，例如 ``twikoo.mcxiaochen.top``

目标：``http://127.0.0.1:8080``

发送域名(host)： ``$http_host`` 这个一般不用动

![](https://bu.dusays.com/2025/09/07/68bd2cad0a0a4.png)

### 配置DNS

推荐Cloudflare托管域名，小橙云保护服务器

![](https://bu.dusays.com/2025/09/07/68bd2db1aabb2.png)

### 配置SSL

回到宝塔面板，戳反代右边的 **配置SSL** ，然后随手申请一个 **Let's Encrypt** 的免费证书就行，宝塔会自动续签的

![](https://bu.dusays.com/2025/09/07/68bd2e1866fe8.png)

### 检查

访问域名，如果返回

```json
{
  "code": 100,
  "message": "Twikoo 云函数运行正常，请参考 https://twikoo.js.org/frontend.html 完成前端的配置",
  "version": "1.6.44"
}
```

![](https://bu.dusays.com/2025/09/07/68bd2ec4b0c60.png)

则代表功能正常，可以去前端配置了。

## 迁移数据

非常简单，我使用 **Navicat16** 同时链接 **MongoDB Atlas** 和自建的数据库，复制粘贴就完事了

![](https://bu.dusays.com/2025/09/07/68bd3009f3a8b.png)
























## 参考资料（排名不分先后）

- https://twikoo.js.org/mongodb-atlas.html
- https://chatgpt.com
- https://www.cnblogs.com/phpper/p/16668671.html
- https://www.runoob.com/mongodb/mongodb-connections.html