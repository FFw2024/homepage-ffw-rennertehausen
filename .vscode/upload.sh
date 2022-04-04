#!/bin/bash

# create server backup
ssh feuerwehr-rennertehausen.de@ssh.strato.de bash ./createBackup.sh
echo "Backup created"

npm run build && npm run export

scp -r ./out/* feuerwehr-rennertehausen.de@ssh.strato.de:/www/
