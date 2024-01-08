# Use an official Node.js runtime as a parent image
FROM node:lastest

# Set the working directory to /app
WORKDIR /tp-microservices 

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files to the working directory
COPY . .

# Expose port 3000
EXPOSE 3000

# Command to run the application
CMD ["npm", "start"]

