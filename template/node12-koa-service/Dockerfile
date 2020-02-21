FROM openfaas/of-watchdog:0.7.2 as watchdog

FROM node:12.13.0-slim as ship

COPY --from=watchdog /fwatchdog /usr/bin/fwatchdog
RUN chmod +x /usr/bin/fwatchdog
ENV SOURCES /app

RUN apt-get -y update && \
 apt-get -y install ca-certificates && \
 apt-get clean && \
 rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/* /usr/share/man/?? /usr/share/man/??_*
WORKDIR /root/

# Turn down the verbosity to default level.
ENV NPM_CONFIG_LOGLEVEL warn

WORKDIR ${SOURCES}

# Copy outer function handler
COPY index.js ./

# COPY function node packages and install, adding this as a separate
# entry allows caching of npm install
COPY function/*.json ./
RUN npm i || :
# COPY function files and folders
WORKDIR ${SOURCES}/function
COPY function/ ./

# Set correct permissions to use non root user
WORKDIR ${SOURCES}

# chmod for tmp is for a buildkit issue (@alexellis)
RUN chmod 777 /tmp

USER node

ENV cgi_headers="true"
ENV fprocess="node index.js"
ENV mode="http"
ENV upstream_url="http://127.0.0.1:3000"

ENV exec_timeout="10s"
ENV write_timeout="15s"
ENV read_timeout="15s"

HEALTHCHECK --interval=3s CMD [ -e /tmp/.lock ] || exit 1

CMD ["fwatchdog"]

