# Use Node.js official image
FROM node:16-alpine

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Build the React app
RUN npm run build

# Install a lightweight web server (like serve) to serve the app
RUN npm install -g serve

# Expose the app on port 3000
EXPOSE 3000

# Command to serve the React app
CMD ["serve", "-s", "build", "-l", "3000"]
