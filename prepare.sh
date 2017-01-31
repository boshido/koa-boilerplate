#!/bin/bash
awsConfigStr="[profile eb-cli]
aws_access_key_id = ${1}
aws_secret_access_key = ${2}"

ebConfigStr="branch-defaults:
  master:
    environment: ${4}
global:
  application_name: ${3}
  default_ec2_keyname: ${5}
  default_platform: 64bit Amazon Linux 2015.09 v2.0.5 running Node.js
  default_region: ap-southeast-1
  profile: eb-cli
  sc: git"

mkdir -p ~/.aws
mkdir -p ./.elasticbeanstalk

echo -e "$awsConfigStr" > ~/.aws/config
echo -e "$ebConfigStr" > ./.elasticbeanstalk/config.yml
