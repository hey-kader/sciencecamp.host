#!/bin/zsh
#

npm run build
mv build backend/build
cd backend && screen -s build &
pwd
