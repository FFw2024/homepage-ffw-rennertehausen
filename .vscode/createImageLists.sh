#!/bin/bash
imageBaseDir="${0%/*}"

cd ${imageBaseDir}/../public/img
workdir=$(pwd)

echo "creating image lists in workdirectory"
echo ${workdir}

function createImageLists {
    local dir=$1

    if [[ -e "$dir/images.txt" ]]
    then
        rm "$dir/images.txt"
    fi

    local imageFile=$dir/images.txt

    for file in $dir/*
    do
        if [[ -d "$file" ]]; then
            createImageLists $file
        elif [[ -f "$file" && "$file" =~ .+\.png ]]; then
            local filename="${file}"
            echo ${filename##*/} >> $dir/images.txt
        fi
    done
}

createImageLists ${workdir}

