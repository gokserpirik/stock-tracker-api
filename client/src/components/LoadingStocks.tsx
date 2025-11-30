import React, { useMemo } from "react";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";

export function LoadingStocks() {
  const colors = useMemo(() => [
    [78, 79, 235], // #4E4FEB (Primary)
    [6, 143, 255], // #068FFF (Secondary)
  ], []);

  const opacities = useMemo(() => [0.2, 0.2, 0.2, 0.2, 0.2, 0.4, 0.4, 0.4, 0.4, 1], []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center bg-background overflow-hidden relative">
      <div className="absolute inset-0 w-full h-full bg-background z-20 mask-[radial-gradient(transparent,white)] pointer-events-none" />
      
      <div className="z-50 text-center relative">
        <h2 className="text-4xl font-bold text-foreground mb-4">
          Loading Your Portfolio...
        </h2>
        <p className="text-muted-foreground text-lg">
          Fetching the latest stock data for you.
        </p>
      </div>

      <div className="absolute inset-0 w-full h-full">
        <CanvasRevealEffect
          animationSpeed={3}
          containerClassName="bg-transparent"
          colors={colors}
          opacities={opacities}
          dotSize={2}
        />
      </div>
    </div>
  );
}
