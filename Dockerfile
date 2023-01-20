# Dockerfile for nestjs
# Based on node:12.16.1-alpine3.9
FROM node:12.16.1-alpine3.9

# Set the working directory to /app
WORKDIR /usr/src/app

# Copy the current directory contents into the container at /app
COPY . .

# Install any needed packages specified in requirements.txt
RUN npm install

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Run app.py when the container launches
CMD ["npm", "run", "start:dev"]
