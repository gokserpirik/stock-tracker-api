import { Request, Response } from 'express';
import { pool } from '../db/index.js'; 


export const getStocks = async (req: Request, res: Response) => {
  try {
    const result = await pool.query('SELECT * FROM portfolio');
    res.json(result.rows);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};


export const createStock = async (req: Request, res: Response) => {
  try {
    const { ticker, quantity, buy_price } = req.body;
    const newStock = await pool.query(
      "INSERT INTO portfolio (ticker, quantity, buy_price) VALUES($1, $2, $3) RETURNING *",
      [ticker, quantity, buy_price]
    );
    res.json(newStock.rows[0]);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};


export const updateStock = async (req: Request, res: Response) => {
    try {
      
        const { id } = req.params;
        const { ticker, quantity, buy_price } = req.body;
        
        const updateStock = await pool.query(
            "UPDATE portfolio SET ticker = $1, quantity = $2, buy_price = $3 WHERE id = $4 RETURNING *",
            [ticker, quantity, buy_price, id]
        );

        if (updateStock.rows.length === 0) {
            res.status(404).json("Stock not found");
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
        const { id } = req.params;
        await pool.query("DELETE FROM portfolio WHERE id = $1", [id]);
        res.json("Stock was deleted!");
    }
    catch (err: any) {
        res.status(500).send(err.message);
    }
};

export const getPortfolioValue = async (req: Request, res: Response) => {
  try {
    
    
    const result = await pool.query(
      "SELECT COALESCE(SUM(quantity * buy_price), 0) AS total_value FROM portfolio"
    );
    
    res.json(result.rows[0]);
  } catch (err: any) {
    res.status(500).send(err.message);
  }
};




