# KUSMS Deployment Guide

## Production Deployment

### Prerequisites

- Docker and Docker Compose installed
- Domain name configured (optional but recommended)
- SSL certificate (Let's Encrypt recommended)

### Quick Start

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd KUSMS
   ```

2. **Create production environment file:**
   ```bash
   cp .env.production.example .env.production
   ```

3. **Edit `.env.production` with your values:**
   - Change `POSTGRES_PASSWORD` to a strong password
   - Change `JWT_SECRET` to a long random string (minimum 32 characters)
   - Update `CORS_ORIGIN` to your frontend domain
   - Update `VITE_API_URL` to your backend domain

4. **Run database migrations:**
   ```bash
   cd backend
   npx prisma migrate deploy
   npx prisma db seed  # Optional: seed initial data
   cd ..
   ```

5. **Build and start services:**
   ```bash
   docker-compose -f docker-compose.prod.yml --env-file .env.production up -d --build
   ```

6. **Verify deployment:**
   ```bash
   docker-compose -f docker-compose.prod.yml ps
   docker-compose -f docker-compose.prod.yml logs -f
   ```

7. **Access the application:**
   - Frontend: http://localhost (or your domain)
   - Backend API: http://localhost:3000 (or your API domain)
   - Health check: http://localhost:3000/health

### SSL/TLS Configuration

#### Using Let's Encrypt with Nginx

1. **Install Certbot:**
   ```bash
   sudo apt-get update
   sudo apt-get install certbot python3-certbot-nginx
   ```

2. **Obtain certificate:**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Update nginx configuration to redirect HTTP to HTTPS**

4. **Set up auto-renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

### Database Backup

#### Manual Backup

```bash
docker exec kusms-postgres-prod pg_dump -U kusms_user kusms_production > backup_$(date +%Y%m%d_%H%M%S).sql
```

#### Restore from Backup

```bash
docker exec -i kusms-postgres-prod psql -U kusms_user kusms_production < backup_20241123_120000.sql
```

#### Automated Backup Script

Create a cron job for daily backups:

```bash
0 2 * * * /path/to/backup_script.sh
```

`backup_script.sh`:
```bash
#!/bin/bash
BACKUP_DIR="/path/to/backups"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)
docker exec kusms-postgres-prod pg_dump -U kusms_user kusms_production > $BACKUP_DIR/kusms_$TIMESTAMP.sql
# Keep only last 7 days of backups
find $BACKUP_DIR -name "kusms_*.sql" -mtime +7 -delete
```

### Monitoring

#### View Logs

```bash
# All services
docker-compose -f docker-compose.prod.yml logs -f

# Specific service
docker-compose -f docker-compose.prod.yml logs -f backend
docker-compose -f docker-compose.prod.yml logs -f frontend
docker-compose -f docker-compose.prod.yml logs -f postgres
```

#### Check Service Health

```bash
# Backend health
curl http://localhost:3000/health

# Frontend health
curl http://localhost/health

# Database health
docker exec kusms-postgres-prod pg_isready -U kusms_user
```

### Scaling

To scale the backend service:

```bash
docker-compose -f docker-compose.prod.yml up -d --scale backend=3
```

Note: You'll need a load balancer (nginx/traefik) in front for proper load distribution.

### Updating the Application

1. **Pull latest changes:**
   ```bash
   git pull origin main
   ```

2. **Rebuild and restart:**
   ```bash
   docker-compose -f docker-compose.prod.yml down
   docker-compose -f docker-compose.prod.yml up -d --build
   ```

3. **Run migrations (if any):**
   ```bash
   docker exec kusms-backend-prod npx prisma migrate deploy
   ```

### Troubleshooting

#### Container Won't Start

```bash
# Check container logs
docker-compose -f docker-compose.prod.yml logs backend

# Check container status
docker-compose -f docker-compose.prod.yml ps
```

#### Database Connection Issues

```bash
# Test database connection
docker exec kusms-backend-prod node -e "require('./src/utils/prisma.js')"

# Check environment variables
docker exec kusms-backend-prod env | grep DATABASE_URL
```

#### Permission Issues

```bash
# Fix ownership
sudo chown -R 1001:1001 ./backend
sudo chown -R 1001:1001 ./frontend
```

### Security Checklist

- [ ] Changed default passwords in `.env.production`
- [ ] Generated strong JWT secret (minimum 32 characters)
- [ ] Configured CORS to allow only your domain
- [ ] Set up SSL/TLS certificates
- [ ] Configured firewall rules
- [ ] Set up regular database backups
- [ ] Enabled Docker logging
- [ ] Reviewed and removed unnecessary exposed ports
- [ ] Set up monitoring and alerts
- [ ] Configured rate limiting (consider adding nginx rate limit)

### Performance Optimization

1. **Enable HTTP/2 in nginx**
2. **Configure CDN for static assets**
3. **Enable database connection pooling**
4. **Set up Redis for session management (optional)**
5. **Configure proper caching headers**

### Cloud Deployment Options

#### AWS
- **ECS/Fargate**: Container orchestration
- **RDS**: Managed PostgreSQL database
- **S3 + CloudFront**: Frontend hosting
- **ALB**: Load balancing
- **Route 53**: DNS management

#### Azure
- **App Service**: Container hosting
- **Azure Database for PostgreSQL**: Managed database
- **Static Web Apps**: Frontend hosting
- **Application Gateway**: Load balancing
- **Azure DNS**: DNS management

#### Google Cloud
- **Cloud Run**: Container hosting
- **Cloud SQL**: Managed PostgreSQL
- **Cloud Storage + CDN**: Frontend hosting
- **Cloud Load Balancing**: Load balancing
- **Cloud DNS**: DNS management

### Support

For issues and questions:
- Check logs: `docker-compose -f docker-compose.prod.yml logs`
- Review API documentation: `docs/API.md`
- Check system requirements: `docs/README.md`
