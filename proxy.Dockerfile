FROM oven/bun:1.1.34

WORKDIR /usr/src/app
COPY ./ /usr/src/app

RUN apt-get update && apt-get install -y iputils-ping

CMD ["bun", "entry.js"]