#!/usr/bin/node
const fs = require('fs')

const imageDirs = [
  `${__dirname}/../public/img/alarms`, `${__dirname}/../public/img/exercises`
];

function createImageList(directory) {
  const filenames = fs.readdirSync(directory, {withFileTypes: true});

  const imageFiles =
      filenames.filter((file) => file.isFile() && file.name.endsWith('.jpeg'))
          .map(image => {
            return {filename: image.name};
          });

  if (imageFiles.length > 0) {
    fs.writeFileSync(`${directory}/images.json`, JSON.stringify(imageFiles));
  }

  filenames.filter(file => file.isDirectory())
      .forEach(dir => createImageList(`${directory}/${dir.name}`));
}

imageDirs.forEach(dir => createImageList(dir));
