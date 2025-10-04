import * as React from "react"
import { cn } from "@/lib/utils"

interface SectionHeaderProps {
  icon: React.ComponentType<{ className?: string }>
  title: string
  className?: string
}

const SectionHeader = React.forwardRef<HTMLDivElement, SectionHeaderProps>(
  ({ icon: Icon, title, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "flex items-center gap-2 mb-4",
          className
        )}
        {...props}
      >
        <Icon className="h-5 w-5 text-blue-500" />
        <h4 className="font-semibold text-base">
          {title}
        </h4>
      </div>
    )
  }
)

SectionHeader.displayName = "SectionHeader"

export { SectionHeader }
