import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import stockRoutes from './routes/stockRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/stocks', stockRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});