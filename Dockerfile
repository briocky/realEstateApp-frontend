#BUILDING PHASE
FROM node:18.15-alpine as NODE_BUILD
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

#PRODUCTION PHASE
FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=NODE_BUILD /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

