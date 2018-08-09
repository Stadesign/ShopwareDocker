#!/usr/bin/env bash

/var/www/bin/console $@
chown www-data:www-data -R /var/www
