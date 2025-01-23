# Use Node.js official image
FROM node:16-alpine

# Set working directory in the container
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the source code into the container
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port (e.g., 3001)
EXPOSE 3001

# Command to run the application
CMD ["npm", "run", "start:prod"]
