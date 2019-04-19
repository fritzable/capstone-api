#!/bin/bash

API="http://localhost:4741"
URL_PATH="/episodes"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "episode": {
      "urls":
      {"url": "'"${URL}"'"},
      {"url": "'"${URL}"'"},
    }
  }'

echo
