FROM node:10

# Generate working directory
RUN mkdir -p /app
WORKDIR /app
ADD ./ /app

# Generate node_modules
RUN npm install

# Set environment
ENV NODE_ENV=production

# Start App
ENTRYPOINT ["npm","run","docker:production"]

EXPOSE 3000
