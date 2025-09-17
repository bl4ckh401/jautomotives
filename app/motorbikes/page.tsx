import type { Metadata } from "next"
import MotorbikesClient from "./MotorbikesClient"

export const metadata: Metadata = {
  title: "Motorbikes Kenya - Buy Motorcycles, Bikes for Sale | JABA Automobiles",
  description: "Buy motorbikes in Kenya. Best motorcycles for sale - Honda, Yamaha, Suzuki, TVS, Bajaj. Motorbikes in Nairobi, Mombasa, Kisumu. New and second hand motorcycles. Best prices guaranteed.",
  keywords: "motorbikes Kenya, motorcycles Kenya, bikes Kenya, motorbikes Nairobi, motorcycles Nairobi, Honda Kenya, Yamaha Kenya, Suzuki Kenya, TVS Kenya, Bajaj Kenya, buy motorbike Kenya, motorcycle dealer Kenya, JABA Automobiles",
  openGraph: {
    title: "Motorbikes Kenya - Buy Motorcycles, Bikes for Sale | JABA Automobiles",
    description: "Kenya's best motorbike dealer. Buy Honda, Yamaha, Suzuki motorcycles. Best prices in Nairobi, Mombasa, Kisumu.",
    url: "/motorbikes",
    siteName: "JABA Automobiles Kenya",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "/motorbikes",
  },
}

export default function MotorbikesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "JABA Automobiles - Motorbikes Kenya",
            description: "Kenya's premier motorbike and motorcycle dealer",
            url: "https://jabaautomotives.com/motorbikes",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiambu Road, opposite Walkabout",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
            telephone: ["+254795684601", "+254733692704"],
            email: "jabaautos@gmail.com",
            areaServed: ["Kenya", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
            speciality: "Motorbikes and motorcycles",
            makesOffered: ["Honda", "Yamaha", "Suzuki", "TVS", "Bajaj", "Kawasaki"],
          }),
        }}
      />
      <MotorbikesClient />
    </>
  )
}