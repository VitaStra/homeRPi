#!/bin/bash

echo "================Getting the latest version of App=================="
git pull

echo "================Installing server dependencies=================="
cd server
npm install

echo "================Starting the server=================="
npm start

echo "================Installing client dependencies=================="
cd ../client
npm install

echo "================Starting the server=================="
npm start