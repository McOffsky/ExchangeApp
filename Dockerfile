FROM node:lts AS node-builder

WORKDIR /home/node/app
COPY . /home/node/app
RUN npm install && npm run build


FROM nginx:stable

WORKDIR /home/node/app
COPY --from=node-builder /home/node/app/build /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]