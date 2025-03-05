import FleetCategoryPage from "@/components/FleetCategoryPage"

const suvs = [
  { name: "Toyota RAV4", image: "/images/toyota-rav4.jpg" },
  { name: "Honda CR-V", image: "/images/honda-crv.jpg" },
  { name: "Mazda CX-5", image: "/images/mazda-cx5.jpg" },
  { name: "Nissan Rogue", image: "/images/nissan-rogue.jpg" },
  { name: "Ford Explorer", image: "/images/ford-explorer.jpg" },
  { name: "Chevrolet Tahoe", image: "/images/chevrolet-tahoe.jpg" },
]

export default function SUVsPage() {
  return (
    <FleetCategoryPage
      title="Our SUV Fleet"
      description="Explore our versatile SUV range, offering spacious interiors and excellent performance for all your adventures."
      vehicles={suvs}
    />
  )
}

