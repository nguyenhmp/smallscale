#!/bin/bash
# My first script
echo "Hello World!"
sudo apt-get update && sudo apt-get upgrade -y 
sudo apt-get install build-essential
sudo apt-get install libssl-dev
sudo apt-get install python-software-properties
sudo apt-get git -y 
sudo apt-get update && sudo apt-get upgrade -y 
curl -O 'https://nodejs.org/dist/v4.3.1/node-v4.3.1-linux-x64.tar.xz'
tar -xf node-v4.3.1-linux-x64.tar.xz
echo "export PATH=/home/ubuntu/node-v4.3.1-linux-x64/bin:$PATH" >> ~/.bashrc
source ~/.bashrc
git clone https://nguyenhmp:Nguyenmp93@github.com/nguyenhmp/smallscale