#STAGE 1
FROM node:latest AS build
WORKDIR /src/app
COPY . .
RUN npm i
RUN npm run build

#STAGE 2
FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/dist/hack4good /usr/share/nginx/html
