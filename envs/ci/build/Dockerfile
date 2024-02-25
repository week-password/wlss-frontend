FROM node:16.14.0-slim

WORKDIR /wlss-fe

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./
