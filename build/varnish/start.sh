#!/bin/bash
pwd
ls
/generateConfig.js
exec varnishd -j unix,user=root -F -f /default.vcl -s malloc,${VARNISH_MEMORY} -a 0.0.0.0:${VARNISH_PORT} -p http_req_hdr_len=16384 -p http_resp_hdr_len=16384
