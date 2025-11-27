import { z } from 'zod';


export const createStockPayload = z.object({
  ticker: z.string().min(1, "Ticker is required").max(10).toUpperCase(),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  buy_price: z.number().positive("Price must be a positive number"),
});


export type CreateStockDTO = z.infer<typeof createStockPayload>;


export const createStockSchema = z.object({
  body: createStockPayload,
});



const stockIdPayload = z.object({
  id: z.coerce.number().int().positive(),
});

export const stockIdSchema = z.object({
  params: stockIdPayload,
});