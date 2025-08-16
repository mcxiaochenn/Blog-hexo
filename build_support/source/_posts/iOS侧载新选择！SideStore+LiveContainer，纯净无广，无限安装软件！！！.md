---
title: iOS侧载新选择！SideStore+LiveContainer，纯净无广，无限安装软件！！！
tags:
  - 保姆级教程
  - IOS折腾
  - 搞机
categories:
  - 教程
  - IOS折腾
abbrlink: 5a0d
cover: /img/iOS侧载新选择！SideStore+LiveContainer，纯净无广，无限安装软件！！！/logo.png
summary: >-
  这里是小尘AI，这篇文章介绍了如何在iOS设备上使用SideStore和LiveContainer实现无限安装和多开应用的方法，摆脱Apple对开发账号的3个应用限制。文章详细解释了SideStore作为AltStore分支的功能，以及LiveContainer作为应用启动器的优势，包括无需实际安装应用、支持多版本和多数据容器等特性。教程部分提供了从准备工作到具体安装配置的完整步骤，包括AltStore安装、SideStore部署、JitterbugPair设备文件获取、StosVPN配置等关键环节。最后还提供了常见问题解答和进阶教程预告，帮助用户更好地利用这套工具实现iOS应用的自由安装和管理。
date: 2025-07-29 14:16:08
---

还在用牛蛙助手/ NB广告助手吗？别用那玩意了，吃相难看还限制安装app数量，按照此教程正确安装SideStore和LiveContainer，你就可以无限安装/多开软件，不受Apple的3软件数量限制

> 本文已过时，请[看新一篇](/posts/801b/)，使用了LiveContainer二合一版本，可以少占用个签名空位，获取配置文件使用图形化界面，操作更顺畅~

## 名词解释

### SideStore是啥？

[SideStore](https://sidestore.io/)是一款iOS应用程序，可简化将应用程序侧载到设备的过程。支持iOS14–iOS26，**所有设备无需越狱**。这是[AltStore](https://altstore.io/)的一个分支，安装[SideStore](https://sidestore.io/)后，**可以实现当手机连接任意WiFi时就可以自签，无需电脑**。

### LiveContainer又是啥？

LiveContainer是一个无需实际安装即可运行iOS应用程序的应用程序启动器！
- 它允许您在其中运行iOS应用程序。
- 允许您安装无限的应用程序（3 个应用程序/10 个应用程序 ID 免费开发人员帐户限制不适用于此处！），可以安装多个版本的应用程序和多个数据容器。
- 当 JIT 可用时，将完全绕过 codesign，无需在安装前对应用进行签名。否则，应用将使用 LiveContainer 使用的相同证书进行签名。


## 准备工作

- 搭载Windows 10及以上系统的x86_64电脑（Linux推荐使用VirtualBox安装win11并安装usb直通插件）
- 一部iPhone
- 一个美区的Apple ID（无须充值或绑定信用卡）
- AltServer安装包（[点我即可下载](https://cdn.altstore.io/file/altstore/altinstaller.zip)）
- AltServer支持iCloud（[点我即可下载](https://updates.cdn-apple.com/2020/windows/001-39935-20200911-1A70AA56-F448-11EA-8CC0-99D41950005E/iCloudSetup.exe)）
- JitterbugPair程序（[点我即可下载](https://github.com/osy/Jitterbug/releases/download/v1.3.1/jitterbugpair-win64.zip)）
- SideStore IPA安装包（[点我即可下载](https://github.com/sidestore/sidestore/releases/latest/download/sidestore.ipa)）
- LiveContainerIPA安装包（[点我即可下载](https://github.com/LiveContainer/LiveContainer/releases/latest/download/LiveContainer.ipa)）
> 如果你已安装Microsoft Store版本的iCould/iTunes，请卸载它。

## 开始教程

可以配合视频食用😋：https://www.bilibili.com/video/BV1SxbizGE1w

### 安装AltStore

记得先安装**AltServer支持iCloud**，这俩都没啥讲究，一路下一步就行，需要注意的是如果你已安装Microsoft Store版本的iCould/iTunes，请卸载它。

### 使用AltStore安装SideStore

1. 把你的手机插上电脑
2. 去资源管理器托盘栏找到一个棱形图标,Shift+左键 戳他
3. 鼠标移动到``Sideload .ipa``点击你的设备名，选择上面下载的**SideStore IPA**，这时候会弹出窗口要你输入你的Apple ID和密码，放心输入，完了验证一下，稍等片刻你的手机桌面上就有SideStore app了（这时候先不要打开它）

### 使用JitterbugPair获取设备文件
1. 解压上面下载的**JitterbugPair程序**
2. 打开解压的文件夹，在上方地址栏输入``cmd``，然后回车
3. 然后在cmd里执行``jitterbugpair.exe``
4. 此时手机上可能会提示允许链接，允许一下
5. 当前文件夹下会产生一个``[UDID].mobiledevicepairing``
6. 使用各种文件传输工具把文件传输到你的iPhone上（推荐[LocalSend](https://localsend.org/zh-CN/download)）

### 传输必要文件

把**LiveContainerIPA安装包**和上一步中的``[UDID].mobiledevicepairing``传输到你的iPhone上

### 安装StosVPN
1. 在你的iPhone的appstore中登录你的美区Apple ID
2. 搜索并下载[StosVPN](https://apps.apple.com/us/app/stosvpn/id6744003051)

### 配置SideStore
1. 打开并启动连接StosVPN
2. 打开SideStore
3. 默认弹出窗口选是，进入文件，选择上面步骤获得的``[UDID].mobiledevicepairing``（如果你不小心选错了或没弹出可以点``Settings``->``Reset Pairing File``然后大退app重选）

### 安装LiveContainer
1. 打开并启动连接StosVPN
2. 打开SideStore
3. 点击底部``My Apps``，选择左上角➕，选择上面下载的**LiveContainerIPA安装包**

### 配置LiveContainer
1. 点击``设置``，点击``安装证书``，点击``给SideStore打补丁``并按照提示选择

## FAQ

### 如何安装软件

打开LiveContainer，选中App页，点击上方➕，选择需要安装的IPA文件即可

### 如何安装/注入插件

打开LiveContainer，选中插件页，点击上方➕，选择需要安装的插件文件即可，可以创建文件夹来给app单独注入插件

## 后日谈

相信你看完这篇文章已经学会如何正确安装并使用SideStore和LiveContainer了，下下篇**进阶篇**将教你如何配置JIT服务来愉快游玩例如Amethyst（PojavLauncher IOS）这样需要JIT权限的模拟器/启动器










---
## 参考资料（排名不分前后）
- https://docs.sidestore.io/zh/docs/intro
- https://sidestore.io/#get-started
- https://livecontainer.github.io/zh-CN/docs/intro
- https://github.com/LiveContainer/LiveContainer