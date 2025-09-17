import type { Metadata } from "next"
import DirectImportClient from "./DirectImportClient"

export const metadata: Metadata = {
  title: "Direct Import Cars Kenya - Import Vehicles from Japan, UK | JABA Automobiles",
  description: "Direct import cars to Kenya from Japan, UK, Dubai. Import Toyota, Nissan, Subaru, Mercedes, BMW directly. Best car import services in Kenya. Nairobi, Mombasa clearing and forwarding.",
  keywords: "direct import cars Kenya, import cars Kenya, car import Kenya, import vehicles Kenya, import Toyota Kenya, import Nissan Kenya, import from Japan Kenya, import from UK Kenya, car clearing Kenya, car forwarding Kenya, import cars Nairobi, JABA Automobiles",
  openGraph: {
    title: "Direct Import Cars Kenya - Import Vehicles from Japan, UK | JABA Automobiles",
    description: "Kenya's #1 car import service. Direct import Toyota, Nissan, Subaru from Japan, UK, Dubai. Best prices and service.",
    url: "/direct-import",
    siteName: "JABA Automobiles Kenya",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "/direct-import",
  },
}

export default function DirectImportPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "JABA Automobiles - Direct Import Cars Kenya",
            description: "Kenya's premier car import service for direct vehicle imports from Japan, UK, and Dubai",
            url: "https://jabaautomotives.com/direct-import",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiambu Road, opposite Walkabout",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
            telephone: ["+254795684601", "+254733692704"],
            email: "jabaautos@gmail.com",
            areaServed: ["Kenya", "Nairobi", "Mombasa", "Kisumu"],
            speciality: "Direct vehicle imports from Japan, UK, Dubai",
            makesOffered: ["Toyota", "Nissan", "Subaru", "Mercedes-Benz", "BMW", "Honda", "Mazda"],
            serviceType: ["Car Import", "Clearing and Forwarding", "Vehicle Shipping"],
          }),
        }}
      />
      <DirectImportClient />
    </>
  )
}