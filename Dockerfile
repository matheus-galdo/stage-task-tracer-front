FROM node:20.11-alpine AS build

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

#deploy: nginx
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]