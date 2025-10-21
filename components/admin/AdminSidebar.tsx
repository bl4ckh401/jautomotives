"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Calendar, Truck, Mail, PhoneCall, Home, Users, Settings, BarChart3, Menu, X, FileUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/listings", label: "Car Listings", icon: Car },
  {href:"/admin/test-drives", label: "Test Drives", icon: Calendar },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/fleet", label: "Fleet Management", icon: Truck },
  { href: "/admin/rentals", label: "Rentals", icon: Car },
  { href: "/admin/contact", label: "Contact Requests", icon: Mail },
  { href: "/admin/assistance", label: "Assistance Requests", icon: PhoneCall },
  { href: "/admin/users", label: "User Management", icon: Users },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const [collapsed, setCollapsed] = useState(true)

  return (
    <>
      {/* Mobile sidebar toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-4 left-4 z-50 lg:hidden bg-white dark:bg-gray-800 shadow-md"
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 w-64 transition-all duration-300 ease-in-out overflow-y-auto",
          collapsed ? "-translate-x-full" : "translate-x-0",
          "fixed lg:static inset-y-0 z-40 lg:translate-x-0",
        )}
      >
        <div className="p-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            JABA Admin
          </h1>
        </div>

        <nav className="px-3 py-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md my-1 transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700",
                )}
              >
                <item.icon
                  className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-gray-500 dark:text-gray-400")}
                />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </aside>

      {/* Backdrop for mobile */}
      {!collapsed && <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setCollapsed(true)} />}
    </>
  )
}

