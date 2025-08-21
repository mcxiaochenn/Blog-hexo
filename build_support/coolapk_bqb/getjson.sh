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

