"use client"

import type React from "react"

import Link from "next/link"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, User, LogOut, Car, Calendar, PhoneCall, Info, Mail, X, Shield, Banknote } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/contexts/AuthContext"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { user, logout } = useAuth()

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      setIsMenuOpen(false)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-[#1a1f24]/95 backdrop-blur-md shadow-md py-2" : "bg-[#1a1f24]/80 backdrop-blur-sm py-4",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-white flex items-center">
            <Car className="mr-2 h-6 w-6" />
            <span className="bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              JABA Automobiles
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-3 py-2 text-sm text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                  <Car className="w-4 h-4 mr-1" />
                  <span>Marketplace</span>
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Browse By Category</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <NavDropdownItem href="/marketplace">All Vehicles</NavDropdownItem>
                  <NavDropdownItem href="/motorbikes">Motorbikes</NavDropdownItem>
                  <NavDropdownItem href="/trade-in">Trade-In Vehicles</NavDropdownItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-3 py-2 text-sm text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Rentals</span>
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Car Rental Services</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <NavDropdownItem href="/rental/wedding">Wedding Car Rental</NavDropdownItem>
                  <NavDropdownItem href="/rental/office">Office Pick-Up and Drop-Off</NavDropdownItem>
                  <NavDropdownItem href="/rental/chauffeur">Chauffeur-Driven Rentals</NavDropdownItem>
                  <NavDropdownItem href="/rental/vip">VIP Rental</NavDropdownItem>
                  <NavDropdownItem href="/rental/corporate">Corporate Car Rental</NavDropdownItem>
                  <NavDropdownItem href="/rental/long-term">Long-Term Car Hire</NavDropdownItem>
                  <NavDropdownItem href="/rental/airport">Airport Transfer</NavDropdownItem>
                  <NavDropdownItem href="/rental/self-drive">Self-Drive Car Hire</NavDropdownItem>
                  <NavDropdownItem href="/rental/event">Event Car Hire</NavDropdownItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center px-3 py-2 text-sm text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors">
                  <PhoneCall className="w-4 h-4 mr-1" />
                  <span>Assistance</span>
                  <ChevronDown className="ml-1 h-4 w-4 opacity-70" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>24/7 Assistance</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <NavDropdownItem href="/assistance/towing">24-Hour Towing</NavDropdownItem>
                  <NavDropdownItem href="/assistance/unlocking">Unlocking Doors</NavDropdownItem>
                  <NavDropdownItem href="/assistance/battery">Car Battery Replacement</NavDropdownItem>
                  <NavDropdownItem href="/assistance/emergency">Emergency Road Services</NavDropdownItem>
                  <NavDropdownItem href="/assistance/truck-towing">Truck Towing</NavDropdownItem>
                  <NavDropdownItem href="/assistance/motorcycle-towing">Motorcycle Towing</NavDropdownItem>
                  <NavDropdownItem href="/assistance/out-of-gas">Out-of-Gas Services</NavDropdownItem>
                  <NavDropdownItem href="/assistance/roadside">Roadside Assistance</NavDropdownItem>
                  <NavDropdownItem href="/assistance/long-distance">Long Distance Towing</NavDropdownItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <NavLink href="/financing">
              <Banknote className="w-4 h-4 mr-1" />
              <span>Financing</span>
            </NavLink>

            <NavLink href="/insurance">
              <Shield className="w-4 h-4 mr-1"/>
              <span>Insurance</span>
            </NavLink>

            <NavLink href="/fleet">
              <Car className="w-4 h-4 mr-1" />
              <span>Fleet</span>
            </NavLink>

            {/* <NavLink href="/about">
              <Info className="w-4 h-4 mr-1" />
              <span>About</span>
            </NavLink> */}

            {/* <NavLink href="/contact">
              <Mail className="w-4 h-4 mr-1" />
              <span>Contact</span>
            </NavLink> */}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />

            {!user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link href="/sign-in">
                  <Button variant="ghost" className="text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/sign-up">
                  <Button className="bg-white text-black hover:bg-gray-200">Sign Up</Button>
                </Link>
              </div>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8 border border-white/20">
                      <AvatarImage src={user.photoURL || undefined} alt={user.name || "User"} />
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Dashboard</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/profile" className="flex items-center cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-red-500 focus:text-red-500">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Mobile menu button */}
            <Button className="lg:hidden" variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#1a1f24] border-t border-gray-800 absolute w-full">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <MobileNavAccordion
                title="Marketplace"
                icon={<Car className="w-5 h-5" />}
                items={[
                  { href: "/marketplace", label: "All Vehicles" },
                  { href: "/motorbikes", label: "Motorbikes" },
                  { href: "/trade-in", label: "Trade-In Vehicles" },
                ]}
              />

              <MobileNavAccordion
                title="Car Rental Services"
                icon={<Calendar className="w-5 h-5" />}
                items={[
                  { href: "/rental/wedding", label: "Wedding Car Rental" },
                  { href: "/rental/office", label: "Office Pick-Up and Drop-Off" },
                  { href: "/rental/chauffeur", label: "Chauffeur-Driven Rentals" },
                  { href: "/rental/vip", label: "VIP Rental" },
                  { href: "/rental/corporate", label: "Corporate Car Rental" },
                  { href: "/rental/long-term", label: "Long-Term Car Hire" },
                  { href: "/rental/airport", label: "Airport Transfer" },
                  { href: "/rental/self-drive", label: "Self-Drive Car Hire" },
                  { href: "/rental/event", label: "Event Car Hire" },
                ]}
              />

              <MobileNavAccordion
                title="24/7 Assistance"
                icon={<PhoneCall className="w-5 h-5" />}
                items={[
                  { href: "/assistance/towing", label: "24-Hour Towing" },
                  { href: "/assistance/unlocking", label: "Unlocking Doors" },
                  { href: "/assistance/battery", label: "Car Battery Replacement" },
                  { href: "/assistance/emergency", label: "Emergency Road Services" },
                  { href: "/assistance/truck-towing", label: "Truck Towing" },
                  { href: "/assistance/motorcycle-towing", label: "Motorcycle Towing" },
                  { href: "/assistance/out-of-gas", label: "Out-of-Gas Services" },
                  { href: "/assistance/roadside", label: "Roadside Assistance" },
                  { href: "/assistance/long-distance", label: "Long Distance Towing" },
                ]}
              />

              

              <MobileNavLink href="/financing" icon={<Info className="w-5 h-5" />}>
                Financing
              </MobileNavLink>

              <MobileNavLink href="/insurance" icon={<Mail className="w-5 h-5" />}>
                Insurance
              </MobileNavLink>

              <MobileNavLink href="/fleet" icon={<Car className="w-5 h-5" />}>
                Our Fleet
              </MobileNavLink>

              {!user ? (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link href="/sign-in">
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-black"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/sign-up">
                    <Button className="w-full bg-white text-black hover:bg-gray-200">Sign Up</Button>
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col space-y-2 pt-2">
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-black"
                    >
                      Dashboard
                    </Button>
                  </Link>
                  <Button variant="destructive" className="w-full" onClick={handleLogout}>
                    Log Out
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

// Helper components for the navigation
function NavLink({ href, children, className }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center px-3 py-2 text-sm text-white/90 hover:text-white rounded-md hover:bg-white/10 transition-colors",
        className,
      )}
    >
      {children}
    </Link>
  )
}

function NavDropdownItem({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <DropdownMenuItem asChild>
      <Link href={href} className="cursor-pointer">
        {children}
      </Link>
    </DropdownMenuItem>
  )
}

function MobileNavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Link href={href} className="flex items-center space-x-3 text-white hover:text-gray-300 py-2">
      {icon && <span className="text-white/70">{icon}</span>}
      <span>{children}</span>
    </Link>
  )
}

function MobileNavAccordion({
  title,
  items,
  icon,
}: {
  title: string
  items: { href: string; label: string }[]
  icon?: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <button
        className="flex items-center justify-between w-full text-white hover:text-gray-300 py-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center space-x-3">
          {icon && <span className="text-white/70">{icon}</span>}
          <span>{title}</span>
        </div>
        <ChevronDown className={`h-5 w-5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      {isOpen && (
        <div className="pl-8 mt-2 space-y-2 border-l border-gray-700">
          {items.map((item, index) => (
            <Link key={index} href={item.href} className="block text-white/80 hover:text-white py-1">
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

