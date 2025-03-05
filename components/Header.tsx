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
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1f24] backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-white">
            JABA Automobiles
          </Link>

          <nav className="hidden md:flex space-x-8">
            <Link href="/marketplace" className="text-white hover:text-gray-300">
              Marketplace
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-gray-300">
                Car Rental Services <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/rental/wedding">Wedding Car Rental</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/office">Office Pick-Up and Drop-Off</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/chauffeur">Chauffeur-Driven Rentals</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/vip">VIP Rental</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/corporate">Corporate Car Rental</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/long-term">Long-Term Car Hire</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/airport">Airport Transfer</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/self-drive">Self-Drive Car Hire</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/rental/event">Event Car Hire</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger className="text-white hover:text-gray-300">
                24/7 Assistance <ChevronDown className="inline-block ml-1 h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Link href="/assistance/towing">24-Hour Towing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/unlocking">Unlocking Doors</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/battery">Car Battery Replacement</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/emergency">Emergency Road Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/truck-towing">Truck Towing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/motorcycle-towing">Motorcycle Towing</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/out-of-gas">Out-of-Gas Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/roadside">Roadside Assistance</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/assistance/long-distance">Long Distance Towing</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/fleet" className="text-white hover:text-gray-300">
              Our Fleet
            </Link>
            <Link href="/about" className="text-white hover:text-gray-300">
              About Us
            </Link>
            <Link href="/contact" className="text-white hover:text-gray-300">
              Contact
            </Link>
          </nav>

          <div className="flex items-center space-x-4">
            <ThemeToggle />

            {/* Authentication UI */}
            <SignedOut>
              <div className="hidden md:flex space-x-2">
                <SignInButton>
                  <Button
                    variant="outline"
                    className="text-white border-white hover:bg-white hover:text-black"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton>
                  <Button className="bg-primary hover:bg-primary/90">
                    Register
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="hidden md:block">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="p-0 h-8 w-8 rounded-full">
                      <UserButton afterSignOutUrl="/" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <AdminInitButton />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </SignedIn>

            <Button className="md:hidden" variant="ghost" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              <Menu className="h-6 w-6 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-[#1a1f24] border-t border-gray-800">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link href="/marketplace" className="text-white hover:text-gray-300">
                Marketplace
              </Link>
              <Link href="/rental" className="text-white hover:text-gray-300">
                Car Rental Services
              </Link>
              <Link href="/assistance" className="text-white hover:text-gray-300">
                24/7 Assistance
              </Link>
              <Link href="/fleet" className="text-white hover:text-gray-300">
                Our Fleet
              </Link>
              <Link href="/about" className="text-white hover:text-gray-300">
                About Us
              </Link>
              <Link href="/contact" className="text-white hover:text-gray-300">
                Contact
              </Link>

              <SignedOut>
                <div className="flex flex-col space-y-2 pt-2">
                  <SignInButton>
                    <Button
                      variant="outline"
                      className="w-full text-white border-white hover:bg-white hover:text-black"
                    >
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton>
                    <Button className="w-full bg-primary hover:bg-primary/90">
                      Register
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>

              <SignedIn>
                <div className="flex items-center justify-between pt-2 border-t border-gray-700">
                  <span className="text-white">Your Account</span>
                  <UserButton afterSignOutUrl="/" />
                </div>
              </SignedIn>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}