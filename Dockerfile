############################################################
# Dockerfile for
# Based on centos:7 image
############################################################

FROM centos:7
MAINTAINER Watchrapong Agsonchu watchrapong.ag@windowslive.com

RUN yum update -y

RUN yum install -y epel-release
RUN yum install -y --enablerepo=epel git nodejs npm which
RUN yum groupinstall -y "Development tools"

RUN npm install -g n
RUN n 7.1.0

ADD package.json /tmp/package.json
RUN cd /tmp && npm install
RUN mkdir -p /var/source && cp -a /tmp/node_modules /var/source

RUN cp -a /tmp/node_modules /var/source

ADD . /var/source
WORKDIR /var/source
EXPOSE 80 443
ENTRYPOINT ["npm", "start"]
