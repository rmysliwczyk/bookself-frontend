# Build stage
FROM node:24 AS build
WORKDIR /build
COPY . .
RUN npm install
RUN npx vite build

# Production/Deploy stage
FROM nginx:1.31.0-trixie AS deploy

COPY --from=build /build/dist /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
