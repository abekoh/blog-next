#!/bin/bash

# like '2021-06-26T16:42:07.000Z'
NOW_DATETIME=$(date --iso-8601=seconds | sed -s 's/\+0000/.000Z/g')
echo "{\"updatedOn\": \"${NOW_DATETIME}\"}" > src/data/info.json
