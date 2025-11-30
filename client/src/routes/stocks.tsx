import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { useStocks } from '../hooks/useStocks'
import { useStockActions } from '../hooks/useStockActions'
import { BentoGrid } from '../components/ui/bento-grid'
import { LoadingStocks } from '../components/LoadingStocks'
import { StockCard } from '../components/StockCard'
import { StockModal, type StockFormData } from '../components/StockModal'
import { Plus, RefreshCw } from 'lucide-react'

export const Route = createFileRoute('/stocks')({
  component: StocksPage,
})

function StocksPage() {
  const { stocks, totalValue, loading, refetch } = useStocks()
  const { addStock, updateStock, deleteStock } = useStockActions()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)

  const handleAddStock = async (data: StockFormData) => {

    if (stocks.some(s => s.ticker.toUpperCase() === data.ticker.toUpperCase())) {
      alert('Stock already exists in portfolio.')
      return
    }
    
    try {
      await addStock(data)
      setIsAddModalOpen(false)
      refetch()
    } catch (error) {
      alert('Failed to add stock. Please try again.')
    }
  }

  const handleUpdateStock = async (data: StockFormData) => {
    
    const stockToUpdate = stocks.find(s => s.ticker.toUpperCase() === data.ticker.toUpperCase())
    
    if (!stockToUpdate) {
      alert('Stock not found in portfolio.')
      return
    }
    
    try {
      await updateStock(stockToUpdate.id, data)
      setIsUpdateModalOpen(false)
      refetch() // Refresh the stock list
    } catch (error) {
      alert('Failed to update stock. Please try again.')
    }
  }

  if (loading) {
    return <LoadingStocks />
  }

  return (
    <>
      <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Header Section */}
        <div className="flex flex-row justify-between items-center gap-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
            Stock Portfolio
          </h1>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              className="relative rounded-full group overflow-hidden h-10 w-10 sm:h-12 sm:w-12 p-px shrink-0 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#4E4FEB] to-[#068FFF] rounded-full" />
              <div className="bg-card rounded-full relative transition duration-200 text-foreground hover:bg-transparent hover:text-white w-full h-full flex items-center justify-center">
                <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </button>
            <button 
              onClick={() => setIsUpdateModalOpen(true)}
              className="relative rounded-full group overflow-hidden h-10 w-10 sm:h-12 sm:w-12 p-px shrink-0 transition-transform hover:scale-105 active:scale-95"
            >
              <div className="absolute inset-0 bg-linear-to-r from-[#4E4FEB] to-[#068FFF] rounded-full" />
              <div className="bg-card rounded-full relative transition duration-200 text-foreground hover:bg-transparent hover:text-white w-full h-full flex items-center justify-center">
                <RefreshCw className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>
            </button>
          </div>
        </div>

      {/* Stats Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-4 sm:p-6 bg-card flex flex-col rounded-lg sm:rounded-xl border border-border shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Value</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 text-foreground">${totalValue.toFixed(2)}</p>
        </div>
        <div className="p-4 sm:p-6 bg-card flex flex-col rounded-lg sm:rounded-xl border border-border shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Stocks</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 text-foreground">{stocks.length}</p>
        </div>
        <div className="p-4 sm:p-6 bg-card flex flex-col rounded-lg sm:rounded-xl border border-border shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Avg. Price</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 text-foreground">
            ${stocks.length > 0 ? (stocks.reduce((sum, s) => sum + s.buy_price, 0) / stocks.length).toFixed(2) : '0.00'}
          </p>
        </div>
        <div className="p-4 sm:p-6 bg-card flex flex-col rounded-lg sm:rounded-xl border border-border shadow-sm">
          <h3 className="text-xs sm:text-sm font-medium text-muted-foreground">Total Qty</h3>
          <p className="text-xl sm:text-2xl md:text-3xl font-bold mt-1 sm:mt-2 text-foreground">
            {stocks.reduce((sum, s) => sum + s.quantity, 0)}
          </p>
        </div>
      </div>

      {/* Stock Cards Grid */}
      <BentoGrid>
        {stocks.map((stock) => (
          <StockCard
            key={stock.id}
            title={stock.ticker}
            quantity={stock.quantity}
            buyPrice={stock.buy_price}
            purchaseDate={stock.purchase_date}
          />
        ))}
      </BentoGrid>
    </div>

    {/* Modals */}
    <StockModal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      onSubmit={handleAddStock}
      mode="add"
    />
    <StockModal
      isOpen={isUpdateModalOpen}
      onClose={() => setIsUpdateModalOpen(false)}
      onSubmit={handleUpdateStock}
      mode="update"
    />
  </>
  );
}
