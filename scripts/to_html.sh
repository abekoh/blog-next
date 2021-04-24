#!/bin/bash

if [[ -z "$1" ]]; then
  echo set POST_ID
  exit 1
fi
POST_ID=$1

DRAFT_KEY=$2
if [[ -n "${DRAFT_KEY}" ]]; then
  DRAFT_KEY_QUERY="?draftKey=${DRAFT_KEY}"
fi

SYNTAX_LANGUAGE="language-$3"
if [[ -z "${DRAFT_KEY}" ]]; then
  SYNTAX_LANGUAGE="language-none"
fi


curl "${MICRO_CMS_HOST}/v1/posts/${POST_ID}${DRAFT_KEY_QUERY}" \
  -H "X-API-KEY: ${MICRO_CMS_API_KEY}" \
  | jq --raw-output .body \
  | sed "s/<br>/<br>\n/g" \
  | sed "s/<pre><code>/<pre><code class=\"${SYNTAX_LANGUAGE}\">/g"