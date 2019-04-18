#!/bin/bash

API="http://localhost:4741"
URL_PATH="/episodes"

curl "${API}${URL_PATH}/${ID}" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "episode": {
      "owner": "'"${OWNER}"'",
      "urls": [
      {"url": "'"${URL}"'"},
      {"url": "'"${URL}"'"}
    ]
  }
  }'

echo
