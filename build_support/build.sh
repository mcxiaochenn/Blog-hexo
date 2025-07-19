hexo cl
rm -rf ../blog/*
node link.js
hexo bangumi -u
hexo generate
cp -r ./public/* ../blog/
cp ./robots.txt ../blog/
hexo s

