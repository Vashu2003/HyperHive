# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all source files
COPY . .

# Expose port (same as in your app)
EXPOSE 5000

# Use environment variable PORT if available
ENV PORT=5000

# Start the server
CMD ["node", "server.js"]
