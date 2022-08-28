ssh feuerwehr-rennertehausen.de@ssh.strato.de bash ./createBackup.sh
echo "Backup created"

scp -r ./public/* feuerwehr-rennertehausen.de@ssh.strato.de:/www/
