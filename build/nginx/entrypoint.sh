#!/bin/bash
sed -i "s/PHP_HOST/${PHP_HOST}/g" /etc/nginx/shopware.conf
sed -i "s/PHP_HOST/${PHP_HOST}/g" /etc/nginx/conf.d/default.conf
sed -i "s/PHP_HOST/${PHP_HOST}/g" /etc/nginx/conf.d/upstream.conf
sed -i "s/SHOPWARE_VERSION/${SHOPWARE_VERSION}/g" /etc/nginx/conf.d/default.conf
/wait-for-it.sh -t 0 ${SW_MYSQL_HOST}:3306 -- echo "db is up"
echo "Starting nginx"
echo $DEV
nginx -g "daemon off;"
