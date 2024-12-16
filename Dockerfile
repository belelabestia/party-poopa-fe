FROM node:slim AS build
COPY . /repo
WORKDIR /repo
RUN npm i
RUN npm run build

FROM caddy:alpine
COPY --from=build /repo/dist /app
COPY Caddyfile /etc/caddy/Caddyfile
