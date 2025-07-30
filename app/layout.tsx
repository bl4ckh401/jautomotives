import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/ThemeProvider"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { AuthProvider } from "@/contexts/AuthContext"
import { MarketplaceProvider } from "@/contexts/MarketplaceContext"
import { AdminProvider } from "@/contexts/AdminContext"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "JABA Automobiles",
  description: "Your trusted partner for all automotive needs",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          <AuthProvider>
            <AdminProvider>
              <MarketplaceProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1 md:mt-16">{children}</main>
                  <Footer />
                </div>
              </MarketplaceProvider>
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

