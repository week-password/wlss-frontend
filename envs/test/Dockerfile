FROM node:16.14.0-slim as wlss-fe-build

WORKDIR /wlss-fe

RUN apt-get update

COPY package.json package-lock.json ./

RUN npm ci

COPY . ./

RUN npm run build

FROM nginx:1.20 as nginx

COPY --from=wlss-fe-build /wlss-fe/dist/wlss-frontend /usr/share/nginx/html

COPY envs/test/nginx/nginx.conf /etc/nginx/conf.d/default.conf
