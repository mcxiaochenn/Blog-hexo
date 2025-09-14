const YML = require('yamljs')
const fs = require('fs')

let ls   = [],
    data = YML.parse(fs.readFileSync('source/_data/link.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data.forEach((e, i) => {
    let j = 3;  //获取友链数组的范围（除了最后，前面的都获取）
    if (i < j) ls = ls.concat(e.link_list)
});

// 根据 link 去重
let seen = new Set();
ls = ls.filter(item => {
    if (seen.has(item.link)) return false;
    seen.add(item.link);
    return true;
});

fs.writeFileSync('./source/flink_count.json', `{"link_list": ${JSON.stringify(ls)},"length":${ls.length}}`)
console.log('flink_count.json 文件已生成并去重。');
