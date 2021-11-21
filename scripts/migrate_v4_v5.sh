#!/bin/bash

# https://mui.com/guides/migration-v4/

echo "migrate $*"

npx @mui/codemod v5.0.0/preset-safe $*
npx @mui/codemod v5.0.0/jss-to-styled $*
yarn lint:fix
