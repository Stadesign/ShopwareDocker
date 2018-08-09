FROM php:7.0-fpm
WORKDIR /var/www/

RUN apt-get update -qq && apt-get install -y -qq \
        libicu-dev \
        libfreetype6-dev \
        libjpeg62-turbo-dev \
        libmcrypt-dev \
        libpng-dev \
        libcurl4-openssl-dev \
        software-properties-common  \
        libcurl3 curl \
        libmemcached-dev \
        zip \
        unzip

RUN docker-php-ext-install iconv mbstring mcrypt \
    && docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ \
    && docker-php-ext-install gd \
    && docker-php-ext-install zip \
    && docker-php-ext-install curl \
    && docker-php-ext-install intl \
    && docker-php-ext-install pdo \
    && docker-php-ext-install pdo_mysql \
    && docker-php-ext-install mysqli \
    && docker-php-ext-install opcache \
    && printf "\n" | pecl install apcu \
    && printf "\n" | pecl install memcached \
    && docker-php-ext-enable apcu \
    && docker-php-ext-enable memcached \
    && cd /tmp \
    && curl -o ioncube.tar.gz http://downloads3.ioncube.com/loader_downloads/ioncube_loaders_lin_x86-64.tar.gz \
    && tar -xvvzf ioncube.tar.gz \
    && mv ioncube/ioncube_loader_lin_7.0.so /usr/local/lib/php/extensions/* \
    && rm -Rf ioncube.tar.gz ioncube \
    && echo "zend_extension=ioncube_loader_lin_7.0.so" > /usr/local/etc/php/conf.d/00_docker-php-ext-ioncube_loader_lin_7.0.ini

ADD configs/php-config.ini /usr/local/etc/php/conf.d/php-config.ini
ADD configs/session.ini /usr/local/etc/php/conf.d/session.ini
ADD configs/timezone-berlin.ini /usr/local/etc/php/conf.d/timezone.ini
ADD configs/log.conf /usr/local/etc/php-fpm.d/zz-log.conf
ADD configs/www.conf /usr/local/etc/php-fpm.d/www.conf
RUN usermod -u 1033 www-data && groupmod -g 1033 www-data && usermod -g 1033 www-data

EXPOSE 9000
COPY entrypoint.sh /
RUN chmod +x /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
