hexo cl
rm -rf ../blog/*

hexo bangumi -u
hexo generate
cp -r ./public/* ../blog/

hexo s

