#!/bin/bash

IMAGE_VERSION="v_"${TRAVIS_BUILD_NUMBER}

if [ "$TRAVIS_BRANCH" == "development" ]; then
#    SERVICE_NAME="flask-signup-service"
#    TASK_FAMILY="flask-signup"
#    TASK_DEF_TEMPLATE="flask-signup.json"

    SERVICE_NAME="traveler-front"
    TASK_FAMILY="flask-signup-client"
    TASK_DEF_TEMPLATE="traveler-front-task-def.json"
elif [ "$TRAVIS_BRANCH" == "master" ]; then
    SERVICE_NAME="traveler-front"
    TASK_FAMILY="flask-signup-client"
    TASK_DEF_TEMPLATE="traveler-front-task-def.json"
fi

# Create a new task definition for this build
sed -e "s;%BUILD_NUMBER%;${TRAVIS_BUILD_NUMBER};g" flask-signup-client.json > flask-signup-client-v_${TRAVIS_BUILD_NUMBER}.json
ls
aws ecs --version
aws ecs register-task-definition --family flask-signup-client --cli-input-json file://flask-signup-client-v_${TRAVIS_BUILD_NUMBER}.json

# Update the service with the new task definition and desired count
TASK_REVISION=`aws ecs describe-task-definition --task-definition flask-signup-client | egrep "revision" | tr "/" " " | awk '{print $2}' | sed 's/"$//' | sed 's/,$//'`
DESIRED_COUNT=`aws ecs describe-services --services ${SERVICE_NAME} | egrep "desiredCount" | tr "/" " " | awk '{print $2}' | sed 's/,$//' | sed -e '$!d'`
if [ "$DESIRED_COUNT" = "0" ]; then
    DESIRED_COUNT="1"
fi
DESIRED_COUNT="1"

((OLD_TASK = TASK_REVISION - 1))
aws ecs deregister-task-definition --task-definition ${TASK_FAMILY}:${OLD_TASK}

OLD_TASK_ID=`aws ecs list-tasks --service-name=${SERVICE_NAME} | egrep "arn" | sed -e 's#.*task/\(\)#\1#' | sed 's/.$//'`
echo ${OLD_TASK_ID}
aws ecs stop-task --task ${OLD_TASK_ID}

aws ecs update-service --cluster default --service ${SERVICE_NAME} --task-definition ${TASK_FAMILY}:${TASK_REVISION} --desired-count ${DESIRED_COUNT}
