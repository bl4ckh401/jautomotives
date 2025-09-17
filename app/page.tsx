import type { Metadata } from "next"
import Hero from "@/components/Hero"
import FeaturedVehicles from "@/components/FeaturedVehicles"
import WhyChooseUs from "@/components/WhyChooseUs"
import { SearchSection } from "@/components/SearchSection"
import CustomerReviews from "@/components/CustomerReviews"

export const metadata: Metadata = {
  title: "JABA Automobiles Kenya - Buy Cars, Motorbikes, Import Vehicles | #1 Car Dealer",
  description: "Kenya's #1 car dealer. Buy cars, motorbikes, import vehicles from Japan, UK. Toyota, Nissan, Subaru, Mercedes, BMW in Nairobi, Mombasa, Kisumu. Best prices guaranteed. Second hand and new cars.",
  keywords: "JABA Automobiles Kenya, buy cars Kenya, car dealer Kenya, cars Nairobi, Toyota Kenya, Nissan Kenya, Subaru Kenya, Mercedes Kenya, BMW Kenya, motorbikes Kenya, import cars Kenya, second hand cars Kenya, car marketplace Kenya, best car dealer Kenya",
  openGraph: {
    title: "JABA Automobiles Kenya - #1 Car Dealer | Buy Cars, Import Vehicles",
    description: "Kenya's premier car dealer. Buy Toyota, Nissan, Subaru, Mercedes, BMW. Import from Japan, UK. Best prices in Nairobi, Mombasa, Kisumu.",
    url: "/",
    siteName: "JABA Automobiles Kenya",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "/",
  },
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "JABA Automobiles Kenya",
            description: "Kenya's premier automotive dealer specializing in car sales, motorbikes, and vehicle imports",
            url: "https://jabaautomotives.com",
            logo: "https://jabaautomotives.com/logo.png",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiambu Road, opposite Walkabout",
              addressLocality: "Nairobi",
              addressRegion: "Nairobi County",
              addressCountry: "KE",
            },
            telephone: ["+254795684601", "+254733692704"],
            email: "jabaautos@gmail.com",
            areaServed: [
              "Kenya", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", 
              "Thika", "Machakos", "Kiambu", "Nyeri", "Meru", "Embu"
            ],
            makesOffered: [
              "Toyota", "Nissan", "Subaru", "Mercedes-Benz", "BMW", "Audi", 
              "Honda", "Mazda", "Volkswagen", "Mitsubishi", "Isuzu", "Ford"
            ],
            serviceType: [
              "Car Sales", "Motorbike Sales", "Vehicle Import", "Second Hand Cars",
              "Direct Import", "Car Financing", "Trade-in Services"
            ],
            priceRange: "$$",
            openingHours: "Mo-Sa 08:00-18:00",
            sameAs: [
              "https://facebook.com/jabaautomobiles",
              "https://instagram.com/jabaautomobiles",
              "https://twitter.com/jabaautomobiles"
            ]
          }),
        }}
      />
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "JABA Automobiles Kenya",
            alternateName: "JABA Autos Kenya",
            description: "Kenya's leading automotive marketplace for buying cars, motorbikes, and importing vehicles",
            url: "https://jabaautomotives.com",
            logo: "https://jabaautomotives.com/logo.png",
            contactPoint: {
              "@type": "ContactPoint",
              telephone: "+254795684601",
              contactType: "sales",
              areaServed: "KE",
              availableLanguage: ["English", "Swahili"]
            },
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiambu Road, opposite Walkabout",
              addressLocality: "Nairobi",
              addressCountry: "KE"
            },
            founder: {
              "@type": "Person",
              name: "JABA Automobiles Founder"
            }
          }),
        }}
      />

      <Hero />
      <SearchSection />
      <FeaturedVehicles />
      <WhyChooseUs />
      <CustomerReviews />
    </>
  )
}