FROM mhart/alpine-node

EXPOSE 80

ENV VARNISH_PORT 80
ENV VARNISH_MEMORY 100m

RUN apk update && \
    apk upgrade && \
    apk add varnish bash

ADD config.js /config.js
ADD generateConfig.js /generateConfig.js
ADD start.sh /start.sh
CMD ["/start.sh"]