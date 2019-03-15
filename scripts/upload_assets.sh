#!/usr/bin/env bash

file_content_type="application/octet-stream"
files_to_upload=( 
  out/server.js
  out/cli.js
  out/cli-server.js
)


count=0
while [ "x${files_to_upload[count]}" != "x" ]
do
  fpath=${files_to_upload[count]}
  echo "Uploading $fpath..."
  name=$(basename "$fpath")
  url_to_upload="https://uploads.github.com/repos/$CIRRUS_REPO_FULL_NAME/releases/$CIRRUS_RELEASE/assets?name=$name"
  curl -X POST \
    --data-binary @$fpath \
    --header "Authorization: token $GITHUB_TOKEN" \
    --header "Content-Type: $file_content_type" \
    $url_to_upload
  count=$(( $count + 1 ))
done