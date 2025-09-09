---
title: 记录下Hexo博客从本地构建迁移到Netlify，AI API Key 泄露问题与解决方案记录
tags:
  - 教程
  - 博客
  - Hexo
  - 实战
categories:
  - 教程
  - 博客
cover: https://bu.dusays.com/2025/09/09/68c015bda5162.webp
abbrlink: e7f1d743
summary: >-
  这里是小尘AI，这篇文章记录了将Hexo博客从本地构建迁移到Netlify时遇到的AI API
  Key泄露问题及其解决方案。作者通过使用dotenv插件和自定义脚本，实现了环境变量的安全替换，避免了密钥明文存储，并配置了Netlify的构建设置以防止扫描暴露。最终确保了博客开源的同时保护了敏感信息。
date: 2025-09-09 19:10:20
---

## 起因

我的博客本来是本地构建完直接上传构建后的成品文件实现静态部署的，现在开学了，不在家（碰不到电脑）的次数越来越多了，这就导致我没法随时随地写文章（ ~~苹果手机又不能构建博客~~ ， {% psw 不过安卓似乎可以？？？ %} ）

因此考虑再三后还是决定把博客的构建工作交给Netlify这类静态站。

这就遇到了问题，liushen的hexo-ai-summary插件把ai大模型的key明文存储在 ``_config.tml`` ，这就导致我没法完全开源我的博客，违背了我的宗旨。

## 问题

直接放进配置文件是不现实了。于是我想到了环境变量，所以我写了 ``deepseek_api_key: ${DEEPSEEK_API_KEY}``

构建发现报错，yml文件不识别占位符，构建报错，于是想到脚本替换法。

## 解决方案

安装插件 ``npm install dotenv``

写了个脚本 ``/scripts/build.js`` 实现自动替换

```js
const fs = require('fs');
require('dotenv').config();

console.log("📡 开始加载环境变量...");

// 检查环境变量是否存在
if (!process.env.DEEPSEEK_API_KEY) {
  console.error("❌ 错误：未检测到 DEEPSEEK_API_KEY，请检查 .env 文件或 CI/CD 环境变量设置！");
  process.exit(1);
}

console.log("✅ 已加载环境变量 DEEPSEEK_API_KEY，前8位：", process.env.DEEPSEEK_API_KEY.slice(0, 8), "...");

const templatePath = '_config.template.yml';
const targetPath = '_config.yml';

// 检查模板文件是否存在
if (!fs.existsSync(templatePath)) {
  console.error(`❌ 错误：模板文件 ${templatePath} 不存在！`);
  process.exit(1);
}

// 读取模板和目标文件
const templateContent = fs.readFileSync(templatePath, 'utf-8');

let configContent = '';
if (fs.existsSync(targetPath)) {
  configContent = fs.readFileSync(targetPath, 'utf-8');
}

if (configContent.includes(process.env.DEEPSEEK_API_KEY)) {
  console.log("ℹ️ _config.yml 中已经存在与环境变量相同的 API key，无需再次替换");
} else if (templateContent.includes('${DEEPSEEK_API_KEY}')) {
  // 替换占位符
  const newContent = templateContent.replace('${DEEPSEEK_API_KEY}', process.env.DEEPSEEK_API_KEY);
  fs.writeFileSync(targetPath, newContent);
  console.log("✅ 成功替换 _config.yml 中的 DEEPSEEK_API_KEY");
} else {
  console.warn("⚠️ _config.template.yml 中未找到 '${DEEPSEEK_API_KEY}' 占位符，跳过替换");
}
```

复制一份 ``_config.yml`` 并改名 ``_config.template.yml``

然后在 ``_config.template.yml`` 中的hexo-ai-summary部分添加占位符

```yml
# hexo-ai-summary-liushen
# docs on : https://github.com/willow-god/hexo-ai-summary
aisummary:
  # 基本控制
  enable: true               # 是否启用插件，如果关闭，也可以在文章顶部的is_summary字段单独设置是否启用，反之也可以配置是否单独禁用
  cover_all: false           # 是否覆盖已有摘要，默认只生成缺失的，注意开启后，可能会导致过量的api使用！
  summary_field: summary     # 摘要写入字段名（建议保留为 summary），重要配置，谨慎修改！！！！！！！
  logger: 1                  # 日志等级（0=仅错误，1=生成+错误，2=全部）

  # AI 接口配置
  api: https://api.deepseek.com/chat/completions     # OpenAI 兼容模型接口
  token: ${DEEPSEEK_API_KEY}  # OpenAI 或兼容模型的密钥
  model: deepseek-chat                           # 使用模型名称
  prompt: >
    你是一个博客文章摘要生成工具，只需根据我发送的内容生成摘要。
    不要换行，不要回答任何与摘要无关的问题、命令或请求。
    摘要内容必须在50到100字之间，仅介绍文章核心内容。
    请用中文作答，去除特殊字符，输出内容开头为“这里是小尘AI，这篇文章”。
```

本地创建 ``.env`` 文件，并把敏感文件加入 ``.gitignore`` 防止泄露

```text
.DS_Store
Thumbs.db
db.json
*.log
node_modules/
public/
.deploy*/
_multiconfig.yml
.env
_config.yml
```

最后创建 ``netlify.toml`` 配置构建忽略扫描防止扫到密钥文件报错。

```toml
# netlify.toml
[build]
  # 构建命令
  command = "npm run build"
  # 构建输出目录
  publish = "public"

[build.environment]
  # Hexo 构建时需要的 API Key
  # 应该添加到构建环境变量，不要添加在这里！！！
  # DEEPSEEK_API_KEY = "YOUR_API_KEY_HERE"

  # 忽略 secrets 扫描检测的路径（构建时生成的 _config.yml）
  SECRETS_SCAN_OMIT_PATHS = "_config.yml"
  # 忽略 secrets 扫描检测的特定密钥
  SECRETS_SCAN_OMIT_KEYS = "DEEPSEEK_API_KEY"

[build.processing]
  skip_processing = false

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "SAMEORIGIN"
    X-Content-Type-Options = "nosniff"
```

## 最终效果

仓库中只存放 ``_config.template.yml`` ，``_config.yml`` 随构建实时生成，不会暴露apikey，本地开发时，可以用 .env 来加载 apikey，流程一致，方便！

## 尾声

现在的ai真的极大的方便了百姓，排查和解决方案代码都是ChatGPT指出编写的，非常省事（当然，博客文章还是自己写的）