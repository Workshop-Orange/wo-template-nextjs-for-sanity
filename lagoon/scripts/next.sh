#!/bin/sh

echo "$LAGOON_ENVIRONMENT_TYPE: NextJS is starting"

if [ "$LAGOON_ENVIRONMENT_TYPE" == "production" ]; then
	npm run start
else 
	npm run dev
fi
