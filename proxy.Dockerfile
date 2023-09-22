FROM oven/bun:1.0.2

WORKDIR /usr/src/app
COPY ./ /usr/src/app

CMD ["bun", "entry.js"]