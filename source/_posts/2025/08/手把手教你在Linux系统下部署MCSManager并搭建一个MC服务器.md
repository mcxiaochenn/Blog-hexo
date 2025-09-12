---
title: 手把手教你在Linux系统下部署MCSManager并搭建一个MC服务器
tags:
  - 教程
  - Linux
  - Minecraft
  - MCSManager
categories:
  - 教程
  - mc
cover: https://bu.dusays.com/2025/08/22/68a8922f4c34e.webp
abbrlink: 1b75e3c5
summary: >-
  这里是小尘AI，这篇文章手把手教你如何在Linux系统下部署MCSManager并搭建Minecraft服务器。内容包括选择云服务器或家庭服务器，安装MCSManager面板，下载和配置Java运行环境及Fabric服务端核心，以及常见问题的解决方法，帮助初学者快速完成服务器搭建。
date: 2025-08-22 22:18:52
---

## 服务器

### 云服务器
要想开服，自然少不了服务器了，这里推荐[雨云](https://www.rainyun.com/blxc123_)的[云服务器](https://www.rainyun.com/blxc123_)，性价比很高：

{% link 雨云服务器,雨云,https://www.rainyun.com/blxc123_ %}

推荐4G内存以上，地域离自己越近越好，系统选择 Ubuntu 作为演示

### 家里云服务器

要是你自家有IPv4公网IP且有闲置服务器/电脑，那么自然也是可以的，没有的话只能用IPv6或者frp了，这里不再多讲

### 为什么要使用Linux

1. Linux内存占用低
2. 系统轻量稳定

也就是说相同配置下Linux可用内存会比Windows更多

## 安装MCSManager面板

{% tip info %}
如果你是纯Linux小白，也不用太担心，能看懂中文和一点点初中英语就行。
{% endtip %}

连接ssh
```bash
$ ssh <user>@<server ip>
The authenticity of host 'xxx.xxx.xxx.xxx (xxx.xxx.xxx.xxx)' can't be established.
ED25519 key fingerprint is SHA256:4bW+CTHuMxxxxxxxxxxxxxxxxxxxgDXWaEWgSd6w9aA.
This key is not known by any other names.
Are you sure you want to continue connecting (yes/no/[fingerprint])? yes
Warning: Permanently added 'xxx.xxx.xxx.xxx' (ED25519) to the list of known hosts.
mcxiaochenn@xxx.xxx.xxx.xxx's password: 
Linux chen-nas 6.12.18-trim #5 SMP PREEMPT_DYNAMIC Thu Mar 27 10:30:00 CST 2025 x86_64
Last login: Wed Aug  6 15:42:56 2025 from 192.168.xx.xx
```

这样就是链接成功了，直接输入**一键安装脚本**安装
```sh
sudo su -c "wget -qO- https://script.mcsmanager.com/setup_cn.sh | bash"
```

等待脚本运行完成，MCSManager就安装完成了

```bash
+----------------------------------------------------------------------
| MCSManager 安装脚本 (MCSManager Installer)
+----------------------------------------------------------------------

（此处省略）......

==================================================================
安装完成，欢迎使用 MCSManager ！
 
主控网页访问地址:        http://<Your IP>:23333  (Browser)
被控守护进程地址:          ws://<Your IP>:24444    (Cluster)
默认情况下，你必须开放 23333 和 24444 端口才能确保面板工作正常！
 
面板开关指令:
systemctl start mcsm-{daemon,web}.service
systemctl stop mcsm-{daemon,web}.service
systemctl restart mcsm-{daemon,web}.service
 
官方文档: https://docs.mcsmanager.com/
==================================================================
```

我们使用云服务器的公网IP或者家里云的对应IP从浏览器访问MCSManager后台。一路下一步傻瓜式就行

最后来到此界面代表MCSManager已经安装完成

![我这里已经使用了一段时间，所以有列表，你们应该是空的](https://bu.dusays.com/2025/08/22/68a883c747053.png)

## 下载Java运行环境并配置MC服务器

本次教程只助你搭建起基本的服务器，更加高深的内容可以去各大wiki文档学习

### 下载Azul Zulu 21 JDK

个人觉得zulu更适合mc这类吃单核的场景，实测（~~应该~~）不影响生电机器，至少我自己服务器用了2年了，从1.20.1到1.21.4，从640熔炉组到分整流全物品，都没出过问题，~~相比原版有1~5%的玄学加成~~

{% link Zulu 21 for Linux,Azul,https://www.azul.com/downloads/?version=java-21-lts&os=linux&architecture=x86-64-bit&package=jdk#zulu %}

直接下载.zip版本即可

![如图](https://bu.dusays.com/2025/08/22/68a8883b7c1d1.png)

### 下载1.21.4的Fabric服务端核心

```bash
curl -OJ https://meta.fabricmc.net/v2/versions/loader/1.21.4/0.17.2/1.1.0/server/jar
```

或者去Fabric官网获取：

{% link Download Minecraft Server Launcher,Fabric,https://fabricmc.net/use/server %}

### 配置并上传到MCSManager

我们直接创建一个新的实例

![](https://bu.dusays.com/2025/08/22/68a88ac35f229.png)

取个你喜欢的名字，下面启动命令空着，点**创建实例**

![](https://bu.dusays.com/2025/08/22/68a88b0205119.png)

接下来点击你创建的项目进去，文件管理，把你前两步下载的``Azul Zulu 21 JDK``和``Fabric服务端核心``上传进去

然后选择你上传的jdk压缩包并解压

![](https://bu.dusays.com/2025/08/22/68a88c6812c37.png)

之后记录下解压目录/bin/jar的路径

返回到实例页面点击**应用实例设置**，启动命令填入：
```bash
# 我的
chmod +x ./Java/zulu21.44.17-ca-jdk21.0.8-linux_x64/bin/java

# 示例
chmod +x ./解压目录/bin/java
```

随后运行。

控制台显示这样是正常的：
```bash
[INFO] 正在启动...
[INFO] 仿真终端模式已生效，您可以直接在终端内直接输入内容并使用 Ctrl，Tab 等功能键
[INFO] 实例已启动...
[INFO] 实例已停止。
```

最后把启动命令改为：
```bash
# 我的
./Java/zulu21.44.17-ca-jdk21.0.8-linux_x64/bin/java -Xms32G -Xmx32G -jar fabric-server-mc.1.21.4-loader.0.17.2-launcher.1.1.0.jar nogui

# 示例
./解压目录/bin/java -Xms <服务器最大内存减一> -Xmx <服务器最大内存减一> -jar fabric-server-mc.xxxxxxxxxxxxxxxxxxxxxxxx.jar nogui
```

保存并启动就完成一个最基本服务器的部署

## 常见问题

### You need to agree to the EULA in order to run the server. Go to eula.txt for more info.
去服务端配置文件把``eula.txt``中的``false``改为``true``

### 没有服务端配置文件选项
在应用实例设置中的实例类型项目把类型改为``MC Fabric``

### 为什么进不去游戏
服务器默认启用正版验证，可能你启动器没有登录正版账号或网络问题导致正版验证失败

### 看不懂配置文件怎么办
MCSManager提供绝大多数配置文件汉化，如果还是不懂可以把值丢给ai，让ai给你一条条解释

### 我还遇到了xxx问题怎么办
打开DeepSeek，问：我在部署mc服务器时遇到了xxx问题应该怎么办解决。即可解决