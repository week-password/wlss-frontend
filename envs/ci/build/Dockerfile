FROM node:20.11.1-slim

WORKDIR /wlss-fe

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./
