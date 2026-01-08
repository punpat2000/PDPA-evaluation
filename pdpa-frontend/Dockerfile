FROM node:lts-alpine as build-stage
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
RUN yarn build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /usr/src/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
