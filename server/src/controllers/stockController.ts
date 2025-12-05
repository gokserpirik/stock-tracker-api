import { Request, Response } from 'express';
import { pool } from '../db/index.js';
import { redisClient } from '../db/redis.js';

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

const CACHE_TTL = 30; // 30 seconds - short TTL for near real-time stock data

export const getStocks = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const cacheKey = `stocks:user:${userId}`;
    const cachedData = await redisClient.get(cacheKey);
    
    if (cachedData) {
      console.log('Cache hit for stocks');
      return res.json(JSON.parse(cachedData));
    }
    
    const result = await pool.query(
      'SELECT * FROM portfolio WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
    
    await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(result.rows));
    console.log('Cached stocks data');
    
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};


export const createStock = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const { ticker, quantity, buy_price } = req.body;
    const newStock = await pool.query(
      "INSERT INTO portfolio (user_id, ticker, quantity, buy_price) VALUES($1, $2, $3, $4) RETURNING *",
      [userId, ticker, quantity, buy_price]
    );
    
    await redisClient.del(`stocks:user:${userId}`);
    await redisClient.del(`portfolio:value:${userId}`);
    console.log('Cache invalidated after stock creation');
    
    res.json(newStock.rows[0]);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};


export const updateStock = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.id;
        
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const { id } = req.params;
        const { ticker, quantity, buy_price } = req.body;
        
        const updateStock = await pool.query(
            "UPDATE portfolio SET ticker = $1, quantity = $2, buy_price = $3 WHERE id = $4 AND user_id = $5 RETURNING *",
            [ticker, quantity, buy_price, id, userId]
        );

        if (updateStock.rows.length === 0) {
            res.status(404).json("Stock not found or unauthorized");
            return;
        }
        
        await redisClient.del(`stocks:user:${userId}`);
        await redisClient.del(`portfolio:value:${userId}`);
        console.log('Cache invalidated after stock update');
        
        res.json(updateStock.rows[0]);
    }
    catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const deleteStock = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthRequest).user?.id;
        
        if (!userId) {
          return res.status(401).json({ error: 'Unauthorized' });
        }
        
        const { id } = req.params;
        const result = await pool.query(
          "DELETE FROM portfolio WHERE id = $1 AND user_id = $2 RETURNING *",
          [id, userId]
        );
        
        if (result.rows.length === 0) {
          return res.status(404).json({ error: "Stock not found or unauthorized" });
        }
        
        await redisClient.del(`stocks:user:${userId}`);
        await redisClient.del(`portfolio:value:${userId}`);
        console.log('Cache invalidated after stock deletion');
        
        res.json({ message: "Stock was deleted!" });
    }
    catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const getPortfolioValue = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    // Try to get from cache first
    const cacheKey = `portfolio:value:${userId}`;
    const cachedData = await redisClient.get(cacheKey);
    
    if (cachedData) {
      console.log('Cache hit for portfolio value');
      return res.json(JSON.parse(cachedData));
    }
    
    // If not in cache, get from database
    const result = await pool.query(
      "SELECT COALESCE(SUM(quantity * buy_price), 0) AS total_value FROM portfolio WHERE user_id = $1",
      [userId]
    );
    
    // Store in cache
    await redisClient.setEx(cacheKey, CACHE_TTL, JSON.stringify(result.rows[0]));
    console.log('Cached portfolio value');
    
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};




