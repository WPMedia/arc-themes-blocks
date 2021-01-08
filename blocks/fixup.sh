#!/bin/bash

for d in */ ; do
    echo "$d/package.json"
    gsed -i  "s/wpmedia/mentor-medier/ig" "$d/package.json"
done

