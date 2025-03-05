"use client"

import { useEffect } from "react"

interface CarListingSchemaProps {
  name: string
  description: string
  brand: string
  model: string
  year: number
  price: number
  currency: string
  image: string
  url: string
}

export default function CarListingSchema({
  name,
  description,
  brand,
  model,
  year,
  price,
  currency,
  image,
  url,
}: CarListingSchemaProps) {
  useEffect(() => {
    const schema = {
      "@context": "https://schema.org/",
      "@type": "Vehicle",
      name: name,
      description: description,
      brand: {
        "@type": "Brand",
        name: brand,
      },
      model: model,
      modelDate: year,
      offers: {
        "@type": "Offer",
        price: price,
        priceCurrency: currency,
        url: url,
      },
      image: image,
    }

    const script = document.createElement("script")
    script.setAttribute("type", "application/ld+json")
    script.textContent = JSON.stringify(schema)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [name, description, brand, model, year, price, currency, image, url])

  return null
}

