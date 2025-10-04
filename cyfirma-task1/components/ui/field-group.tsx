import * as React from "react"
import { cn } from "@/lib/utils"

interface FieldGroupProps {
  children: React.ReactNode
  className?: string
}

const FieldGroup = React.forwardRef<HTMLDivElement, FieldGroupProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-4",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FieldGroup.displayName = "FieldGroup"

interface FieldItemProps {
  children: React.ReactNode
  className?: string
}

const FieldItem = React.forwardRef<HTMLDivElement, FieldItemProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "space-y-2",
          className
        )}
        {...props}
      >
        {children}
      </div>
    )
  }
)

FieldItem.displayName = "FieldItem"

export { FieldGroup, FieldItem }
