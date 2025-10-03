"use client";

import { Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ui/mode-toggle";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="absolute top-0 left-0 right-0 flex items-center justify-center w-full p-4 bg-transparent z-10">
      <div className="flex items-center gap-4 bg-white dark:bg-gray-800 rounded-lg px-6 py-3 shadow-sm border border-gray-200 dark:border-gray-700">
        {/* Cyber Shield Icon */}
        <Link href="/" onClick={() => window.location.reload()}>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Shield className="h-[1.2rem] w-[1.2rem] text-gray-700 dark:text-gray-300" />
          </Button>
        </Link>
        
        {/* Vertical Separator */}
        <div className="h-6 w-px bg-gray-300 dark:bg-gray-600" />
        
        {/* Mode Toggle */}
        <ModeToggle />
      </div>
    </nav>
  );
}
