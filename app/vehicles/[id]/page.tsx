import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { doc, getDoc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import VehicleDetailClient from "./VehicleDetailClient"
import { VehicleListing } from "@/contexts/MarketplaceContext"
import { VehicleSEOScripts } from "@/components/VehicleSEO"
import { 
  generateVehicleTitle, 
  generateVehicleMetaDescription, 
  generateVehicleKeywords,
  generateVehicleCanonicalUrl,
  generateVehicleOGImage,
  shouldIndexVehicle
} from "@/utils/seoUtils"

interface VehiclePageProps {
  params: { id: string }
}

// Server-side function to fetch vehicle data
async function getVehicle(id: string): Promise<VehicleListing | null> {
  try {
    const listingRef = doc(db, "vehicleListings", id)
    const listingSnap = await getDoc(listingRef)

    if (!listingSnap.exists()) {
      return null
    }

    const data = listingSnap.data()
    
    // Convert Firestore timestamps to plain objects
    return {
      id,
      ...data,
      createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
      updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      expiresAt: data.expiresAt?.toDate?.()?.toISOString() || null,
    } as VehicleListing
  } catch (error) {
    console.error("Error fetching vehicle:", error)
    return null
  }
}

// Generate dynamic metadata for SEO
export async function generateMetadata({ params }: VehiclePageProps): Promise<Metadata> {
  const vehicle = await getVehicle(params.id)

  if (!vehicle) {
    return {
      title: "Vehicle Not Found | JABA Automobiles",
      description: "The requested vehicle listing could not be found.",
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  const title = generateVehicleTitle(vehicle)
  const description = generateVehicleMetaDescription(vehicle)
  const keywords = generateVehicleKeywords(vehicle).join(", ")
  const canonicalUrl = generateVehicleCanonicalUrl(params.id)
  const imageUrl = generateVehicleOGImage(vehicle)
  const shouldIndex = shouldIndexVehicle(vehicle)

  return {
    title,
    description,
    keywords,
    authors: [{ name: "JABA Automobiles" }],
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "JABA Automobiles",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${vehicle.year} ${vehicle.make} ${vehicle.model} for sale`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
      site: "@jabaautomotives",
      creator: "@jabaautomotives",
    },
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: shouldIndex,
      follow: true,
      googleBot: {
        index: shouldIndex,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    other: {
      "price": formatPrice(vehicle.price, vehicle.directImport),
      "availability": vehicle.status === "active" ? "in stock" : "out of stock",
      "condition": vehicle.condition,
    },
  }
}

// Helper function to format price
function formatPrice(price: number | string | undefined, isDirectImport?: boolean): string {
  if (!price) return ""
  
  if (isDirectImport) {
    if (typeof price === "string") {
      const p = price.trim()
      if (p.startsWith("$")) return p
      const n = parseFloat(p.replace(/[^0-9.-]+/g, ""))
      if (!isNaN(n)) {
        return new Intl.NumberFormat("en-US", { 
          style: "currency", 
          currency: "USD", 
          minimumFractionDigits: 0, 
          maximumFractionDigits: 0 
        }).format(n)
      }
      return p
    }
    if (typeof price === "number") {
      return new Intl.NumberFormat("en-US", { 
        style: "currency", 
        currency: "USD", 
        minimumFractionDigits: 0, 
        maximumFractionDigits: 0 
      }).format(price)
    }
    return ""
  }

  const numeric = typeof price === "number" ? price : parseFloat(String(price || "").replace(/[^0-9.-]+/g, ""))
  if (isNaN(numeric)) return String(price || "")
  return `KES ${parseInt(String(numeric || 0)).toLocaleString()}`
}



export default async function VehiclePage({ params }: VehiclePageProps) {
  const vehicle = await getVehicle(params.id)

  if (!vehicle) {
    notFound()
  }

  return (
    <>
      {/* Enhanced SEO Structured Data */}
      <VehicleSEOScripts vehicle={vehicle} />
      
      {/* Client Component */}
      <VehicleDetailClient vehicle={vehicle} />
    </>
  )
}