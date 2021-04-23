#!/bin/bash
NOW_DATETIME=$(date --iso-8601=seconds)
echo "{\"updatedOn\": \"${NOW_DATETIME}\"}" > src/data/info.json
