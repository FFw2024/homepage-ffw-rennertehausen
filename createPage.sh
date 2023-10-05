#!/bin/bash

path="$1"
relativePath=$path
if [[ $path = ./public/* ]]; then
    relativePath="${path#./public/}"
elif [[ $path = public/* ]]; then
    relativePath="${path#public/}"
fi

pageBase=""
pageDir="${relativePath}"
while [[ $pageDir = */* ]]; do
    pageBase="${pageBase}../"    
    
    pageDir="${pageDir%/*}"
done

echo "creating page $relativePath"

if [[ -e "$path" ]]; then
    echo "removing file $path"
    rm $path
fi

while read -r line; do
    if [[ $line = \<base* ]]; then
        line="${line/path/$pageBase}"
    fi
    
    echo "$line" >> $path
done < ./templates/page.html

