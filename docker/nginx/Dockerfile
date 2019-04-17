FROM nginx:alpine

ENV CONSUL_TEMPLATE_VERSION 0.20.0

# Install consul & consul-template
COPY --from=consul:latest /bin/consul /bin/consul
RUN apk add --no-cache runit curl &&\
	curl -O https://releases.hashicorp.com/consul-template/${CONSUL_TEMPLATE_VERSION}/consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip &&\
	unzip consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip -d /usr/local/bin &&\
	rm consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip &&\
	apk del curl


COPY ssl /ssl

COPY nginx.service /etc/service/nginx/run
COPY consul-template.service /etc/service/consul-template/run
RUN chmod +x /etc/service/nginx/run /etc/service/consul-template/run

COPY nginx.conf /etc/consul-templates/nginx.conf
COPY morteam.conf /etc/consul-templates/morteam.conf
COPY morscout.conf /etc/consul-templates/morscout.conf
COPY morparts.conf /etc/consul-templates/morparts.conf

WORKDIR /etc/consul-templates
RUN cat nginx.conf morteam.conf morscout.conf morparts.conf > /etc/consul-templates/app.conf

ARG address=test.localhost

RUN envsubst '\$address' < /etc/consul-templates/app.conf > /etc/consul-templates/app.conf

EXPOSE 80
EXPOSE 443

CMD ["/sbin/runsvdir", "/etc/service"]
