# Stage 1
FROM node:18-alpine
WORKDIR /app

# Copy the build output and other necessary files from the builder stage
COPY ./next.config.js ./
COPY ./.next ./.next
COPY ./node_modules ./node_modules
COPY ./package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run your app
CMD ["yarn", "start"]
