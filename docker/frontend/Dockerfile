FROM node:12-alpine as build-stage

WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY . ./
RUN npm i
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-stage /app/build/*.html /usr/share/nginx/html/
COPY --from=build-stage /app/build/*.json /usr/share/nginx/html/2019-2-Track-Frontend-A-Goryakin/
COPY --from=build-stage /app/build/*.js /usr/share/nginx/html/2019-2-Track-Frontend-A-Goryakin/
COPY --from=build-stage /app/build/*.png /usr/share/nginx/html/2019-2-Track-Frontend-A-Goryakin/
COPY --from=build-stage /app/build/*.ico /usr/share/nginx/html/2019-2-Track-Frontend-A-Goryakin/
COPY --from=build-stage /app/build/*.css /usr/share/nginx/html/2019-2-Track-Frontend-A-Goryakin/
COPY --from=build-stage /app/build/static /usr/share/nginx/html/2019-2-Track-Frontend-A-Goryakin/static
COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx","-g","daemon off;"]

