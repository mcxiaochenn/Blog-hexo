// scripts/build.js
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
