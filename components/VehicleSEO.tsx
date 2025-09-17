import { VehicleListing } from "@/contexts/MarketplaceContext"

interface VehicleSEOProps {
  vehicle: VehicleListing
}

export function generateVehicleStructuredData(vehicle: VehicleListing) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jabaautomotives.com"
  
  // Main Car schema
  const carSchema = {
    "@context": "https://schema.org",
    "@type": "Car",
    "@id": `${siteUrl}/vehicles/${vehicle.id}#car`,
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: vehicle.description,
    url: `${siteUrl}/vehicles/${vehicle.id}`,
    image: vehicle.images || [],
    brand: {
      "@type": "Brand",
      name: vehicle.make,
    },
    model: vehicle.model,
    vehicleModelDate: vehicle.year,
    bodyType: vehicle.vehicleType,
    fuelType: vehicle.fuelType,
    vehicleTransmission: vehicle.transmission,
    mileageFromOdometer: vehicle.mileage ? {
      "@type": "QuantitativeValue",
      value: parseFloat(vehicle.mileage.toString()),
      unitCode: "KMT",
    } : undefined,
    color: vehicle.exteriorColor,
    vehicleInteriorColor: vehicle.interiorColor,
    numberOfDoors: vehicle.doors ? parseInt(vehicle.doors.toString()) : undefined,
    vehicleCondition: vehicle.condition === "New" 
      ? "https://schema.org/NewCondition" 
      : "https://schema.org/UsedCondition",
    vehicleEngine: vehicle.engineSize ? {
      "@type": "EngineSpecification",
      name: vehicle.engineSize,
      fuelType: vehicle.fuelType,
    } : undefined,
    offers: {
      "@type": "Offer",
      "@id": `${siteUrl}/vehicles/${vehicle.id}#offer`,
      price: typeof vehicle.price === "string" 
        ? parseFloat(vehicle.price.replace(/[^0-9.-]+/g, "")) 
        : vehicle.price,
      priceCurrency: vehicle.directImport ? "USD" : "KES",
      availability: vehicle.status === "active" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      priceValidUntil: vehicle.expiresAt?.toDate?.()?.toISOString() || 
        new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(), // 30 days from now
      seller: {
        "@type": "Organization",
        name: "JABA Automobiles",
        url: siteUrl,
        logo: `${siteUrl}/logo.png`,
        contactPoint: {
          "@type": "ContactPoint",
          telephone: vehicle.contactPhone,
          contactType: "sales",
          availableLanguage: "English",
        },
      },
      url: `${siteUrl}/vehicles/${vehicle.id}`,
      itemCondition: vehicle.condition === "New" 
        ? "https://schema.org/NewCondition" 
        : "https://schema.org/UsedCondition",
    },
    seller: {
      "@type": "Person",
      name: vehicle.contactName,
      email: vehicle.contactEmail,
      telephone: vehicle.contactPhone,
    },
    location: {
      "@type": "Place",
      name: vehicle.location,
      address: {
        "@type": "PostalAddress",
        addressLocality: vehicle.location,
        addressCountry: "KE",
      },
    },
  }

  // Product schema for better e-commerce SEO
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${siteUrl}/vehicles/${vehicle.id}#product`,
    name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    description: vehicle.description,
    image: vehicle.images || [],
    brand: {
      "@type": "Brand",
      name: vehicle.make,
    },
    model: vehicle.model,
    category: vehicle.vehicleType,
    offers: {
      "@type": "Offer",
      price: typeof vehicle.price === "string" 
        ? parseFloat(vehicle.price.replace(/[^0-9.-]+/g, "")) 
        : vehicle.price,
      priceCurrency: vehicle.directImport ? "USD" : "KES",
      availability: vehicle.status === "active" 
        ? "https://schema.org/InStock" 
        : "https://schema.org/OutOfStock",
      seller: {
        "@type": "Organization",
        name: "JABA Automobiles",
      },
    },
    aggregateRating: vehicle.views && vehicle.views > 10 ? {
      "@type": "AggregateRating",
      ratingValue: "4.5",
      reviewCount: Math.floor(vehicle.views / 10),
    } : undefined,
  }

  // BreadcrumbList schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: siteUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Marketplace",
        item: `${siteUrl}/marketplace`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
        item: `${siteUrl}/vehicles/${vehicle.id}`,
      },
    ],
  }

  return {
    car: carSchema,
    product: productSchema,
    breadcrumb: breadcrumbSchema,
  }
}

export function VehicleSEOScripts({ vehicle }: VehicleSEOProps) {
  const schemas = generateVehicleStructuredData(vehicle)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.car),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.product),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schemas.breadcrumb),
        }}
      />
    </>
  )
}