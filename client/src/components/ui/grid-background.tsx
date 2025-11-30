import { cn } from "@/lib/utils";
import React from "react";

export function GridBackground({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative w-full h-full bg-background",
        className
      )}
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#068FFF48_1px,transparent_1px),linear-gradient(to_bottom,#068FFF48_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-background mask-[radial-gradient(ellipse_at_center,transparent_20%,#000000)]"></div>
      {children}
    </div>
  );
}
