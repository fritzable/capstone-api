#!/bin/bash

API="http://localhost:4741"
URL_PATH="/episodes"
URL="https://longreadsblog.files.wordpress.com/2019/04/dp1-lg.jpg"

curl "${API}${URL_PATH}/5cb5ee051c5b1f349e6af430" \
  --include \
  --request PATCH \
  --header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
    "episode": {
      "urls": "https://longreadsblog.files.wordpress.com/2019/04/dp1-lg.jpg"
    }
  }'

echo
