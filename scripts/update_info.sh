#!/bin/bash
NOW_DATETIME=$(date --iso-8601=hours)
echo "{\"updatedOn\": \"${NOW_DATETIME}\"}" > src/data/info.json
