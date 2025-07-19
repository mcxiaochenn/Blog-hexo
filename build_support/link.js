const YML = require('yamljs');
const fs = require('fs');

const blacklist = ["安知鱼", "友站名称2", "友站名称3"]; // 不想订阅的友链名

let friends = [];
const data_f = YML.parse(fs.readFileSync('source/_data/link.yml').toString().replace(/(?<=rss:)\s*\n/g, ' ""\n'));

data_f.forEach((entry, index) => {
  if (index < 2) {
    const filteredLinkList = entry.link_list.filter(linkItem => !blacklist.includes(linkItem.name));
    friends = friends.concat(filteredLinkList);
  }
});

// 使用 Map 按 link 去重
const uniqueMap = new Map();
friends.forEach(item => {
  if (!uniqueMap.has(item.link)) {
    uniqueMap.set(item.link, item);
  }
});
const uniqueFriends = Array.from(uniqueMap.values());

// 根据规定的格式构建 JSON 数据
const friendData = {
  friends: uniqueFriends.map(item => [item.name, item.link, item.avatar])
};

// 将 JSON 对象转换为字符串并写入文件
fs.writeFileSync('./source/friend.json', JSON.stringify(friendData, null, 2));
console.log('friend.json 文件已生成。');
