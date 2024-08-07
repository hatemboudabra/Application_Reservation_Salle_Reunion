# Builder container to install dependencies
FROM node:lts-alpine AS build
WORKDIR /usr/src/app

# Install dependencies
COPY package.json .
COPY package-lock.json .
RUN npm ci

# Copy the application source
COPY . .

FROM node:lts-alpine
WORKDIR /app
COPY package.json .
COPY package-lock.json .
COPY .env.production .env

RUN npm ci --omit=dev

COPY --from=build /usr/src/app /app

EXPOSE 5000
CMD [ "node", "server.js" ]
