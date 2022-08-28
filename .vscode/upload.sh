#!/bin/bash

# create server backup
echo "Backup remote content"
ssh feuerwehr-rennertehausen.de@ssh.strato.de bash ./createBackup.sh
echo "Backup created"

echo "compile sass content"
sass ./styles/custom.scss ./public/styles/custom.css

echo "upload files"
rsync -azP --delete ./public/* feuerwehr-rennertehausen.de@ssh.strato.de:./www/
