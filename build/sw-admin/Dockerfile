FROM openjdk:8-jre
MAINTAINER Friedemann Stoffregen

ENV PHPIZE_DEPS \
		autoconf \
		dpkg-dev dpkg \
		file \
		g++ \
		gcc \
		libc-dev \
		make \
		pkgconf \
		re2c
RUN echo "start up"
RUN apt-get update

RUN apt-get install -y \
        git \
        curl \
        unzip \
        php7.0 \
        php7.0-zip \
        php7.0-xml \
        php7.0-cli \
	      mariadb-client \
        php7.0-xmlreader \
        php7.0-opcache \
        php7.0-mcrypt \
        php7.0-curl \
				php7.0-gd \
        php7.0-json \
        php7.0-dom \
        php7.0-phar \
        php7.0-mbstring \
        php7.0-pdo \
				php7.0-ctype \
				php7.0-iconv \
        php7.0-mysql \
        php7.0-simplexml \
        php7.0-tokenizer \
        php7.0-xmlwriter \
        ant \
				nano \
				cron \
				jpegoptim \
				pngcrush \
				optipng

RUN cd /tmp \
		    && curl -o ioncube.tar.gz http://downloads3.ioncube.com/loader_downloads/ioncube_loaders_lin_x86-64.tar.gz \
		    && tar -xvvzf ioncube.tar.gz \
		    && mv ioncube/ioncube_loader_lin_7.0.so /usr/lib/php/20151012/ \
		    && rm -Rf ioncube.tar.gz ioncube \
		    && echo "zend_extension=ioncube_loader_lin_7.0.so" > /etc/php/7.0/cli/conf.d/00_docker-php-ext-ioncube_loader_lin_7.0.ini

RUN update-rc.d cron defaults

RUN usermod -u 1033 www-data
RUN groupmod -g 1033 www-data

RUN sed -i "s/variables_order = "GPCS"/variables_order = "EGPCS"/g" /etc/php/7.0/cli/php.ini

RUN curl http://shopwarelabs.github.io/sw-cli-tools/sw.phar >> /usr/bin/sw.phar
RUN chmod +x /usr/bin/sw.phar

ADD updateConfig /usr/bin/updateConfig
RUN chmod +x /usr/bin/updateConfig

ADD updateVCS /usr/bin/updateVCS
RUN chmod +x /usr/bin/updateVCS

ADD sw-install /usr/bin/installSW
RUN chmod +x /usr/bin/installSW

ADD console.sh /usr/bin/console
RUN chmod +x /usr/bin/console

ADD maintenance.sh /usr/bin/maintenance
RUN chmod +x /usr/bin/maintenance

RUN ln -s /usr/bin/sw.phar /usr/bin/sw

ADD cronjobs /etc/cron.d/shopware-cron
RUN chmod 0644 /etc/cron.d/shopware-cron
RUN crontab /etc/cron.d/shopware-cron

COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
