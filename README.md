# Stock Portfolio API

A RESTful API for managing stock portfolios built with Express.js, TypeScript, and PostgreSQL.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** TypeScript
- **Database:** PostgreSQL
- **Validation:** Zod
- **Package Manager:** pnpm

## Prerequisites

- Node.js (v18 or higher)
- pnpm
- PostgreSQL

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd stock-api
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=3000
   DB_USER=your_username
   DB_PASSWORD=your_password
   DB_HOST=localhost
   DB_PORT=5432
   DB_NAME=stockdb
   ```

4. Set up the PostgreSQL database:
   ```sql
   CREATE DATABASE stockdb;
   ```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Compile TypeScript to JavaScript |
| `pnpm start` | Run the production build |

## API Endpoints

### Stocks

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/stocks` | Get all stocks in the portfolio |
| `POST` | `/stocks` | Add a new stock |
| `PUT` | `/stocks/:id` | Update a stock by ID |
| `DELETE` | `/stocks/:id` | Delete a stock by ID |
| `GET` | `/stocks/value` | Get total portfolio value |

### Request Examples

**Create a stock:**
```bash
curl -X POST http://localhost:3000/stocks \
  -H "Content-Type: application/json" \
  -d '{"ticker": "AAPL", "quantity": 10, "buy_price": 150.00}'
```

**Get all stocks:**
```bash
curl http://localhost:3000/stocks
```

**Update a stock:**
```bash
curl -X PUT http://localhost:3000/stocks/1 \
  -H "Content-Type: application/json" \
  -d '{"quantity": 15}'
```

**Delete a stock:**
```bash
curl -X DELETE http://localhost:3000/stocks/1
```

## Project Structure

```
src/
├── controllers/    # Route handlers
├── db/             # Database connection
├── middleware/     # Custom middleware (validation, etc.)
├── routes/         # API route definitions
├── schemas/        # Zod validation schemas
└── index.ts        # Application entry point
```


