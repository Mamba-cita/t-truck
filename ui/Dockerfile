# Use official Node.js image as base
FROM node:14-alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock) to container
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy the entire project directory to the container
COPY . .

# Build the React app
RUN yarn run build

# Expose port 3000
EXPOSE 3000

# Start the React app
CMD ["yarn", "start"]
