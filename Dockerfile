FROM nginx:alpine

COPY ./nginx.conf /etc/nginx/nginx.conf
COPY . /usr/share/nginx/html/test

FROM nginx:1.15.8-alpine
#configuration
COPY ./nginx.conf /etc/nginx/nginx.conf
#content, comment out the ones you dont need!
COPY ./*.html /usr/share/nginx/html/
COPY ./*.css /usr/share/nginx/html/
COPY ./*.png /usr/share/nginx/html/
COPY ./*.js /usr/share/nginx/html/
COPY ./*.json /usr/share/nginx/html/