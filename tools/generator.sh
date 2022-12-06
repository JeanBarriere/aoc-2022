#!/bin/bash

DAY=$1

if ((DAY >= 1 && DAY <= 25)); then
  DAY=$DAY envsubst < tools/day.tpl.ts > src/days/$(printf "%02d" $DAY).spec.ts
else
  echo "usage: $0 [1-25]"
fi
