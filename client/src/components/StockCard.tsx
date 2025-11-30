import React from "react";
import { EvervaultCard, Icon } from "./ui/evervault-card";
import { cn } from "@/lib/utils";

interface StockCardProps {
  title: string;
  quantity: number;
  buyPrice: number;
  purchaseDate: string;
  className?: string;
}

export const StockCard = ({
  title,
  quantity,
  buyPrice,
  purchaseDate,
  className,
}: StockCardProps) => {
  return (
    <div
      className={cn(
        "border border-black/20 dark:border-white/20 flex flex-col items-start max-w-xs mx-auto sm:max-w-sm md:max-w-none relative col-span-1 row-span-1 rounded-lg md:rounded-none h-64 sm:h-80 md:h-auto",
        className
      )}
    >
      <Icon className="absolute h-4 w-4 md:h-6 md:w-6 -top-2 md:-top-3 -left-2 md:-left-3 dark:text-white text-black" />
      <Icon className="absolute h-4 w-4 md:h-6 md:w-6 -bottom-2 md:-bottom-3 -left-2 md:-left-3 dark:text-white text-black" />
      <Icon className="absolute h-4 w-4 md:h-6 md:w-6 -top-2 md:-top-3 -right-2 md:-right-3 dark:text-white text-black" />
      <Icon className="absolute h-4 w-4 md:h-6 md:w-6 -bottom-2 md:-bottom-3 -right-2 md:-right-3 dark:text-white text-black" />

      <EvervaultCard text={title} className="w-full h-full">
        <div className="flex flex-row md:flex-col items-center md:text-center p-3 md:p-4 relative z-20 h-full justify-between md:justify-center gap-3 md:gap-0">
          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-5xl font-bold text-white md:mb-6 tracking-tight md:tracking-tighter shrink-0">
            {title}
          </h2>
          
          {/* Stats */}
          <div className="text-white/90 text-sm md:text-lg font-medium backdrop-blur-md bg-black/30 p-2.5 md:p-4 rounded-lg md:rounded-xl border border-white/10 flex-1 md:w-full">
            <div className="flex flex-col md:gap-3 gap-1.5">
              <div className="flex justify-between md:w-full gap-2 md:gap-8 text-xs md:text-base">
                <span className="text-white/60">Qty</span>
                <span className="font-semibold">{quantity}</span>
              </div>
              <div className="flex justify-between md:w-full gap-2 md:gap-8 text-xs md:text-base">
                <span className="text-white/60">Price</span>
                <span className="font-semibold truncate">${buyPrice}</span>
              </div>
              <div className="flex justify-between md:w-full gap-2 md:gap-8 text-xs md:text-base">
                <span className="text-white/60">Date</span>
                <span className="font-semibold text-right">{new Date(purchaseDate).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: '2-digit' })}</span>
              </div>
            </div>
          </div>
        </div>
      </EvervaultCard>
    </div>
  );
};
