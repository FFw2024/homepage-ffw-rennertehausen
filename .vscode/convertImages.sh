#!/bin/bash

echo $1

function convertImages {
    local dir=$1
    
    for file in $dir/*
    do 
        if [[ -d "$file" ]]; then
            echo $file
            convertImages $file
        elif [[ -f "$file" && "$file" =~ .+\.png ]]; then            
            mogrify -format jpeg $file
            
            rm $file
        fi
    done
}

convertImages $1
