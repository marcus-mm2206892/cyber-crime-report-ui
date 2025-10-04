"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center bg-slate-200 text-slate-950 dark:bg-slate-950 dark:text-white",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              // Light mode aurora - vibrant blues and purples
              "--aurora-light":
                "repeating-linear-gradient(100deg,#3b82f6_10%,#8b5cf6_15%,#06b6d4_20%,#a855f7_25%,#0ea5e9_30%)",
              // Dark mode aurora - electric blues and cyans
              "--aurora-dark":
                "repeating-linear-gradient(100deg,#06b6d4_10%,#3b82f6_15%,#8b5cf6_20%,#0ea5e9_25%,#a855f7_30%)",
              
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#000_0%,#000_7%,transparent_10%,transparent_12%,#000_16%)",
              "--white-gradient":
                "repeating-linear-gradient(100deg,#fff_0%,#fff_7%,transparent_10%,transparent_12%,#fff_16%)",

              // Light mode colors
              "--blue-500": "#3b82f6",
              "--purple-500": "#8b5cf6",
              "--cyan-500": "#06b6d4",
              "--violet-500": "#a855f7",
              "--sky-500": "#0ea5e9",
              
              // Dark mode colors (more electric)
              "--cyan-400": "#22d3ee",
              "--blue-400": "#60a5fa",
              "--purple-400": "#a78bfa",
              "--sky-400": "#38bdf8",
              "--violet-400": "#c084fc",
              
              "--black": "#000",
              "--white": "#fff",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            //   I'm sorry but this is what peak developer performance looks like // trigger warning
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--white-gradient),var(--aurora-light)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-60 blur-[10px] invert filter will-change-transform [--aurora-light:repeating-linear-gradient(100deg,var(--blue-500)_10%,var(--purple-500)_15%,var(--cyan-500)_20%,var(--violet-500)_25%,var(--sky-500)_30%)] [--aurora-dark:repeating-linear-gradient(100deg,var(--cyan-400)_10%,var(--blue-400)_15%,var(--purple-400)_20%,var(--sky-400)_25%,var(--violet-400)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--black)_0%,var(--black)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--black)_16%)] [--white-gradient:repeating-linear-gradient(100deg,var(--white)_0%,var(--white)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--white)_16%)] after:absolute after:inset-0 after:[background-image:var(--white-gradient),var(--aurora-light)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-difference after:content-[""] dark:[background-image:var(--dark-gradient),var(--aurora-dark)] dark:invert-0 after:dark:[background-image:var(--dark-gradient),var(--aurora-dark)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
