FROM node:14.18.1 AS build

ENV NODE_ENV=production
WORKDIR /app

COPY package.docker.json ./package.json
RUN yarn install

COPY . .
RUN yarn build

FROM nginx:alpine AS stage

COPY --from=build app/build/ /usr/share/nginx/html
COPY nginxconf.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]