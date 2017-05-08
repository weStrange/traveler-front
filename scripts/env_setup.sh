#! /bin/bash

# Push only if it's not a pull request

if [ "$TRAVIS_BRANCH" == "dev" ]; then
    echo "Setting up staging env vars"
    echo $STAGING_DOCKER_USERNAME
    export AWS_ACCESS_KEY_ID=$STAGING_AWS_ACCESS_KEY_ID
    export AWS_SECRET_ACCESS_KEY=$STAGING_AWS_SECRET_ACCESS_KEY
    export DOCKER_USERNAME=$STAGING_DOCKER_USERNAME
    export DOCKER_PASSWORD=$STAGING_DOCKER_PASSWORD
#    export IMAGE_NAME="traveler"
#    export REMOTE_IMAGE_URL="alekster/traveler"
    export IMAGE_NAME="traveler-front"
    export REMOTE_IMAGE_URL="kujiraoo/traveler-front"
elif [ "$TRAVIS_BRANCH" == "master" ]; then
    echo "Setting up production env vars"
    export AWS_ACCESS_KEY_ID=$PRODUCTION_AWS_ACCESS_KEY_ID
    export AWS_SECRET_ACCESS_KEY=$PRODUCTION_AWS_SECRET_ACCESS_KEY
    export DOCKER_USERNAME=$PRODUCTION_DOCKER_USERNAME
    export DOCKER_PASSWORD=$PRODUCTION_DOCKER_PASSWORD
    export IMAGE_NAME="traveler-front"
    export REMOTE_IMAGE_URL="kujiraoo/traveler-front"
else
    echo "Skipping env vars setup because branch is not 'development' or 'master'"
fi

echo "\$DOCKER_USERNAME=" $DOCKER_USERNAME
