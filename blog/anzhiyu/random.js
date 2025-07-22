var posts=["posts/ae3/","posts/3eeb/","posts/e305/","posts/7e9/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"尘の个人博客","link":"https://blog.mcxiaochen.top/","avatar":"https://blog.mcxiaochen.top/favicon.ico","descr":"一个高中生UP搭的博客 QwQ","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.mcxiaochen.top/","color":"vip","tag":"系本站啦"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"主题开发者"},{"name":"Mo的记事簿","link":"https://blog.xiowo.net/","avatar":"https://blog.xiowo.net/img/avatar.png","descr":"万年鸽王，哈哈OvO","siteshot":"https://bu.dusays.com/2025/06/17/685044d6bca69.png","color":"vip","tag":"主题美化"},{"name":"张洪Heo","link":"https://blog.zhheo.com/","avatar":"https://img.zhheo.com/i/67d8fa75943e4.webp","descr":"分享设计与科技生活","siteshot":"https://img.zhheo.com/i/67d8fb3c51399.webp","color":"vip","tag":"主题设计"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"但愿日子清静抬头遇见的满是柔情","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.bsgun.cn/","color":"vip","tag":"主题魔改"},{"name":"一粒微尘","link":"https://blog.667408.xyz","avatar":"https://blog.667408.xyz/favicon.ico","descr":"撷光以望，纳星于瞳","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.667408.xyz","color":"vip","tag":"主题修改"},{"name":"前尘小筑","link":"https://mnchen.cn/","avatar":"https://image.mnchen.cn/2023/12/mnochen.jpg","descr":"虽多尘色染，犹见墨痕浓","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://mnchen.cn/","color":"vip","tag":"主题修改"},{"name":"铭心石刻","link":"https://blog.kouseki.cn/","avatar":"https://blog.kouseki.cn/imgs/avatar.webp","descr":"愿岁并谢，与友长兮","siteshot":"https://blog.kouseki.cn/imgs/siteshot.webp","color":"vip","tag":"主题修改"},{"name":"Naokuo","link":"https://www.naokuo.top","avatar":"https://cdn.cbd.int/naokuo-blog/img/about/avatar-512x512.png","descr":"请给我来亿碗三鲜面","siteshot":"https://cdn.cbd.int/naokuo-blog/img/about/www.naokuo.top.webp","color":"vip","tag":"主题修改"},{"name":"冰月博客","link":"https://blog.bingyue.top/","avatar":"https://blog.bingyue.top/img/456.png","descr":"Code is very fun","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.bingyue.top/"},{"name":"未觉寻星","link":"https://xyamzw.top","avatar":"https://cdn.jsdelivr.net/gh/xyamzw/xyamzw/images/blog/avatar.png","descr":"弹奏自己的人生，演绎自己的全部","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://xyamzw.top"},{"name":"尘の个人博客","link":"https://blog.mcxiaochen.top/","avatar":"https://blog.mcxiaochen.top/favicon.ico","descr":"一个高中生UP搭的博客 QwQ","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.mcxiaochen.top/","color":"vip","tag":"系本人啦"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true},{"name":"Mo的记事簿","link":"https://blog.xiowo.net/","avatar":"https://blog.xiowo.net/img/avatar.png","descr":"万年鸽王，哈哈OvO","siteshot":"https://bu.dusays.com/2025/06/17/685044d6bca69.png"},{"name":"张洪Heo","link":"https://blog.zhheo.com/","avatar":"https://img.zhheo.com/i/67d8fa75943e4.webp","descr":"分享设计与科技生活","siteshot":"https://img.zhheo.com/i/67d8fb3c51399.webp"},{"name":"梦爱吃鱼","link":"https://blog.bsgun.cn/","avatar":"https://oss-cdn.bsgun.cn/logo/avatar.256.png","descr":"但愿日子清静抬头遇见的满是柔情","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.bsgun.cn/"},{"name":"一粒微尘","link":"https://blog.667408.xyz","avatar":"https://blog.667408.xyz/favicon.ico","descr":"撷光以望，纳星于瞳","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.667408.xyz"},{"name":"前尘小筑","link":"https://mnchen.cn/","avatar":"https://image.mnchen.cn/2023/12/mnochen.jpg","descr":"虽多尘色染，犹见墨痕浓","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://mnchen.cn/"},{"name":"铭心石刻","link":"https://blog.kouseki.cn/","avatar":"https://blog.kouseki.cn/imgs/avatar.webp","descr":"愿岁并谢，与友长兮","siteshot":"https://blog.kouseki.cn/imgs/siteshot.webp"},{"name":"Naokuo","link":"https://www.naokuo.top","avatar":"https://cdn.cbd.int/naokuo-blog/img/about/avatar-512x512.png","descr":"请给我来亿碗三鲜面","siteshot":"https://cdn.cbd.int/naokuo-blog/img/about/www.naokuo.top.webp"},{"name":"冰月博客","link":"https://blog.bingyue.top/","avatar":"https://blog.bingyue.top/img/456.png","descr":"Code is very fun","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://blog.bingyue.top/"},{"name":"未觉寻星","link":"https://xyamzw.top","avatar":"https://cdn.jsdelivr.net/gh/xyamzw/xyamzw/images/blog/avatar.png","descr":"弹奏自己的人生，演绎自己的全部","siteshot":"https://image.thum.io/get/width/400/crop/800/allowJPG/wait/20/anheyu.com/https://xyamzw.top"},{"name":"Rainyun 润雨科技","link":"https://www.rainyun.com/blxc123_","avatar":"https://www.rainyun.com/favicon.ico","descr":"🚀 稳定 · 高性价比 · 学生/开发者友好！","siteshot":"/img/link/yuyun.png"}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 3) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };