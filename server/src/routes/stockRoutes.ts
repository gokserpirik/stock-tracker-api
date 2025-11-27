import { Router } from 'express';
import { getStocks, createStock, updateStock, deleteStock, getPortfolioValue } from '../controllers/stockController.js';
import validate from '../middleware/validateResource.js'; 
import { createStockSchema, stockIdSchema } from '../schemas/stockSchema.js'; 
const router = Router();


router.get('/', getStocks);
router.post('/', validate(createStockSchema), createStock);
router.get('/value', getPortfolioValue);
router.put('/:id', validate(stockIdSchema), updateStock); 
router.delete('/:id', validate(stockIdSchema), deleteStock);
export default router;