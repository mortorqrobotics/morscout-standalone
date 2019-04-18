FROM alpine:3.9


ENV CONSUL_TEMPLATE_VERSION 0.20.0

# Install openrc, nginx, consul & consul-template
COPY --from=consul:latest /bin/consul /bin/consul
RUN echo '@edge http://dl-cdn.alpinelinux.org/alpine/edge/main' >> /etc/apk/repositories \
    && echo '@edgecommunity http://dl-cdn.alpinelinux.org/alpine/edge/community' >> /etc/apk/repositories \
    && echo '@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing' >> /etc/apk/repositories \
    && apk add --no-cache openrc su-exec ca-certificates curl nginx \
    # Disable getty's
    && sed -i 's/^\(tty\d\:\:\)/#\1/g' /etc/inittab \
    && sed -i \
        # Change subsystem type to "docker"
        -e 's/#rc_sys=".*"/rc_sys="docker"/g' \
        # Allow all variables through
        -e 's/#rc_env_allow=".*"/rc_env_allow="\*"/g' \
        # Start crashed services
        -e 's/#rc_crashed_stop=.*/rc_crashed_stop=NO/g' \
        -e 's/#rc_crashed_start=.*/rc_crashed_start=YES/g' \
        # Define extra dependencies for services
        -e 's/#rc_provide=".*"/rc_provide="loopback net"/g' \
        /etc/rc.conf \
    # Remove unnecessary services
    && rm -f /etc/init.d/hwdrivers \
            /etc/init.d/hwclock \
            /etc/init.d/hwdrivers \
            /etc/init.d/modules \
            /etc/init.d/modules-load \
            /etc/init.d/modloop \
    # Can't do cgroups
    && sed -i 's/\tcgroup_add_service/\t#cgroup_add_service/g' /lib/rc/sh/openrc-run.sh \
    && sed -i 's/VSERVER/DOCKER/Ig' /lib/rc/sh/init.sh &&\
	curl -O https://releases.hashicorp.com/consul-template/${CONSUL_TEMPLATE_VERSION}/consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip &&\
	unzip consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip -d /usr/local/bin &&\
	rm consul-template_${CONSUL_TEMPLATE_VERSION}_linux_amd64.zip &&\
	apk del curl

COPY ssl /ssl

COPY consul-template.service /etc/init.d/consul-template
COPY consul-template.hcl /consul-config/template.hcl
RUN mkdir /pid &&\
 chmod agu+x /etc/init.d/consul-template &&\
 rc-update add consul-template

COPY nginx.conf /etc/consul-templates/nginx.conf
COPY morteam.conf /etc/consul-templates/morteam.conf
COPY morscout.conf /etc/consul-templates/morscout.conf
COPY morparts.conf /etc/consul-templates/morparts.conf

WORKDIR /etc/consul-templates
RUN cat nginx.conf morteam.conf morscout.conf morparts.conf > /etc/consul-templates/app.conf

ARG address=test.localhost

RUN apk add --no-cache gettext &&\
	envsubst '\$address' < /etc/consul-templates/app.conf > /etc/consul-templates/app.conf &&\
	apk del gettext


EXPOSE 80
EXPOSE 443

CMD ["/sbin/init"]
