#!/bin/bash

API="http://localhost:4741"
URL_PATH="/episodes"
URL="https://longreadsblog.files.wordpress.com/2019/04/jenny-odell-orb-of-ambivalence-1.png"
# URL="https://longreadsblog.files.wordpress.com/2019/04/dp1-lg.jpg"
curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "episode": {
      "urls": {
      "url": "'"${URL}"'"
      }
    }
  }'

echo
