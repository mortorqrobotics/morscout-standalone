#!/bin/sh
consul agent -config-file /consul/morscout.json -join 192.19.0.2 -client 0.0.0.0 -bind 192.19.0.4
