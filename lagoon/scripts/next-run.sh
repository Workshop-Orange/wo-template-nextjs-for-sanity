#!/bin/sh

# Loading environment variables from .env and friends
source /lagoon/entrypoints/50-dotenv.sh

# Generate some additional enviornment variables
source /lagoon/entrypoints/55-generate-env.sh

echo "$LAGOON_ENVIRONMENT_TYPE: NextJS is starting"

if [ "$LAGOON_ENVIRONMENT_TYPE" == "production" ]; then
	npm run start
else 
	npm run dev
fi
