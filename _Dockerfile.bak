FROM node:18-alpine AS BUILD_IMAGE

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install

COPY --chown=node:node . .

RUN yarn build


FROM node:18-alpine

# create user in the docker image
USER node

# Creating a new directory for app files and setting path in the container
RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

# setting working directory in the container
WORKDIR /home/node/app

COPY --from=BUILD_IMAGE --chown=node:node /usr/src/app/dist ./dist
# COPY --from=BUILD_IMAGE --chown=node:node /usr/src/app/node_modules ./node_modules
COPY --from=BUILD_IMAGE --chown=node:node /usr/src/app/package.json ./package.json
COPY --from=BUILD_IMAGE --chown=node:node /usr/src/app/.env ./.env
COPY --from=BUILD_IMAGE --chown=node:node /usr/src/app/logs ./logs
COPY --from=BUILD_IMAGE --chown=node:node /usr/src/app/keys ./keys


EXPOSE 9000

CMD [ "node", "./dist/server.js"]


