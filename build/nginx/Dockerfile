FROM nginx:alpine
MAINTAINER Friedemann Stoffregen
RUN apk --update add git openssh bash gawk sed grep bc
RUN set -x \
	&& addgroup -g 1033 -S www-data \
	&& adduser -u 1033 -D -S -G www-data www-data

COPY config/shopware.conf /etc/nginx/shopware.conf
COPY config/default.conf /etc/nginx/conf.d/default.conf
COPY config/nginx.conf /etc/nginx/nginx.conf
COPY config/fastcgi.conf /etc/nginx/fastcgi.conf
COPY config/upstream.conf /etc/nginx/conf.d/upstream.conf
COPY wait-for-it.sh /
RUN chmod +x /wait-for-it.sh
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
