#!/bin/node

const fs = require('fs')

function getDirectoryFiles(dir) {
    dirName = dir.replace("public/img", "");

    console.log(dirName);

    const entries = fs.readdirSync(dir, {
        withFileTypes: true
    });

    var data = {};
    entries.filter(entry => entry.isDirectory()).forEach(subDir => {
        data[subDir.name] = getDirectoryFiles(`${dir}/${subDir.name}`);
    });

    data.files = entries.filter(entry => entry.isFile() && entry.name.endsWith('.png')).map(file => `${dir}/${file.name}`.replace('public/', ''));

    return data;
}

const images = getDirectoryFiles('public/img');

fs.writeFileSync('public/img/images.json', JSON.stringify(images));
