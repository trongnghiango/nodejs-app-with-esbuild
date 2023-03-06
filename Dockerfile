FROM node:14-alpine

WORKDIR /app

COPY ./ /app

RUN yarn build

EXPOSE 1334

CMD ["node", "./dist/main.js"]


