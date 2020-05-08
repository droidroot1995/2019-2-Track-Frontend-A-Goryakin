FROM node:12-alpine as build-stage

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm i
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/build /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

