"use client";

import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center justify-center w-full p-4 bg-transparent z-50">
      <div className="flex items-center gap-4 bg-white dark:bg-slate-900 rounded-lg px-6 py-3 shadow-sm border border-slate-200 dark:border-slate-700 relative z-50">
        {/* Cyber Shield Icon */}
        <Link href="/" onClick={() => window.location.reload()}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Shield className="h-[1.2rem] w-[1.2rem] text-slate-700 dark:text-slate-300" />
          </Button>
        </Link>
        
        {/* Vertical Separator */}
        <div className="h-6 w-px bg-slate-300 dark:bg-slate-600" />
        
        {/* Mode Toggle */}
        <ModeToggle />
      </div>
    </nav>
  );
}
