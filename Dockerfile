FROM node:14-stretch AS BUILD_IMAGE

RUN curl -sfL https://install.goreleaser.com/github.com/tj/node-prune.sh | bash -s -- -b /usr/local/bin

WORKDIR /usr/src/app

# install deps and build app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn build
RUN npm prune --production
RUN /usr/local/bin/node-prune

FROM node:14-slim

WORKDIR /usr/src/app

COPY --from=BUILD_IMAGE /usr/src/app/dist ./dist
COPY --from=BUILD_IMAGE /usr/src/app/model ./model
COPY --from=BUILD_IMAGE /usr/src/app/node_modules ./node_modules

CMD [ "node", "dist/index.js"]