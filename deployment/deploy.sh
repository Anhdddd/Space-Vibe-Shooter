#!/bin/bash

# Configuration
# Thay đổi đường dẫn này thành đường dẫn thực tế trên VPS của bạn
APP_DIR="/var/www/space-vibe-shooter"
LOG_FILE="$APP_DIR/deploy.log"

echo "Starting deployment at $(date)" >> $LOG_FILE

# Ensure directory exists
if [ ! -d "$APP_DIR" ]; then
    echo "Directory $APP_DIR does not exist. Please clone the repo first."
    exit 1
fi

cd $APP_DIR

# Reset any local changes
git reset --hard origin/main

# Pull latest changes
git pull origin main

# Reload Nginx (optional, if you change nginx config rarely it might not be needed every time, but good practice if you serve static assets via nginx config)
# sudo systemctl reload nginx

echo "Deployment finished at $(date)" >> $LOG_FILE
