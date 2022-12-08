#!/bin/bash

DAY=$1

if ((DAY >= 1 && DAY <= 25)); then
  FILE=src/days/$(printf "%02d" $DAY).spec.ts
  DAY=$DAY envsubst < tools/day.tpl.ts > $FILE
  code $FILE
else
  echo "usage: $0 [1-25]"
fi
