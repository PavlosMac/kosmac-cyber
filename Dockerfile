FROM node:20-alpine AS build
WORKDIR /app
RUN npm install -g @angular/cli
COPY package*.json ./
RUN npm ci
COPY . .
RUN ng build --configuration=production

FROM nginx:stable-alpine AS final

# Copy files
COPY --from=build /app/dist/kosmac-cyber/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Set permissions for non-root user
RUN chmod -R 755 /usr/share/nginx/html && \
    chown -R nginx:nginx /usr/share/nginx/html && \
    chown -R nginx:nginx /var/cache/nginx && \
    chown -R nginx:nginx /var/log/nginx && \
    touch /var/run/nginx.pid && \
    chown -R nginx:nginx /var/run/nginx.pid

# Run as non-root user
USER nginx

EXPOSE 8080