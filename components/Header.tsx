"use client"

import Link from "next/link"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, ChevronDown, User } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from "@clerk/nextjs"
import { AdminInitButton } from "./adminInitButton"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f24]/90 backdrop-blur-sm border-b border-gray-800/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl md:text-2xl font-bold text-white hover:opacity-90 transition-opacity">
            JABA Automobiles
          </Link>

          <nav className="hidden lg:flex space-x-6">
            <Link href="/marketplace" className="text-white/90 hover:text-white transition-colors">
              Marketplace
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white/90 hover:text-white transition-colors">
                Car Rental Services <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {[
                  { href: '/rental/wedding', label: 'Wedding Car Rental' },
                  { href: '/rental/office', label: 'Office Pick-Up and Drop-Off' },
                  { href: '/rental/chauffeur', label: 'Chauffeur-Driven Rentals' },
                  { href: '/rental/vip', label: 'VIP Rental' },
                  { href: '/rental/corporate', label: 'Corporate Car Rental' },
                  { href: '/rental/long-term', label: 'Long-Term Car Hire' },
                  { href: '/rental/airport', label: 'Airport Transfer' },
                  { href: '/rental/self-drive', label: 'Self-Drive Car Hire' },
                  { href: '/rental/event', label: 'Event Car Hire' }
                ].map((item) => (
                  <DropdownMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className="w-full text-sm"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white/90 hover:text-white transition-colors">
                24/7 Assistance <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                {[
                  { href: '/assistance/towing', label: '24-Hour Towing' },
                  { href: '/assistance/unlocking', label: 'Unlocking Doors' },
                  { href: '/assistance/battery', label: 'Car Battery Replacement' },
                  { href: '/assistance/emergency', label: 'Emergency Road Services' },
                  { href: '/assistance/truck-towing', label: 'Truck Towing' },
                  { href: '/assistance/motorcycle-towing', label: 'Motorcycle Towing' },
                  { href: '/assistance/out-of-gas', label: 'Out-of-Gas Services' },
                  { href: '/assistance/roadside', label: 'Roadside Assistance' },
                  { href: '/assistance/long-distance', label: 'Long Distance Towing' }
                ].map((item) => (
                  <DropdownMenuItem key={item.href}>
                    <Link
                      href={item.href}
                      className="w-full text-sm"
                    >
                      {item.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/fleet" className="text-white/90 hover:text-white transition-colors">
              Our Fleet
            </Link>
            <Link href="/about" className="text-white/90 hover:text-white transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-white/90 hover:text-white transition-colors">
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <ThemeToggle />

            <SignedOut>
              <div className="hidden md:flex items-center gap-2">
                <SignInButton mode="modal">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:bg-white/10 transition-colors"
                  >
                    Sign in
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    size="sm"
                    className="bg-white text-black hover:bg-white/90 transition-colors"
                  >
                    Get started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="p-0">
                      <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                          elements: {
                            avatarBox: "w-8 h-8",
                            userButtonPopoverCard: "w-[240px]"
                          }
                        }}
                      />
                    </Button>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </div>
            </SignedIn>

            <Button
              className="lg:hidden"
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="h-5 w-5 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#1a1f24] border-t border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-3">
              <Link
                href="/marketplace"
                className="text-white/90 hover:text-white transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Marketplace
              </Link>

              <div className="space-y-2">
                <span className="text-white/90">Car Rental Services</span>
                <div className="pl-4 flex flex-col space-y-2">
                  {[
                    { href: '/rental/wedding', label: 'Wedding Car Rental' },
                    { href: '/rental/office', label: 'Office Pick-Up and Drop-Off' },
                    { href: '/rental/chauffeur', label: 'Chauffeur-Driven Rentals' },
                    { href: '/rental/vip', label: 'VIP Rental' },
                    { href: '/rental/corporate', label: 'Corporate Car Rental' },
                    { href: '/rental/long-term', label: 'Long-Term Car Hire' },
                    { href: '/rental/airport', label: 'Airport Transfer' },
                    { href: '/rental/self-drive', label: 'Self-Drive Car Hire' },
                    { href: '/rental/event', label: 'Event Car Hire' }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-white/75 hover:text-white text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-white/90">24/7 Assistance</span>
                <div className="pl-4 flex flex-col space-y-2">
                  {[
                    { href: '/assistance/towing', label: '24-Hour Towing' },
                    { href: '/assistance/unlocking', label: 'Unlocking Doors' },
                    { href: '/assistance/battery', label: 'Car Battery Replacement' },
                    { href: '/assistance/emergency', label: 'Emergency Road Services' },
                    { href: '/assistance/truck-towing', label: 'Truck Towing' },
                    { href: '/assistance/motorcycle-towing', label: 'Motorcycle Towing' },
                    { href: '/assistance/out-of-gas', label: 'Out-of-Gas Services' },
                    { href: '/assistance/roadside', label: 'Roadside Assistance' },
                    { href: '/assistance/long-distance', label: 'Long Distance Towing' }
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="text-white/75 hover:text-white text-sm transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {['fleet', 'about', 'contact'].map((item) => (
                <Link
                  key={item}
                  href={`/${item}`}
                  className="text-white/90 hover:text-white transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.charAt(0).toUpperCase() + item.slice(1)}
                </Link>
              ))}

              <SignedOut>
                <div className="flex flex-col gap-2 pt-4 border-t border-gray-700">
                  <SignInButton mode="modal">
                    <Button
                      variant="ghost"
                      className="w-full text-white hover:bg-white/10 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Sign in
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      className="w-full bg-white text-black hover:bg-white/90 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Get started
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                  <span className="text-white/90">Account</span>
                  <UserButton
                    afterSignOutUrl="/"
                    appearance={{
                      elements: {
                        avatarBox: "w-8 h-8"
                      }
                    }}
                  />
                </div>
              </SignedIn>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}