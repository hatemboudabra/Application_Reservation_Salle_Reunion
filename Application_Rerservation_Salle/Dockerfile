# Use node:lts-alpine as base image
FROM node:lts-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci --production

# Copy the application source code
COPY . .

# Expose the port
EXPOSE 5000

# Start the application
CMD ["node", "server.js"]
