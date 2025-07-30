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
        variant === "available" && "bg-pistachio/90 text-night",
        variant === "sold" && "bg-cherry_blossom_pink/90 text-night",
        variant === "pending" && "bg-flax/90 text-night",
        className,
      )}
    >
      {children}
    </div>
  )
}

