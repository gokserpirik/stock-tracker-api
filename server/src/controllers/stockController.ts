import { Request, Response } from 'express';
import { pool } from '../db/index.js'; 

interface AuthRequest extends Request {
  user?: {
    id: number;
    email: string;
  };
}

export const getStocks = async (req: Request, res: Response) => {
  try {
    const userId = (req as AuthRequest).user?.id;
    
    if (!userId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    
    const result = await pool.query(
      'SELECT * FROM portfolio WHERE user_id = $1 ORDER BY created_at DESC',
      [userId]
    );
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
    
    const result = await pool.query(
      "SELECT COALESCE(SUM(quantity * buy_price), 0) AS total_value FROM portfolio WHERE user_id = $1",
      [userId]
    );
    
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};




