import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import { AuthProvider } from "@/contexts/AuthContext";
import { MarketplaceProvider } from "@/contexts/MarketplaceContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "JABA Automobiles - Premium Vehicle Marketplace",
    template: "%s | JABA Automobiles",
  },
  description: "Buy and sell premium vehicles at JABA Automobiles. Browse our extensive collection of cars, SUVs, motorbikes, and luxury vehicles. Direct imports, second-hand, and certified pre-owned vehicles available.",
  keywords: "cars for sale, vehicle marketplace, buy cars, sell cars, SUV, motorbikes, luxury cars, direct import, second hand cars, JABA Automobiles, Kenya cars",
  authors: [{ name: "JABA Automobiles" }],
  creator: "JABA Automobiles",
  publisher: "JABA Automobiles",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://jabaautomotives.com"
  ),
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "JABA Automobiles",
    title: "JABA Automobiles - Premium Vehicle Marketplace",
    description: "Buy and sell premium vehicles at JABA Automobiles. Browse our extensive collection of cars, SUVs, motorbikes, and luxury vehicles.",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "JABA Automobiles - Premium Vehicle Marketplace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@jabaautomotives",
    creator: "@jabaautomotives",
    title: "JABA Automobiles - Premium Vehicle Marketplace",
    description: "Buy and sell premium vehicles at JABA Automobiles. Browse our extensive collection of cars, SUVs, motorbikes, and luxury vehicles.",
    images: ["/logo.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AuthProvider>
            <AdminProvider>
              <MarketplaceProvider>
                <div className="flex flex-col min-h-screen">
                  <Header />
                  <main className="flex-1 md:mt-16">{children}</main>
                  <Footer />
                </div>
                <Toaster />
                <Analytics />
              </MarketplaceProvider>
            </AdminProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
