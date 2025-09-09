---
title: 为你的Twikoo添加酷安表情包
tags:
  - 教程
  - 博客
  - Hexo
  - Twikoo
categories:
  - 教程
  - 博客
cover: https://bu.dusays.com/2025/08/21/68a7339be3c66.webp
abbrlink: 5b9fe4a
summary: >-
  这里是小尘AI，这篇文章介绍了如何为Twikoo评论系统添加酷安表情包，包括研究JSON格式、使用脚本自动化生成表情包链接，以及提供可直接调用的资源链接，帮助用户轻松实现自定义表情功能。
date: 2025-08-21 22:20:01
---

{% tip info %}
更新日志

2025/09/09：非常抱歉诸位，才意识到丢错文件夹了，把json文件丢到了js文件夹，现在已经改过来了，如果引用我的配置文件出现异常的，非常非常非常抱歉！
{% endtip %}

## 前言

咱博客现在也是蒸蒸日上了，主站搭建差不多了，今天来折腾下Twikoo自定义表情包

原本是不想多折腾的，随便找个作业抄抄，结果发现居然没有人做酷安的表情包（~~至少我没找到~~），只能自己造了。。。

## 修改

### 研究格式
看了一下，基本格式就是这样：
```json
{
	"<name-1>": {
		"type": "image",
		"container": [
			{
				"text": "<pic-1>",
				"icon": "<img src='https://<url>/<pic-1>'>"
			},
			..........
			{
				"text": "aru-n",
				"icon": "<img src='https://<url>/<pic-n>'>"
			}
		]
	},
	"<name-2>": {
		"type": "image",
		"container": [
			{
				"text": "<pic-1>",
				"icon": "<img src='https://<url>/<pic-1>'>"
			},
			..........
			{
				"text": "aru-n",
				"icon": "<img src='https://<url>/<pic-n>'>"
			}
		]
	}
}
```

{% tip info %}
嗯。。。十分标准的json格式
{% endtip %}

### 添加酷安表情包

找到了这个项目：

{% link 酷安 emoji 表情包原版 & svg重制版，JS 插件可用于网页,GitHub,https://github.com/NitroRCr/coolapk-emotion %}

记录打包了酷安所有表情包，但自带的调用已经寄了，于是我把所有图转存到了[去不图床](https://7bu.top/)

然后借助gpt写了个脚本，递归添加链接减轻我的工作量

```sh
#!/bin/bash
# 文件: gen_json.sh
# 用法: bash gen_json.sh > output.json

input="./link"
count=1

echo '{'
echo '  "酷安": {'
echo '    "type": "image",'
echo '    "container": ['

while IFS= read -r url; do
    # 最后一行不要逗号
    if [ $count -eq $(wc -l < "$input") ]; then
        echo "      { \"icon\": \"<img src='$url'>\", \"text\": \"c-$count\" }"
    else
        echo "      { \"icon\": \"<img src='$url'>\", \"text\": \"c-$count\" },"
    fi
    count=$((count+1))
done < "$input"

echo '    ]'
echo '  }'
echo '}'
```

{% folding 使用演示 %}
![](https://bu.dusays.com/2025/08/21/68a72ef744eb2.png)
{% endfolding %}

### 成果展示

![](https://bu.dusays.com/2025/08/21/68a730092c3d9.png)

## 抄作业

就不放在这了，太长了，可以直接调用或复制本站的：
```text
https://blog.mcxiaochen.top/json/owo.json
```

单酷安表情包：
```text
https://blog.mcxiaochen.top/json/owo_coolapk.json
```















## 参考资料（排名不分先后）

- https://blog.xiowo.net/posts/759e8c74/
- https://emotion.xiaokang.me/#/
- https://blog.qjqq.cn/posts/f0b5.html
- https://github.com/NitroRCr/coolapk-emotion