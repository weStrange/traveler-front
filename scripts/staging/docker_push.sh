#! /bin/bash

# This is needed to login on AWS and push the image on ECR
# Change it accordingly to your docker repo
pip install --user awscli
export PATH=$PATH:$HOME/.local/bin
eval $(aws ecr get-login --region $AWS_DEFAULT_REGION)

# Login to docker
docker login -u="$DOCKER_USERNAME" -p="$DOCKER_PASSWORD"

# Push only if it's not a pull request
if [ -z "$TRAVIS_PULL_REQUEST" ] || [ "$TRAVIS_PULL_REQUEST" == "false" ]; then
  # Push only if we're testing the master branch
  if [ "$TRAVIS_BRANCH" == "dev" ]; then

    # Build and push
    docker build -t $IMAGE_NAME .
    echo "Pushing $IMAGE_NAME:v_$TRAVIS_BUILD_NUMBER"
    docker tag $IMAGE_NAME "$REMOTE_IMAGE_URL:v_$TRAVIS_BUILD_NUMBER"
    docker push "$REMOTE_IMAGE_URL:v_$TRAVIS_BUILD_NUMBER"
    echo "Pushed $IMAGE_NAME:v_$TRAVIS_BUILD_NUMBER"
  else
    echo "Skipping deploy because branch is not 'dev'"
  fi
else
  echo "Skipping deploy because it's a pull request"
fi
