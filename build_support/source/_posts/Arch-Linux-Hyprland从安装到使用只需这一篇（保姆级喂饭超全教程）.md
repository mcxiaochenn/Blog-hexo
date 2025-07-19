---
title: Arch Linux+Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）
tags:
  - 保姆级
  - 教程
  - Arch
  - Linux
  - Hyprland
categories:
  - 教程
  - Arch Linux
abbrlink: ae3
cover: /img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/hyprland.png
summary: >-
  这里是小尘AI，这篇文章详细介绍了从零开始在Arch
  Linux上安装配置Hyprland桌面环境的完整流程。教程采用archinstall脚本简化安装过程，包含硬件准备、U盘配置、网络连接、分区设置、系统安装等关键步骤。特别强调了安装前的网络环境要求和分区注意事项，提供了详细的命令行操作指南。文章还涵盖了后续的中文字体安装、非官方源添加、yay包管理器配置以及Hyprland主题(HyDE)的安装方法。针对国内用户，特别说明了代理工具clash-verge的安装配置。教程最后提供了一键安装HyDE主题的便捷脚本，适合想要尝试Arch
  Linux+Hyprland组合的新手用户参考。
date: 2025-07-15 17:57:18
---

# 开始前叠甲
> 第一次写博客，我尽量写好写全。 

本次教程采用``archinstall``脚本极简安装，``archinstall``相当于ArchLinux的安装向导，可以通过简单设置就完成Arch Linux的安装。由于``Archinstall``脚本至今仍在更新完善，因此所有相关教程的时效性都非常短，不同教程之间差异会非常大，建议以最新教程为准。

原则上此前没有使用过Arch及其延伸发行版用户不应该利用Archinstall逃课，但是规范化的安装可以让新用户避免很多灾难性的后果。至于代价，等遇上问题再说吧。本教程只能确保你能用上arch并且完全按教程配置完后能直接开始用。

最后开始前，请确保你手里有一个良好的 **“魔法”** 这点**及其重要**，否则在后续安装/配置过程中会因为**网络问题**而产生很多**奇奇怪怪的问题！！！**


## 准备阶段

### 硬件部分
- 一台用来安装arch的x86电脑（需要有**一整块**空白的**硬盘**用于安装，**单盘双系统此教程不适合你！！！**）
- 一个16G以上的U盘

