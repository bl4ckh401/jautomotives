"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Car, Calendar, Truck, Mail, PhoneCall, Home } from "lucide-react"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: Home },
  { href: "/admin/listings", label: "Car Listings", icon: Car },
  { href: "/admin/bookings", label: "Bookings", icon: Calendar },
  { href: "/admin/fleet", label: "Fleet Management", icon: Truck },
  { href: "/admin/contact", label: "Contact Requests", icon: Mail },
  { href: "/admin/assistance", label: "Assistance Requests", icon: PhoneCall },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-64 bg-white shadow-md">
      <div className="p-4">
        <h1 className="text-2xl font-bold">JABA Admin</h1>
      </div>
      <nav className="mt-8">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 ${
              pathname === item.href ? "bg-gray-100" : ""
            }`}
          >
            <item.icon className="mr-2 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )
}

