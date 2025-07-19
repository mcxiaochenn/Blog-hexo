hexo cl
rm -rf ../blog/*
node link.js
hexo bangumi -u
hexo generate
hexo s
cp -r ./public/* ../blog/

