FROM node:18-alpine AS build
WORKDIR /usr/src/app
# Installing dependencies first can save time on rebuilds
# We do need the full (dev) dependencies here
COPY package.json yarn.lock .env ./
RUN yarn install
# Then copy in the actual sources we need and build
COPY jsconfig.json esbuild.config.cjs ./
COPY src/ ./src/
COPY keys/ ./keys/
RUN yarn build

FROM node:18-alpine AS deps
WORKDIR /usr/src/app
# This _only_ builds a runtime node_modules tree.
# We won't need the package.json to actually run the application.
# If you needed developer-oriented tools to do this install they'd
# be isolated to this stage.
COPY package.json yarn.lock ./
RUN yarn install --production

FROM node:18-alpine
WORKDIR /usr/src/app
# COPY --from=deps /usr/src/app/node_modules ./node_modules/
COPY --from=build /usr/src/app/dist ./dist/
COPY --from=build /usr/src/app/keys ./keys/
COPY --from=build /usr/src/app/.env ./
EXPOSE 9000
CMD ["node", "dist/server.js"]