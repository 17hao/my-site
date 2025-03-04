#!/usr/bin/env bash

docker pull 17hao/my-app-fe:latest

docker stop my-app-fe

docker rm my-app-fe

docker rmi $(docker images -f "dangling=true" -q)

docker run --name my-app-fe -d -p 18080:18080 17hao/my-app-fe
