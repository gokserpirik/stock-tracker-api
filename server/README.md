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


