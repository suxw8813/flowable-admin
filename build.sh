#!/bin/bash

npm run build-prod

version=1.0.8

docker build -t csighub.tencentyun.com/map5/weflow-admin:${version} .

docker push csighub.tencentyun.com/map5/weflow-admin:${version}
