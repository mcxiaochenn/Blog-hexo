---
title: 从零开始使用Hexo框架搭建属于你的博客（一）环境准备篇
tags:
  - 保姆级
  - 教程
  - Hexo
  - Web
categories:
  - 教程
  - Hexo
cover: /img/从零开始使用Hexo框架搭建属于你的博客/1/Hexo1.png
abbrlink: e305
summary: >-
  这里是小尘AI，这篇文章详细介绍了从零开始使用Hexo框架搭建个人博客的环境准备步骤。文章基于Arch
  Linux系统，但提供了常见发行版的对应命令。主要内容包括安装VSCode编辑器、Node.js和npm运行环境、Git版本控制工具，以及初始化Hexo项目的完整流程。教程详细展示了如何安装Hexo
  CLI、创建博客文件夹、初始化Hexo项目，并通过hexo命令编译启动本地服务。文章最后预告了后续系列教程的内容规划，包括主题配置、部署上线、后端服务等进阶内容，为读者提供了完整的Hexo博客搭建路线图。
date: 2025-07-22 20:15:15
---

在上一篇「准备篇」中，我们已经聊过了搭建博客的动机、Hexo 是什么、适合谁用、以及部署的大致方向。这篇教程将正式带你动手，从最基础的环境配置开始，为你的 Hexo 博客打好地基。

> 注意：本片教程基于Arch Linux，大多动作通用，遇到不通用的地方我会列出常见发行版的对应命令，要是发现没列出你使用的发行版命令建议自行 [必应](https://www.bing.com/) or [Google](https://www.google.com/) 或者 [ChatGPT](https://chatgpt.com/) or [DeepSeek](https://deepseek.com/)，不要使用百度！！！

## 准备阶段

### 安装VSCode

{% tabs 安装VSCode %}

<!-- tab Arch -->

```shell
yay -S visual-studio-code-bin
```

<!-- endtab -->

<!-- tab Ubuntu/Debian -->

```shell
sudo apt update
sudo apt install software-properties-common apt-transport-https curl
wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > microsoft.gpg
sudo install -o root -g root -m 644 microsoft.gpg /etc/apt/trusted.gpg.d/
rm microsoft.gpg
sudo sh -c 'echo "deb [arch=amd64 signed-by=/etc/apt/trusted.gpg.d/microsoft.gpg] https://packages.microsoft.com/repos/vscode stable main" > /etc/apt/sources.list.d/vscode.list'
sudo apt update
sudo apt install code
```

<!-- endtab -->

{% endtabs %}

### 安装Node.js and npm

{% tabs 安装Node.js、npm %}

<!-- tab Arch -->

```shell
yay -S nodejs npm
```

<!-- endtab -->

<!-- tab Ubuntu/Debian -->

```shell
sudo apt update
sudo apt install nodejs npm
```

<!-- endtab -->

{% endtabs %}

### 安装Git

{% tabs 安装Git %}

<!-- tab Arch -->

```shell
yay -S git
```

<!-- endtab -->

<!-- tab Ubuntu/Debian -->

```shell
sudo apt update
sudo apt install git
```

<!-- endtab -->

{% endtabs %}

## 初始化 Hexo 项目

完成以上环境后，就可以初始化本地 Hexo 项目了！

### 安装Hexo CLI

```shell
npm install -g hexo-cli
```

执行完成后，输入：
```shell
hexo -v
```
确认是否成功安装。

### 创建博客文件夹
```shell
mkdir my-blog
cd my-blog
```

### 初始化Hexo
```shell
hexo init
npm install
```

### 编译启动Hexo
```shell
hexo cl
hexo generate
hexo s
```

![shell显示如上即成功](/img/从零开始使用Hexo框架搭建属于你的博客/1/jietu/localhost4000.png)

随后浏览器访问 http://localhost:4000/

![你就可以看到你的博客页啦！](/img/从零开始使用Hexo框架搭建属于你的博客/1/jietu/localhost4000web.png)

## 尾声

自此，博客基础框架搭建完成，既然说了是框架了，自然要往里添东西，我们下一篇就教大家如何配置anzhiyu主题并个性化设置属于自己的主页等等

接下来将是系列教程内容规划：

- 环境准备篇：安装 Hexo 所需环境，初始化本地项目；
- 主题配置篇：选用适合自己的主题，定制首页样式；
- 部署上线篇：绑定 Cloudflare Pages，首次上线；
- 后端服务篇：部署评论系统与访问统计；
- 进阶技巧篇：添加搜索功能、自定义短链、SEO 优化；
- 终章：暂时不透露 :)










## 参考资料（排名不分先后）
- https://zhuanlan.zhihu.com/p/392994381
- https://hexo.fluid-dev.com/docs/guide/#%E5%85%B3%E4%BA%8E%E6%8C%87%E5%8D%97
- https://markdown.com.cn/
- https://docs.anheyu.com/
- https://blog.csdn.net/yaorongke/article/details/119089190