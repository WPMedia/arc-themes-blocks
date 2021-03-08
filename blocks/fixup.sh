#!/bin/bash

for d in */ ; do
    echo "$d/package.json"
#    cat  "$d/package.json"   | jq '( .repository.url, .name, .homepage) |= sub("wpmedia";"mentor-medier";"gi")'  | sponge  "$d/package.json"  
 #   cat  "$d/package.json"   | jq '.publishConfig.registry |="https://registry.npmjs.org/"'  | sponge  "$d/package.json"   
    cat  "$d/package.json"   | jq '.version |="5.10.0"'  | sponge  "$d/package.json"   
    cat  "$d/package-lock.json"   | jq '.version |="5.10.0"'  | sponge  "$d/package-lock.json"   
 
done
