# Use an official Node.js runtime as a parent image
FROM node:12

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the application files to the container
COPY . .

# Set environment variables
ENV PORT=3000

# Expose the port that the app is running on
EXPOSE ${PORT}

# Start the application
CMD [ "npm", "start" ]
