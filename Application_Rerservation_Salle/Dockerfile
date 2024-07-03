
# Base image
FROM node:20.5

# Set the working directory inside the container
WORKDIR /nodejs-app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Install webpack globally
RUN npm install -g webpack

# Copy the source code to the working directory
COPY . .


# Expose any necessary ports (if applicable)
 EXPOSE 4321

# Default command to run the application (if applicable)
CMD [ "npm","start" ]
