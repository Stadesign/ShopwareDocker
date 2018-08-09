#!/usr/bin/env bash

case "$1" in
        start)
            touch /var/www/maintenance.lock;
            console sw:cache:clear;
            echo "Maintenance Mode started";
            ;;
        stop)
            rm /var/www/maintenance.lock;
            console sw:cache:clear;
            echo "Maintenance Mode stopped. Warming Cache.";
            console sw:warm:http:cache;
            ;;
        status)
            if [ ! -f "/var/www/maintenance.lock" ]; then
               echo "Maintenance Mode IS NOT active"
            else
                echo "Maintenance Mode IS active"
            fi
            ;;
        *) echo "Usage: maintenance start|stop|status";
        ;;
esac
