import React from "react";
import { useForm } from "@tanstack/react-form";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StockFormData {
  ticker: string;
  quantity: number;
  buy_price: number;
  purchase_date: string;
}

interface StockModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: StockFormData) => void;
  mode: "add" | "update";
  initialData?: StockFormData;
}

export const StockModal = ({
  isOpen,
  onClose,
  onSubmit,
  mode,
  initialData,
}: StockModalProps) => {
  const form = useForm({
    defaultValues: {
      ticker: initialData?.ticker || "",
      quantity: initialData?.quantity || 0,
      buy_price: initialData?.buy_price || 0,
      purchase_date: initialData?.purchase_date || new Date().toISOString().split("T")[0],
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
      onClose();
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-card border border-border rounded-xl sm:rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        {/* Gradient Border Effect */}
        <div className="absolute inset-0 bg-linear-to-br from-[#4E4FEB]/20 via-transparent to-[#068FFF]/20 pointer-events-none" />

        {/* Header */}
        <div className="relative p-5 sm:p-6 border-b border-border flex justify-between items-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground">
            {mode === "add" ? "Add Stock" : "Update Stocks"}
          </h2>
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 hover:bg-muted"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="relative p-5 sm:p-6 space-y-4"
        >
          {/* Ticker Input */}
          <form.Field
            name="ticker"
            validators={{
              onChange: ({ value }) =>
                !value ? "Ticker symbol is required" : undefined,
            }}
            children={(field) => (
              <div className="space-y-2">
                <label
                  htmlFor="ticker"
                  className="block text-sm font-medium text-foreground"
                >
                  Ticker Symbol
                </label>
                <input
                  id="ticker"
                  type="text"
                  required
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value.toUpperCase())}
                  onBlur={field.handleBlur}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-[#4E4FEB] focus:border-transparent",
                    "placeholder:text-muted-foreground transition-all"
                  )}
                  placeholder="e.g., AAPL"
                />
                {field.state.meta.errors && (
                  <span className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </span>
                )}
              </div>
            )}
          />

          {/* Quantity Input */}
          <form.Field
            name="quantity"
            validators={{
              onChange: ({ value }) =>
                value < 1 ? "Quantity must be at least 1" : undefined,
            }}
            children={(field) => (
              <div className="space-y-2">
                <label
                  htmlFor="quantity"
                  className="block text-sm font-medium text-foreground"
                >
                  Quantity
                </label>
                <input
                  id="quantity"
                  type="number"
                  required
                  min="1"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
                  onBlur={field.handleBlur}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-[#4E4FEB] focus:border-transparent",
                    "placeholder:text-muted-foreground transition-all"
                  )}
                  placeholder="0"
                />
                {field.state.meta.errors && (
                  <span className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </span>
                )}
              </div>
            )}
          />

          {/* Buy Price Input */}
          <form.Field
            name="buy_price"
            validators={{
              onChange: ({ value }) =>
                value <= 0 ? "Buy price must be greater than 0" : undefined,
            }}
            children={(field) => (
              <div className="space-y-2">
                <label
                  htmlFor="buy_price"
                  className="block text-sm font-medium text-foreground"
                >
                  Buy Price
                </label>
                <input
                  id="buy_price"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={field.state.value || ""}
                  onChange={(e) => field.handleChange(parseFloat(e.target.value) || 0)}
                  onBlur={field.handleBlur}
                  className={cn(
                    "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground",
                    "focus:outline-none focus:ring-2 focus:ring-[#4E4FEB] focus:border-transparent",
                    "placeholder:text-muted-foreground transition-all"
                  )}
                  placeholder="0.00"
                />
                {field.state.meta.errors && (
                  <span className="text-xs text-destructive">
                    {field.state.meta.errors[0]}
                  </span>
                )}
              </div>
            )}
          />

          {/* Purchase Date Input, Only for Update Mode */}
          {mode === "update" && (
            <form.Field
              name="purchase_date"
              validators={{
                onChange: ({ value }) =>
                  !value ? "Purchase date is required" : undefined,
              }}
              children={(field) => (
                <div className="space-y-2">
                  <label
                    htmlFor="purchase_date"
                    className="block text-sm font-medium text-foreground"
                  >
                    Purchase Date
                  </label>
                  <input
                    id="purchase_date"
                    type="date"
                    required
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                    className={cn(
                      "w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground",
                      "focus:outline-none focus:ring-2 focus:ring-[#4E4FEB] focus:border-transparent",
                      "transition-all"
                    )}
                  />
                  {field.state.meta.errors && (
                    <span className="text-xs text-destructive">
                      {field.state.meta.errors[0]}
                    </span>
                  )}
                </div>
              )}
            />
          )}

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-linear-to-r from-[#4E4FEB] to-[#068FFF] text-white font-medium hover:opacity-90 transition-opacity shadow-lg shadow-[#4E4FEB]/20"
            >
              {mode === "add" ? "Add Stock" : "Update"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
