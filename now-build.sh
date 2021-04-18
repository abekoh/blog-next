#!/bin/bash -e
yum install wget
wget https://github.com/jwerre/node-canvas-lambda/raw/master/node12_canvas_lib64_layer.zip
unzip -j -d canvas_lib64 node12_canvas_lib64_layer.zip
cp canvas_lib64/*so.1 node_modules/canvas/build/Release/
yarn build
