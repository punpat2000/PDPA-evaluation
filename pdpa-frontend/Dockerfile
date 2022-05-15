FROM alpine:3.14 as build-stage
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
RUN yarn add --dev terser-brunch
ENV PATH /usr/src/app/node_modules/.bin:$PATH
COPY . .
RUN brunch build -p

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=build-stage /usr/src/app/build .
ENTRYPOINT ["nginx", "-g", "daemon off;"]
