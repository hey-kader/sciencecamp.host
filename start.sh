#!/bin/bash
#
npm run build &> /dev/null

cp -r build backend/
cd backend
ls
