import type { Metadata } from "next"
import SecondHandClient from "./SecondHandClient"

export const metadata: Metadata = {
  title: "Second Hand Cars Kenya - Used Cars for Sale | JABA Automobiles",
  description: "Buy quality second hand cars in Kenya. Certified used Toyota, Nissan, Subaru, Mercedes vehicles. Best second hand car dealer in Nairobi, Mombasa, Kisumu. Affordable prices, quality guaranteed.",
  keywords: "second hand cars Kenya, used cars Kenya, second hand cars Nairobi, used cars Nairobi, second hand Toyota Kenya, used Nissan Kenya, second hand Subaru Kenya, pre-owned cars Kenya, certified used cars Kenya, affordable cars Kenya, JABA Automobiles",
  openGraph: {
    title: "Second Hand Cars Kenya - Used Cars for Sale | JABA Automobiles",
    description: "Kenya's best second hand car dealer. Quality used Toyota, Nissan, Subaru vehicles. Best prices in Nairobi, Mombasa, Kisumu.",
    url: "/second-hand",
    siteName: "JABA Automobiles Kenya",
    locale: "en_KE",
    type: "website",
  },
  alternates: {
    canonical: "/second-hand",
  },
}

export default function SecondHandPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "AutoDealer",
            name: "JABA Automobiles - Second Hand Cars Kenya",
            description: "Kenya's trusted dealer for quality second hand and used cars",
            url: "https://jabaautomotives.com/second-hand",
            address: {
              "@type": "PostalAddress",
              streetAddress: "Kiambu Road, opposite Walkabout",
              addressLocality: "Nairobi",
              addressCountry: "KE",
            },
            telephone: ["+254795684601", "+254733692704"],
            email: "jabaautos@gmail.com",
            areaServed: ["Kenya", "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret"],
            speciality: "Second hand and used vehicles",
            makesOffered: ["Toyota", "Nissan", "Subaru", "Mercedes-Benz", "BMW", "Honda", "Mazda"],
          }),
        }}
      />
      <SecondHandClient />
    </>
  )
}