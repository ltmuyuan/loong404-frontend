# Stage 1: Building the code
FROM node:18-alpine as builder

# Create app directory
WORKDIR /app

# Copy package.json, yarn.lock, and other relevant files
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Bundle app source
COPY . .

# Build the Next.js app
RUN yarn build

# Stage 2: Run the Next.js app
FROM node:18-alpine as runner
WORKDIR /app

# Copy the build output and other necessary files from the builder stage
COPY --from=builder /app/next.config.js ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose the port the app runs on
EXPOSE 3000

# Set the command to run your app
CMD ["yarn", "start"]
