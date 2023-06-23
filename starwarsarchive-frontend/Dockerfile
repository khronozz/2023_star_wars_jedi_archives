FROM node:18-bullseye AS build
WORKDIR /app
COPY *.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:stable-alpine3.17-slim
COPY --from=build /app/dist/starwarsarchive-frontend /usr/share/nginx/html
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
