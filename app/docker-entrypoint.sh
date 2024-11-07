#!/bin/sh

COMMAND="pm2-runtime ecosystem.config.cjs"

if [ "$ENV" = "development" ]; then
  COMMAND="npm run start"
elif [ "$ENV" = "test" ]; then
  COMMAND="npm run test"
fi

exec $COMMAND
