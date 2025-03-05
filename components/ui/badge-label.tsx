import type React from "react"
import { cn } from "@/lib/utils"

interface BadgeLabelProps {
  children: React.ReactNode
  className?: string
  variant?: "available" | "sold" | "pending"
}

export function BadgeLabel({ children, className, variant = "available" }: BadgeLabelProps) {
  return (
    <div
      className={cn(
        "absolute top-4 right-4 px-3 py-1 rounded-md text-sm font-medium",
        variant === "available" && "bg-emerald-500/90 text-white",
        variant === "sold" && "bg-red-500/90 text-white",
        variant === "pending" && "bg-yellow-500/90 text-white",
        className,
      )}
    >
      {children}
    </div>
  )
}

