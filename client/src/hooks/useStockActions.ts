import { type StockFormData } from '../components/StockModal';


const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    'Authorization': token ? `Bearer ${token}` : '',
  };
};

export function useStockActions() {
  const addStock = async (stock: StockFormData) => {
    try {
      const response = await fetch(`${API_URL}/stocks`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(stock),
      });
      
      if (!response.ok) {
        throw new Error('Failed to add stock');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Failed to add stock', err);
      throw err;
    }
  };

  const updateStock = async (id: number, stock: StockFormData) => {
    try {
      const response = await fetch(`${API_URL}/stocks/${id}`, {
        method: 'PUT',
        headers: getAuthHeaders(),
        body: JSON.stringify(stock),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update stock');
      }
      
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Failed to update stock', err);
      throw err;
    }
  };

  const deleteStock = async (id: number) => {
    try {
      const response = await fetch(`${API_URL}/stocks/${id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete stock');
      }
    } catch (err) {
      console.error('Failed to delete stock', err);
      throw err;
    }
  };

  return {
    addStock,
    updateStock,
    deleteStock,
  };
}
