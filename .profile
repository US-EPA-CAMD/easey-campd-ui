#!/bin/bash
echo "Creating Config"

# Recreate config file
rm -rf ./env-config.js
touch ./env-config.js

# Add assignment 
echo "window._env_ = {" >> ./env-config.js
env | while IFS= read -r line; do
  value=${line#*=}
  name=${line%%=*}
  if [[ $name == *"REACT_APP"* ]]; then
    echo "$name : '$value'," >> ./env-config.js
  fi
done
echo "}" >> ./env-config.js

cp ./env-config.js ./build
cd ./build/static/css
cp ./main.*.css ./main.css
