import { useState, useEffect } from 'react';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export interface Stock {
  id: number;
  ticker: string;
  quantity: number;
  buy_price: number;
  purchase_date: string;
}

export function useStocks() {
  const [stocks, setStocks] = useState<Stock[]>([]);
  const [totalValue, setTotalValue] = useState<number>(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const listRes = await fetch(`${API_URL}/stocks`);
      const valRes = await fetch(`${API_URL}/stocks/value`);
      
      if (listRes.ok && valRes.ok) {
        const listData = await listRes.json();
        const valData = await valRes.json();
        setStocks(listData);
        setTotalValue(Number(valData.total_value));
      }
    } catch (err) {
      console.error("Failed to fetch", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchData(); }, []);
  return { stocks, totalValue, loading, refetch: fetchData };
}