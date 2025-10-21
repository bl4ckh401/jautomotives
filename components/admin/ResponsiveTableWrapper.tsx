"use client"

import { ReactNode } from "react"

interface ResponsiveTableWrapperProps {
  children: ReactNode
}

export function ResponsiveTableWrapper({ children }: ResponsiveTableWrapperProps) {
  return (
    <div className="w-full">
      <div className="rounded-md border overflow-x-auto">
        <div className="min-w-[640px]">
          {children}
        </div>
      </div>
    </div>
  )
}
