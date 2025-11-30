import { Router } from 'express';
import { getStocks, createStock, updateStock, deleteStock, getPortfolioValue } from '../controllers/stockController.js';
import validate from '../middleware/validateResource.js'; 
import { createStockSchema, stockIdSchema } from '../schemas/stockSchema.js'; 
import { verifyToken } from '../middleware/authMiddleware.js';

const router = Router();


router.get('/', verifyToken, getStocks);
router.post('/', verifyToken, validate(createStockSchema), createStock);
router.get('/value', verifyToken, getPortfolioValue);
router.put('/:id', verifyToken, validate(stockIdSchema), updateStock); 
router.delete('/:id', verifyToken, validate(stockIdSchema), deleteStock);
export default router;