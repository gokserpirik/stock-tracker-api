# Stock Portfolio Tracker

A full-stack stock portfolio management application with user authentication. Built with React, Express.js, TypeScript, and PostgreSQL.

This is a showcase project demonstrating modern full-stack development with TypeScript, featuring user authentication, protected routes, and a clean UI.

## ✨ Features

- 🔐 **User Authentication** - Register, login, and secure password management
- 📊 **Portfolio Management** - Add, update, and delete stocks with real-time tracking
- 👤 **User-Based Data** - Each user has their own isolated stock portfolio
- 🎨 **Modern UI** - Clean interface with Tailwind CSS and Aceternity UI components
- 🔒 **Protected Routes** - JWT-based authentication with route guards
- ✅ **Input Validation** - Zod schemas for both client and server validation
- 🎯 **Type Safety** - Full TypeScript coverage across the stack

## Tech Stack

### Frontend
- **Framework:** React with Vite
- **Routing:** TanStack Router (file-based)
- **Forms:** TanStack Form
- **Styling:** Tailwind CSS v4
- **UI Components:** Aceternity UI (Sidebar, BentoGrid, GridBackground)
- **Icons:** Lucide Icons
- **Animations:** Motion/React

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **Authentication:** JWT with bcryptjs
- **Validation:** Zod
- **Language:** TypeScript

### Development
- **Package Manager:** pnpm

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL (v14 or higher)
- Docker & Docker Compose (optional, for containerized setup)

## Quick Start with Docker

The easiest way to run the application is using Docker Compose:

```bash
# Clone the repository
git clone https://github.com/gokserpirik/stock-api.git
cd stock-api

# Start the application with Docker
docker-compose up --build
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **PostgreSQL:** localhost:5432

Docker Compose automatically:
- Sets up PostgreSQL with the correct schema
- Runs database migrations
- Starts the backend server
- Starts the frontend development server

## Manual Installation

### 1. Clone the repository
```bash
git clone https://github.com/gokserpirik/stock-api.git
cd stock-api
```

### 2. Install dependencies
```bash
# Install server dependencies
cd server
pnpm install

# Install client dependencies
cd ../client
pnpm install
```

### 3. Set up PostgreSQL database

Create a new database:
```bash
psql -U postgres
CREATE DATABASE stock_tracker;
\q
```

Run the database schema (from the server directory):
```bash
psql -U postgres -d stock_tracker -f src/db/schema.sql
```

Run the migration to add user support:
```bash
psql -U postgres -d stock_tracker -f src/db/migrations/add_user_id_to_portfolio.sql
```

### 4. Configure environment variables

Create `.env` file in the `server` directory:
```env
PORT=3000
DB_USER=postgres
DB_HOST=localhost
DB_DATABASE=stock_tracker
DB_PASSWORD=your_password
DB_PORT=5432
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

Create `.env` file in the `client` directory:
```env
VITE_API_URL=http://localhost:3000
```

### 5. Start the application

**Terminal 1 - Start the backend:**
```bash
cd server
pnpm dev
```

**Terminal 2 - Start the frontend:**
```bash
cd client
pnpm dev
```

The application will be available at:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000

## 🎯 Usage

1. **Register** - Create a new account at `/auth/register`
2. **Login** - Sign in at `/auth/login`
3. **Add Stocks** - Navigate to `/stocks` and click "Add Stock"
4. **Manage Portfolio** - View, update, or delete your stocks
5. **Change Password** - Update your password from the user menu
6. **Logout** - Sign out from the user menu

## 📁 Project Structure

```
stock-api/
├── client/                    # React frontend
│   ├── src/
│   │   ├── components/       # UI components
│   │   │   ├── ui/          # Reusable UI components (Sidebar, BentoGrid, etc.)
│   │   │   ├── AppSidebar.tsx
│   │   │   ├── Header.tsx
│   │   │   └── StockModal.tsx
│   │   ├── hooks/           # Custom React hooks
│   │   │   ├── useAuth.tsx  # Authentication context & JWT handling
│   │   │   ├── useStocks.ts # Stock data fetching
│   │   │   └── useStockActions.ts # CRUD operations
│   │   ├── routes/          # File-based routes
│   │   │   ├── __root.tsx   # Root layout with AuthProvider
│   │   │   ├── index.tsx    # Homepage
│   │   │   ├── stocks.tsx   # Stock dashboard
│   │   │   └── auth/        # Auth pages
│   │   │       ├── login.tsx
│   │   │       ├── register.tsx
│   │   │       └── change-password.tsx
│   │   └── main.tsx         # App entry point
│   └── package.json
│
├── server/                   # Express backend
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   │   ├── authController.ts
│   │   │   └── stockController.ts
│   │   ├── middleware/      # Express middleware
│   │   │   ├── authMiddleware.ts    # JWT verification
│   │   │   └── validateResource.ts  # Zod validation
│   │   ├── routes/          # API routes
│   │   │   ├── authRoutes.ts
│   │   │   └── stockRoutes.ts
│   │   ├── schemas/         # Zod validation schemas
│   │   │   ├── authSchema.ts
│   │   │   └── stockSchema.ts
│   │   ├── db/             # Database
│   │   │   ├── index.ts    # PostgreSQL connection pool
│   │   │   ├── schema.sql  # Database schema
│   │   │   └── migrations/ # Database migrations
│   │   └── index.ts        # Server entry point
│   └── package.json
│
└── README.md
```

## 🔒 Authentication Flow

1. User registers → Password hashed with bcrypt → User created in database
2. User logs in → Password verified → JWT token generated with user ID & email
3. Token stored in localStorage → Included in all API requests via Authorization header
4. Backend verifies JWT → Extracts user ID → Associates data with user

## 🛠️ API Endpoints

### Authentication (`/auth`)
- `POST /auth/register` - Register new user
- `POST /auth/login` - Login user
- `POST /auth/change-password` - Change password (protected)

### Stocks (`/stocks`)
- `GET /stocks` - Get user's stocks (protected)
- `POST /stocks` - Add new stock (protected)
- `GET /stocks/value` - Get portfolio total value (protected)
- `PUT /stocks/:id` - Update stock (protected)
- `DELETE /stocks/:id` - Delete stock (protected)

All protected routes require `Authorization: Bearer <token>` header.

## 🎨 Color Scheme

- **Background:** `#000000`
- **Primary:** `#4E4FEB`
- **Secondary/Accent:** `#068FFF`

## 📝 License

This is a project for showcasing full-stack TypeScript development and is not intended for production use.

## 🤝 Contributing
This is a personal showcase project, but you are welcome to fork and customize it for your own use!