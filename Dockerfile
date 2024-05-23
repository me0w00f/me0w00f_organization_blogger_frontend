# Use the official NGINX image as the base image
FROM nginx

# Remove default NGINX configuration file
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom NGINX configuration file
COPY nginx.conf /etc/nginx/conf.d/

# Copy built Vue.js files into NGINX HTML directory
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to start NGINX (no need to specify, as it's the default command in the NGINX image)
