import React from 'react';
import { LucideIcon } from 'lucide-react';

interface EmptyStatePlaceholderProps {
  icon: LucideIcon;
  message: string;
}

export function EmptyStatePlaceholder({ icon: Icon, message }: EmptyStatePlaceholderProps) {
  return (
    <div className="h-full w-full flex items-center justify-center pl-6 pr-12">
      <div className="text-center text-muted-foreground border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 min-w-[320px] max-w-md w-full">
        <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-full w-fit mx-auto mb-4">
          <Icon className="h-8 w-8 text-blue-600 dark:text-blue-400" />
        </div>
        <p className="text-sm text-muted-foreground">{message}</p>
      </div>
    </div>
  );
}

