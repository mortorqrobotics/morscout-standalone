FROM consul:latest

COPY server.json /consul/config/server.json

ENTRYPOINT [ "/bin/consul", "agent", "-config-dir", "consul/config", "-bind" ]
