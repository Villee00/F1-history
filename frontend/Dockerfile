FROM node:16 AS base

WORKDIR /usr/src/app
COPY . .
RUN npm ci
RUN npm run build

FROM nginx:1.20-alpine
COPY --from=base /usr/src/app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]