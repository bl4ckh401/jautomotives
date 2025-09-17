import type { Metadata } from "next"
import MarketplaceClient from "./MarketplaceClient"

export const metadata: Metadata = {
  title: "Buy Cars in Kenya - Best Car Marketplace | JABA Automobiles",
  description: "Buy the best cars in Kenya at JABA Automobiles. Browse thousands of vehicles - Toyota, Nissan, Subaru, Mercedes, BMW. Cars for sale in Nairobi, Mombasa, Kisumu. Best prices guaranteed.",
  keywords: "buy cars Kenya, cars for sale Kenya, car marketplace Kenya, buy car Nairobi, vehicles Kenya, Toyota Kenya, Nissan Kenya, Subaru Kenya, Mercedes Kenya, BMW Kenya, cars Nairobi, cars Mombasa, cars Kisumu, best car dealer Kenya, JABA Automobiles",
  openGraph: {
    title: "Buy Cars in Kenya - Best Car Marketplace | JABA Automobiles",
    description: "Kenya's #1 car marketplace. Buy Toyota, Nissan, Subaru, Mercedes, BMW. Best prices in Nairobi, Mombasa, Kisumu.",
    url: "/marketplace",
    siteName: "JABA Automobiles Kenya",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "/marketplace",
  },
}

export default function MarketplacePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "JABA Automobiles Kenya",
            description: "Kenya's premier car marketplace for buying and selling vehicles",
            url: "https://jabaautomotives.com/marketplace",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiambu Road, opposite Walkabout",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
            telephone: ["+254795684601", "+254733692704"],
            email: "jabaautos@gmail.com",
            areaServed: ["Kenya", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
            makesOffered: ["Toyota", "Nissan", "Subaru", "Mercedes-Benz", "BMW", "Audi", "Honda", "Mazda"],
          }),
        }}
      />
      <MarketplaceClient />
    </>
  )
}