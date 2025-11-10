# KUSMS - KU Smart Management System

A comprehensive campus management platform for Khalifa University that digitizes facility booking, event scheduling, maintenance tracking, and user management.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ LTS
- **PostgreSQL** 15+
- **Docker** (optional, recommended for local development)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/abdalrahman-ismaik/KUSMS.git
   cd KUSMS
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Copy example env files
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env

   # Edit backend/.env with your database credentials
   ```

4. **Set up the database**

   **Option A: Using Docker (Recommended)**
   ```bash
   # From project root
   docker compose up -d postgres
   ```

   **Option B: Local PostgreSQL**
   - Install PostgreSQL 15+
   - Create database: `createdb kusms_db`
   - Update `DATABASE_URL` in `backend/.env`

5. **Run database migrations**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

6. **Seed the database** (optional, adds test data)
   ```bash
   npx prisma db seed
   ```

### Running the Application

**Development Mode:**

```bash
# Terminal 1: Start backend
cd backend
npm run dev

# Terminal 2: Start frontend
cd frontend
npm run dev
```

- Backend API: http://localhost:3000
- Frontend: http://localhost:5173

**Using Docker:**

```bash
# From project root
docker compose up
```

## 🧪 Test Accounts

After seeding the database, use these credentials to log in:

| Role | Email | Password |
|------|-------|----------|
| Student | student@ku.ac.ae | password123 |
| Faculty | faculty@ku.ac.ae | password123 |
| Admin | admin@ku.ac.ae | password123 |
| Maintenance | maintenance@ku.ac.ae | password123 |

## 📂 Project Structure

```
KUSMS/
├── frontend/          # React application
│   ├── src/
│   │   ├── components/  # Reusable UI components
│   │   ├── pages/       # Page components
│   │   ├── services/    # API services
│   │   └── App.jsx
│   └── package.json
│
├── backend/           # Node.js/Express API
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── controllers/ # Business logic
│   │   ├── middleware/  # Auth, validation
│   │   ├── utils/       # Helper functions
│   │   └── server.js
│   ├── prisma/
│   │   └── schema.prisma # Database schema
│   └── package.json
│
├── docs/              # Documentation
├── docker-compose.yml # Docker configuration
└── README.md
```

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **Vite** - Build tool
- **Material-UI** - Component library
- **React Router** - Navigation
- **Axios** - HTTP client

### Backend
- **Node.js 18** - Runtime
- **Express** - Web framework
- **Prisma ORM** - Database toolkit
- **PostgreSQL 15** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing

### DevOps
- **Docker** - Containerization
- **ESLint** - Code linting

## 📖 API Documentation

See [docs/API.md](./docs/API.md) for detailed API endpoint documentation.

### Key Endpoints

- `POST /api/auth/login` - User authentication
- `GET /api/bookings` - List bookings
- `POST /api/bookings` - Create booking
- `GET /api/events` - List events
- `POST /api/maintenance` - Create maintenance request

## 🔧 Development

### Database Migrations

```bash
# Create a new migration
npx prisma migrate dev --name migration_name

# Reset database (⚠️ deletes all data)
npx prisma migrate reset

# View database in Prisma Studio
npx prisma studio
```

### Code Quality

```bash
# Run ESLint
npm run lint

# Format code (if Prettier is configured)
npm run format
```

## 🚢 Deployment

### Production Build

```bash
# Build frontend
cd frontend
npm run build

# Build will be in frontend/dist/

# Backend runs in production mode
cd backend
NODE_ENV=production npm start
```

### Docker Production

```bash
# Build and run all services
docker compose -f docker-compose.prod.yml up -d
```

## 🤝 Contributing

This is a university project for COSC 336 - Intro to Software Engineering.

**Team Members:**
- Abd Alrahman (Project Manager)
- Maher Abdul Gafoor (Project Manager & Lead Developer)
- Abdullah (Requirements & Development)
- Habtamu Tenaw (Frontend Development)

## 📝 License

ISC License - See LICENSE file for details

## 🐛 Troubleshooting

### Database Connection Issues

- Ensure PostgreSQL is running: `docker compose ps` or check local PostgreSQL service
- Verify `DATABASE_URL` in `backend/.env`
- Check PostgreSQL logs: `docker compose logs postgres`

### Port Already in Use

- Backend (3000): Kill process using `npx kill-port 3000`
- Frontend (5173): Kill process using `npx kill-port 5173`
- PostgreSQL (5432): Check if another PostgreSQL instance is running

### Migration Errors

```bash
# Reset and rerun migrations
cd backend
npx prisma migrate reset
npx prisma migrate dev
npx prisma db seed
```

## 📞 Support

For questions or issues, contact the development team:
- Repository: https://github.com/abdalrahman-ismaik/KUSMS
- Issues: https://github.com/abdalrahman-ismaik/KUSMS/issues
