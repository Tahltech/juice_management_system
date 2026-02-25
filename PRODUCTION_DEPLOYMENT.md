# FreshSip Production Deployment Guide

This guide will help you deploy FreshSip to production using Docker and fix the 502 Bad Gateway error.

## 🚀 Quick Start

### 1. Update Environment Configuration

Copy the production environment template:

```bash
cp env.production.example .env.production
```

Update `.env.production` with your actual values:

```env
# Essential Settings
APP_URL=https://your-domain.com
APP_DEBUG=false

# Database
DB_DATABASE=your_production_db
DB_USERNAME=your_db_user
DB_PASSWORD=your_secure_password

# Email (for password resets)
MAIL_USERNAME=your-email@gmail.com
MAIL_PASSWORD=your-app-password
MAIL_FROM_ADDRESS=your-email@gmail.com
```

### 2. Deploy with One Command

```bash
./deploy.sh
```

## 📋 Detailed Deployment Steps

### Step 1: Build Frontend Assets

```bash
npm run build
```

This creates optimized production assets in `public/build/`.

### Step 2: Build Production Containers

```bash
docker compose -f docker-compose.prod.yml up -d --build
```

### Step 3: Run Laravel Optimizations

```bash
docker compose -f docker-compose.prod.yml exec juice_app php artisan config:cache
docker compose -f docker-compose.prod.yml exec juice_app php artisan route:cache
docker compose -f docker-compose.prod.yml exec juice_app php artisan view:cache
```

### Step 4: Run Database Migrations

```bash
docker compose -f docker-compose.prod.yml exec juice_app php artisan migrate --force
```

## 🔧 Architecture Overview

### Production Docker Setup

```
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Nginx    │    │  PHP-FPM    │    │   MySQL     │
│   (Port 80) │◄──►│ (Port 9000) │◄──►│ (Port 3306) │
└─────────────┘    └─────────────┘    └─────────────┘
       │                   │                   │
       └───────────────────┼───────────────────┘
                          │
                   ┌─────────────┐
                   │    Redis    │
                   │ (Port 6379)│
                   └─────────────┘
```

### Key Differences from Development

1. **No Vite Dev Server**: Uses pre-built assets
2. **Nginx + PHP-FPM**: Production web server setup
3. **Optimized PHP**: OPcache enabled, production settings
4. **Security Headers**: Added security headers
5. **Asset Caching**: Long-term caching for static files

## 🛠️ Troubleshooting

### 502 Bad Gateway Fix

The 502 error occurs when Nginx can't connect to PHP-FPM. Here's how to fix it:

#### 1. Check Container Status
```bash
docker compose -f docker-compose.prod.yml ps
```

#### 2. Check Logs
```bash
# PHP-FPM logs
docker compose -f docker-compose.prod.yml logs juice_app

# Nginx logs
docker compose -f docker-compose.prod.yml logs juice_nginx
```

#### 3. Manual Health Check
```bash
curl http://localhost:8080/health
```

#### 4. Restart Services
```bash
docker compose -f docker-compose.prod.yml restart juice_app
docker compose -f docker-compose.prod.yml restart juice_nginx
```

### Common Issues & Solutions

#### Issue: Assets Not Loading
```bash
# Rebuild assets
npm run build

# Clear Laravel cache
docker compose -f docker-compose.prod.yml exec juice_app php artisan cache:clear
```

#### Issue: Database Connection Failed
```bash
# Check database container
docker compose -f docker-compose.prod.yml logs juice_db

# Test connection
docker compose -f docker-compose.prod.yml exec juice_app php artisan tinker
>>> DB::connection()->getPdo()
```

#### Issue: Permission Errors
```bash
# Fix storage permissions
docker compose -f docker-compose.prod.yml exec juice_app chown -R www-data:www-data /var/www/storage
docker compose -f docker-compose.prod.yml exec juice_app chmod -R 755 /var/www/storage
```

## 🔒 Security Considerations

### 1. Environment Variables
- Never commit `.env.production` to version control
- Use strong, unique passwords
- Generate a new `APP_KEY` for production

### 2. Database Security
- Use strong database passwords
- Limit database user permissions
- Enable SSL connections if possible

### 3. Web Server Security
- Nginx includes security headers
- SSL/TLS termination at reverse proxy
- Regular security updates

## 📊 Monitoring

### Health Check Endpoint
Access `/health` to verify application status:
```bash
curl http://localhost:8080/health
```

### Log Monitoring
```bash
# Follow all logs
docker compose -f docker-compose.prod.yml logs -f

# Specific service logs
docker compose -f docker-compose.prod.yml logs -f juice_app
```

## 🔄 Updates & Maintenance

### Deploying Updates
```bash
# Pull latest code
git pull origin main

# Deploy updates
./deploy.sh
```

### Backup Strategy
1. **Database Backup**:
   ```bash
   docker compose -f docker-compose.prod.yml exec juice_db mysqldump -u root -p juice_management > backup.sql
   ```

2. **Storage Backup**:
   ```bash
   tar -czf storage-backup.tar.gz storage/
   ```

## 🌐 Domain Configuration

### Nginx Configuration
Update `APP_URL` in `.env.production`:
```env
APP_URL=https://your-domain.com
```

### SSL Certificate
For production, use Let's Encrypt:
```bash
# Install certbot
apt-get install certbot python3-certbot-nginx

# Generate certificate
certbot --nginx -d your-domain.com
```

## 📱 Production Checklist

Before going live, ensure:

- [ ] Environment variables configured
- [ ] Database credentials updated
- [ ] Email settings working
- [ ] SSL certificate installed
- [ ] Security headers verified
- [ ] Health check passing
- [ ] Backup strategy in place
- [ ] Monitoring configured
- [ ] Performance optimized

## 🎯 Performance Optimization

### PHP-FPM Settings
- OPcache enabled
- Process manager optimized
- Memory limits configured

### Nginx Settings
- Gzip compression enabled
- Static asset caching
- Connection pooling

### Laravel Optimizations
- Configuration cached
- Routes cached
- Views compiled
- Autoloader optimized

## 🆘 Support

If you encounter issues:

1. Check the troubleshooting section above
2. Review container logs
3. Verify environment configuration
4. Test individual components

For additional support, refer to the Laravel and Docker documentation.

---

**🎉 Your FreshSip application is now production-ready!**
