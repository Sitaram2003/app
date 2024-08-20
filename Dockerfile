# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Set environment variables (optional)
ENV PORT=3000
ENV MONGO_URL='mongodb://27.59.55.173/32:27017/vsupport'

# Expose the port on which the app will run
EXPOSE 5000

# Start the application
CMD ["npm", "start"]
