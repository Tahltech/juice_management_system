#!/bin/sh

# Wait for MySQL
./docker/wait-for-it.sh db:3306 --timeout=30 --strict -- echo "MySQL is up"

# Install Composer dependencies
composer install --no-interaction

# Clear config only (safe, no DB hit)
php artisan config:clear

# Run migrations FIRST
php artisan migrate --force

# Now it's safe to clear cache
php artisan cache:clear

# Start PHP-FPM
php-fpm &

# Start Vite (foreground)
npm run dev
