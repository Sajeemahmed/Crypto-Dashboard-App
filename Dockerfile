# 1. Use a Node.js base image
FROM node:18-alpine

# 2. Set working directory inside container
WORKDIR /app

# 3. Copy dependency files first (for cache)
COPY package*.json ./

# 4. Install dependencies
RUN npm install

# 5. Copy the rest of the app code
COPY . .

# 6. Build the app for production
RUN npm run build

# 7. Use Nginx to serve static files
FROM nginx:stable-alpine as production

# 8. Copy built app from Node to Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# 9. Expose default HTTP port
EXPOSE 80

# 10. Start Nginx
CMD ["nginx", "-g", "daemon off;"]