### 软件部分
- 一份打包好的必要文件：[点我下载此文件](https://github.com/mcxiaochenn/mcxiaochenn/raw/refs/heads/main/files/blogfile/%E4%B8%80%E4%BB%BD%E6%89%93%E5%8C%85%E5%A5%BD%E7%9A%84%E5%BF%85%E8%A6%81%E6%96%87%E4%BB%B6.tar.gz)
- Ventoy：[点我下载此文件](https://www.ventoy.net/cn/download.html)
- Arch Linux安装镜像：[点我下载此文件](https://mirrors.aliyun.com/archlinux/iso/latest/archlinux-x86_64.iso)（使用阿里云镜像站速度有保障，还是慢推荐使用``IDM``、``NDM``这样的多线程下载工具）



## 配置U盘

### 安装Ventoy

1. 插入你的U盘
2. 解压并打开``Ventoy2Disk``
3. 确认选中的是你的U盘**点击安装**即可

### 拷入文件

把之前下载的**Arch Linux安装镜像**和**一份打包好的必要文件**考到资源管理器中名字为``Ventoy``的分区



## 安装Arch Linux篇

### 进入Ventoy

确认文件已经拷到U盘里后重启 狂按``F8``并选择从**USB启动**（这里不同电脑可能不一样）我从网上找了张表，各位对照试试：

{% folding 各品牌主板、笔记本、台式机的U盘启动快捷热键大全对照图表 %}
![各品牌主板、笔记本、台式机的U盘启动快捷热键大全对照图表](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/各品牌主板、笔记本、台式机的U盘启动快捷热键大全对照图表.png)
{% endfolding %}


如果你前面的步骤都没问题那你应该会看到类似这样的界面

![我的ventoy有主题美化，但大差不差](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/boot_ventoy.png)

### 进入ArchLinux Live镜像

此时使用键盘上下键选择你下载的**arch.iso**镜像并回车

选择第一项并按下回车：

![选择第一个就行](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/arch-install.png)

等待一会儿跑码后会来到Arch的安装环境：

![彩条上面是操作指引，如果你英语还不错推荐按照官方流程手动安装，在此过程中可能帮你加深对于Linux的理解，后续出现问题也更好解决](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/arch-installui.png)

由于Archinstall脚本需要联网检查版本，所以必须**保证连接网络**。理论上有线网络只要插上它就会自己连接。（嗯，理论上。。。如果你的网卡过于冷门可能没驱动。。。那教程不具有通用性建议百度自行解决。。。）

### 以下是连接无线网络的办法（如果能驱动起来的话。。。）：

1. **检查网卡设备**：
```shell
iwctl device list
```
![我台式机没无线网卡所以是空的](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall-wifi.png)

2. **连接网络**：
```shell
iwctl station [刚才搜出来的Name下面的网卡名（一般是wlan0）] connect [你的WIFI名（不能是中文！！！）]
```

然后输入密码并回车即可

### 正式archinstall安装

简单讲一下脚本内的操作，方向键上下控制选项，空格为勾选，回车为选中并确认，Esc为退出。

输入命令启动脚本：
```shell
archinstall
```

![Archinstall的主界面](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall-ui.png)

接下来我们逐步一行一行进行讲解、设置，完成安装。

1. **语言**：语言部分不需要进行修改。
2. **Locales（本地化）**：这里可以先把语言改了，缺点是后续进系统会有好多``囗囗囗``（因为没字体）照做就行后续会下载字体

![进入后选择Locale language并回车](</img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/locales/Locale language.png>)

会出现眼花缭乱一堆选项，我们直接输入``/zh_cn``（斜杠不要落下）

![就会变成这样](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/locales/set-cn.png)

这时我们选中下面的``zh_CN.UTF-8``并回车返回即可

![右侧Info框内为当前的设置信息](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/locales/set-info.png)

3. **Mirrors or repositories（镜像源与包）**：这里新版本合并了，5月份还是分开的可见更新之频繁。让我们拆开来设置

***Mirrors***： 镜像源可以认为是提供下载的渠道，但是他们不一定是官方的。大多数镜像源依靠第三方提供和维护，用于缓解网络问题。镜像源按回车进入，选择第一项``Select region``，在列表中选择``China``（同样可以用``/``进行快速搜索）。

> 注意，在选择“Mirror region”时可能会出现卡顿，这是脚本在搜索镜像源，按一下等列表出来就好，否则你会选成“Alabania”。

![如果还需要使用其它地区的镜像，按空格即可勾选](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/Mirrors/Mirrors-set.png)

***repositories***：这里可以选择常见仓库，推荐把multilib勾选上

![我们选这个选项进去](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/Mirrors/repositories-set.png)

![推荐把multilib勾选上](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/Mirrors/multilib.png)

4. Disk configuration（硬盘配置）：也就是给硬盘分区。**这是非常危险的一步，每一个操作一定小心谨慎，一旦失误不可挽回。请确保需要安装的硬盘中没有任何数据，这一步会清除掉硬盘上的所有数据。如果是准备在一个硬盘中同时安装多个系统则不应该使用Archinstall。**

选择硬盘配置后点击“Partitioning”，之后如果想使用默认设置就选择“Use a best-effort default partition layout”，想自己调整就选“Manual Partitioning”，本教程只介绍默认设置。选好后进入下图界面

![这里选择需要分区的硬盘，同样可以使用空格勾选多个硬盘进行分区](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/disk/configuration.png)

选好硬盘后再选择文件系统格式：

![文件系统只能选择其中一种且后续不方便更换](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/disk/filesys.png)

- **Btrfs**：支持快照压缩，适合备份，但随机写入慢。
- **Ext4**：稳定通用，适合数据库，缺乏高级功能。
- **XFS**：大文件性能强，适合云存储，小文件一般。
- **F2FS**：专为SSD优化，写入快，传统硬盘不推荐。

**文件系统之间没有好坏之分，请选择适合自己的文件系统！**

个人偏向**Ext4**和**XFS**，故此次教程以**Ext4**为例：

![选中后回车](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/disk/filesysok.png)

> 正常来说选择完还有一个问你是否单独为``/home``创建分区，推荐选``no``，本人有遇到过 **根目录爆满home目录，占用不到40%** 的尴尬情况，扩容又容易出事，干脆直接合并，省心。

6. 交换区（Swap）：**保持默认即可**

7. 启动引导（Bootloader）：启动引导负责开机时引导电脑载入操作系统，一般**保持不动就好**。

8. 统一内核镜像（Unified kernel images）：它会把一些启动系统需要的东西全部打包在一起，这样就能进行统一的签名和认证，一般**保持默认即可**。

9. 主机名(Hostname)：和Windows的主机名一样，给机器起名字，**可以改一下**。

10. 超级管理密码（Root password）：超级管理员（root）账户的密码，拥有系统的最高权限，相当于Windows中的管理员，但是权限要更加大得多。**注意，如果不设置密码则没有超级管理员账户，会在很大程度上受到限制(安卓手机所谓的Root就是为了获得最高管理员的控制权)。** ***记得设置！！！***

11. 用户账户（User account）：管理用户账户，**一定要创建一个基本的账户，否则只有root用户很容易造成事故**。

![选“Add a user”创建一个账户](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/user/adduser.png)

![设置用户名](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/user/addusers.png)

![设置密码（要输两遍哦）](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/user/setuserpasswd.png)

![是否要给此账户root权限，取决于你自己](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/user/addusersok.png)

然后点``Confirm and exit``

12. 配置（Profile）：这次带大家装``Hyprland``自然是选``Desktop``环境辣

选择路线：``Profile`` --> ``Type`` --> ``Desktop`` --> ``Hyprland`` --> ``polkit``

![Hyprland](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/profile/hyprland.png)

![Seat access](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/profile/access.png)

显卡驱动（n卡）：``Graphics driver`` --> ``Nvidia（proprietary）``

其他用户：根据显卡的品牌来选择就好

![显卡驱动](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/profile/xkqd.png)

![n卡推荐使用闭源驱动体验更佳](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/profile/fknv.png)

13. 音频（Audio）:音频管理工具，新电脑建议选``pipewire``。

14. 内核（Kernels）：Linux有几个不同特性的内核供你选择，主要区别在于：

- **Linux**：最新功能，适合测试，稳定。
- **Linux-hardened**：强化安全，兼容性受限，适合高安全需求。
- **Linux-lts**：长期支持，稳定可靠，适合生产环境。
- **Linux-zen（推荐）**：低延迟优化，适合桌面/高性能环境。

![按空格键选中/取消（别忘了把原版内核取消勾选不然会有多个内核）](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/kernelset.png)

15. 网络配置（Network configuration）：选最下面的``使用网络管理器``

![从上往下分别是“复制当前网路配置”“自己配置”“使用网络管理器”](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/networkset.png)

16. 添加包（Additional packages）：跳过，要装可以等系统配置完再按需安装。

17. 时区（Timezone）:中国时区选择“Asia/Shanghai”。

![同样可以利用“/”快速选择](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/timezone.png)

18. 自动时间同步：默认启用，不用动。

终于！设置完了，现在你可以选择``install``然后**坐和放宽**，起身去喝杯茶 :)

![开始安装！！！](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/install.png)

### archinstall安装完成

![等你回来要是看到这个界面就代表一切正常，你已经成功把arch安装进你的电脑](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/archinstall/installover.png)

接下来选择``Reboot system``等待重启即可进入arch！

## 修复破碎的字体并安装基本依赖

![重启后如果显卡驱动工作正常的话你会来到这个界面](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/inarch/sddm.png)

> 原谅我，不想重装系统**虚拟机下Hyprland跑不起来**,接下去一段可能没图了，但我会尽量把步骤给讲清楚。

输入你设置对应用户的密码并登录，然后你就会来到一个非常干净只有一张壁纸的界面

![主题样例](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/hyprland/bizhi/bizhi1.png)

恭喜你，Hyprland在你的设备上工作正常！🎉🎉🎉

### 正式开始

1. 按下**Super**（也就是win键，键盘左下角CTRL和ALT之间的那个按键）+**E**，打开资源管理器（姑且这么叫吧，感觉亲切一点）。

2. 挂载U盘并打开我之前分享的``一份打包好的必要文件``

3. 按**Super**+**Q**打开**kitty终端**，输入
```shell
cat [文件的绝对路径]
```
> 教一个小妙招，可以把文本文件按住鼠标左键拖进终端，然后回车即可，不用手打路径。**文本文件里面是在你用上浏览器之前需要输入的所有命令。**

4. 把鼠标指针移动到**资源管理器**上按**Super**+**C**关闭，然后按**Super**+**Q**再打开一个**kitty终端**

### 添加非官方源
在``sudo nano /etc/pacman.conf``末尾加入
```shell
[archlinuxcn]
SigLevel = Optional TrustedOnly
#清华源
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinuxcn/$arch
#中科大源
Server = https://mirrors.ustc.edu.cn/archlinuxcn/$arch
# 阿里源
Server = https://mirrors.aliyun.com/archlinuxcn/$arch
```

### 导入 archlinuxcn key
```shell
sudo pacman -Sy archlinuxcn-keyring
```

### 安装yay  base-devel
```shell
sudo pacman -Sy yay base-devel
```

### 安装中文字体
```shell
sudo pacman -S noto-fonts noto-fonts-cjk noto-fonts-extra noto-fonts-emoji ttf-dejavu ttf-liberation
```

### 结束

记得执行``reboot``确保操作生效！


## 配置Hyprland主题（HyDE）

### 配置魔法（很重要除非你在非大陆地区！）
```shell
yay -S clash-verge-rev-bin
```
安装完成后去终端输入``clash-verge``启动，因为**还没安装HyDE导致无法弹窗提权**，需要在终端手动授权sudo，具体配置就不多讲了，记得打开**系统代理**和**虚拟网卡**双模式，**安装虚拟网卡驱动**时也**需要在终端输入一遍账户密码**

### HyDE安装方法1（推荐）：

使用我的[HyDE-Helper](https://github.com/mcxiaochenn/HyDE-Helper)项目一行命令完成安装
```shell
bash -c "$(curl -fsSL https://github.com/mcxiaochenn/HyDE-Helper/raw/refs/heads/main/shell/master/HyDE-install.sh)"
```
后续更新：
```shell
bash -c "$(curl -fsSL https://github.com/mcxiaochenn/HyDE-Helper/raw/refs/heads/main/shell/master/HyDE-update.sh)"
```

### HyDE安装方法2：

参考官方步骤安装
```shell
pacman -S --needed git base-devel
git clone --depth 1 https://github.com/HyDE-Project/HyDE ~/HyDE
cd ~/HyDE/Scripts
./install.sh
```
后续更新：
```shell
cd ~/HyDE/Scripts
git pull origin master
./install.sh -r
```

### HyDE安装过程

安装过程中会要求提权，还有各种选项，记得盯着点，此时不能坐和放宽了，一般遇到二选一就是``y``or``1``，这么选肯定没问题，如果你的网络环境没问题基本上6~8分钟结束。结束后可以别急着重启，HyDE默认会安装``firefox``浏览器如果你不喜欢可以重装Edge等浏览器。
```shell
yay -Rns firefox #卸载火狐
yay -S microsoft-edge-stable-bin #安装微软Edge
```

### 结束

记得执行``reboot``确保操作生效！

> 此时的你可能初见端倪，已经发现一些问题了吗？但不要着急，后续有专门一段内容教你解决问题，现在先放一放，继续完成剩下的操作。


## 安裝输入法

### 安装输入法框架
```shell
sudo pacman -S fcitx5-im fcitx5-rime
```
### 配置环境变量
> ``/etc/environment`` 是一个系统配置文件，用于设置环境变量。这些环境变量在系统启动时被加载，并且对所有用户和进程都有效。这个文件通常用于设置全局环境变量，而不是用户特定的环境变量。

编辑文件 ``sudo vim /etc/environment``:
```shell
# fcitx5 support
#export GTK_IM_MODULE=fcitx
export QT_IM_MODULE=fcitx
export XMODIFIERS="@im=fcitx"
```
> 眼尖的你应该发现了我注释了GTK的实现因为arch wiki文章写道：Do not set ``GTK_IM_MODULE`` to xim globally as it affects GTK3 programs as well. XIM has various problems (such as the input method cannot input after restarting), so try not to use it. **所以我注释了** :)

### 配置 Hyprland 自动启动 Fcitx5

编辑 ``Hyprland`` 的用户配置文件 ``vim ~/.config/hypr/userprefs.conf``，在末尾添加：
```shell
exec-once = fcitx5 --replace -d
```
> 使用 ``-d`` 选项表示以守护进程（daemon）方式运行。这意味着 Fcitx5 将在后台持续运行，提供输入法服务。

> ``--replace`` 选项的作用是如果已经有一个 Fcitx5 实例正在运行，新的实例将取代现有的实例。这可以确保只有一个 Fcitx5 实例在运行，避免多个实例同时运行导致的冲突或资源浪费。

### 输入法皮肤

![推荐这款高颜值，我用了好久了](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/srfzs.png)

```shell
paru -S fcitx5-skin-ori-git
```
![生效设置](/img/Arch-Linux-Hyprland从安装到使用只需这一篇（保姆级喂饭超全教程）/jietu/srfskinset.png)

### 配置雾凇拼音
```shell
cd ~/.local/share/fcitx5/rime
git clone https://github.com/iDvel/rime-ice.git
cp -r ./rime-ice/* .
sed -i 's/# \(- { when: \(paging\|has_menu\), accept: \(comma\|period\), send: Page_\(Up\|Down\) }\)/\1/' default.yaml
sed -i 's/page_size: 5/page_size: 9/' default.yaml
```
> 这样配置完还改了**候选词数量**和**逗号、句号翻页**

### 语言大模型

肥肠好用，中文输入更准确。
```shell
cd ~/.local/share/fcitx5/rime
yay -S axel
axel -n 32 https://github.com/amzxyz/RIME-LMDG/releases/download/LTS/wanxiang-lts-zh-hans.gram
```
新建编辑 ``rime_ice.custom.yaml`` 文件：
```shell
patch:
  grammar:
    language: wanxiang-lts-zh-hans
    collocation_max_length: 5
    collocation_min_length: 2
  translator/contextual_suggestions: true
  translator/max_homophones: 7
  translator/max_homographs: 7
```


## 最后来修bug
> 我遇上的所有问题都写在这了，还有问题自行解决或在博客评论区留言我看到会回（都玩Linux了推荐自己尝试解决，锻炼独立思维）

### HyDE不显示通知/音量调节不显示
是上游插件更新导致的，截止本文发布还未修复，可以使用``downgrade``工具降级，具体步骤：
```shell
sudo pacman -S downgrade
sudo downgrade pango
```
上下选择``59``并确认，安装完会问题是否加入更新排除名单，推荐``y``
此事在HyDE Issues中亦有记载：[HyDE-Project/HyDE/#905](https://github.com/HyDE-Project/HyDE/issues/905#issuecomment-3017999043)

### xxx软件无法输入中文
在软件启动项加入``--ozone-platform-hint=auto --enable-wayland-ime``
例如Edge VSCode这类软件可以利用flags config解决：
```shell
echo "--ozone-platform-hint=auto\n--enable-wayland-ime" > ~/.config/microsoft-edge-stable-flags.conf #edge
echo "--ozone-platform-hint=auto\n--enable-wayland-ime" > ~/.config/code-flags.conf #vscode
```

### 键盘F1~F12被映射为了媒体键或别的

这有两种情况，一种是键盘类型识别错误，修改键盘识别即可，具体操作：
```shell
echo 2 | sudo tee /sys/module/hid_apple/parameters/fnmode
echo "options hid_apple fnmode=2" | sudo tee -a /etc/modprobe.d/hid_apple.conf
mkinitcpio -P
```

另一种情况就是HyDE映射了，去``vim ~/.config/hypr/keybindings.conf``注释对应代码
我直接把所有带F功能键值的代码都注释了，简单粗暴



## 尾声
姑且就想到那么多，没想到写博客那么费时间，我从2025-07-15 17:57:18开始写，现在已经是2025-07-15 23:08:35了，被家里人催睡觉了，明天再查漏补缺吧，今天就到这了，评论功能也没修好，有问题直接发邮箱问吧，在[我GitHub主页](https://github.com/mcxiaochenn)就有我的邮箱地址

对了，我这里有一个性价比很高的云服务商，那就是————雨云！他们家的服务不仅性价比高，还照顾小白，我准备把我博客的评论系统迁移上去，想必体验会非常不错！[点我跳转雨云官网](https://www.rainyun.com/blxc123_)


2025/07/17 07:30

这两天会更新如何搭建评论系统和浏览量显示！！！









---

> 写在最后：恭喜你看到这里，不出意外按照此教程你已经成功安装了Arch Linux+Hyprland+HyDE以及中文输入法并修复了键盘F功能键异常和软件无法输入中文的问题，现在你得到了一个基本可以使用的Arch桌面环境，但不要止步于此哦，Linux还有更多更多等待着你去探索，在摸索中进步也是Linux的魅力所在，相信对其感兴趣的你会继续在探索中进步并更加喜欢计算机技术这一科目！！！

## 参考资料（排名不分先后）
- https://zhuanlan.zhihu.com/p/25308291469
- https://linux.do/t/topic/537067
- https://www.wanjiachupin.com/299.html
- https://www.quanxiaoha.com/linux-command/linux-install-font.html
- https://www.cnblogs.com/orochihuang/p/15193699.html
- https://blog.csdn.net/m0_46238775/article/details/127097605
- https://bbs.archlinuxcn.org/viewtopic.php?id=14347
- https://www.ventoy.net/cn/doc_news.html
- https://wiki.archlinuxcn.org/wiki/%E5%AE%89%E8%A3%85%E6%8C%87%E5%8D%97
- https://wiki.archlinuxcn.org/wiki/Hyprland
- https://www.rayalto.org/2024/02/20/archlinux-hyprland-install/
- https://github.com/HyDE-Project/HyDE
- https://github.com/mcxiaochenn/HyDE-Helper