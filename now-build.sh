#!/bin/bash -e
wget https://github.com/jwerre/node-canvas-lambda/raw/master/node14_canvas_lib64_layer.zip
unzip -j -d canvas_lib64 node12_canvas_lib64_layer.zip
cp canvas_lib64/*so.1 node_modules/canvas/build/Release/
yarn build
