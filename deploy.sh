#!/bin/bash

# FreshSip Production Deployment Script
# This script deploys the application to production

set -e

echo "🚀 Starting FreshSip Production Deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if .env.production exists
if [ ! -f ".env.production" ]; then
    print_warning ".env.production file not found. Copying from env.production.example..."
    cp env.production.example .env.production
    print_warning "Please update .env.production with your production values before continuing!"
    exit 1
fi

# Stop existing containers
print_status "Stopping existing containers..."
docker compose -f docker-compose.prod.yml down

# Build frontend assets
print_status "Building frontend assets..."
npm run build

# Build and start production containers
print_status "Building production containers..."
docker compose -f docker-compose.prod.yml up -d --build

# Wait for containers to be ready
print_status "Waiting for containers to be ready..."
sleep 30

# Run Laravel optimizations
print_status "Running Laravel optimizations..."
docker compose -f docker-compose.prod.yml exec juice_app php artisan config:cache
docker compose -f docker-compose.prod.yml exec juice_app php artisan route:cache
docker compose -f docker-compose.prod.yml exec juice_app php artisan view:cache

# Run database migrations
print_status "Running database migrations..."
docker compose -f docker-compose.prod.yml exec juice_app php artisan migrate --force

# Clear Laravel cache
print_status "Clearing Laravel cache..."
docker compose -f docker-compose.prod.yml exec juice_app php artisan cache:clear

# Check container status
print_status "Checking container status..."
docker compose -f docker-compose.prod.yml ps

# Health check
print_status "Performing health check..."
if curl -f http://localhost:8080/health > /dev/null 2>&1; then
    print_status "✅ Application is healthy and running!"
else
    print_error "❌ Health check failed. Please check the logs."
    docker compose -f docker-compose.prod.yml logs juice_app
    exit 1
fi

echo ""
print_status "🎉 FreshSip deployment completed successfully!"
print_status "🌐 Application is available at: http://localhost:8080"
print_status "📊 To view logs: docker compose -f docker-compose.prod.yml logs -f"
print_status "🛑 To stop: docker compose -f docker-compose.prod.yml down"
