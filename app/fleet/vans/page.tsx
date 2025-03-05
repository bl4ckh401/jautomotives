import FleetCategoryPage from "@/components/FleetCategoryPage"

const vans = [
  { name: "Toyota Sienna", image: "/images/toyota-sienna.jpg" },
  { name: "Honda Odyssey", image: "/images/honda-odyssey.jpg" },
  { name: "Chrysler Pacifica", image: "/images/chrysler-pacifica.jpg" },
  { name: "Ford Transit", image: "/images/ford-transit.jpg" },
  { name: "Mercedes-Benz Sprinter", image: "/images/mercedes-sprinter.jpg" },
  { name: "Dodge Grand Caravan", image: "/images/dodge-grand-caravan.jpg" },
]

export default function VansPage() {
  return (
    <FleetCategoryPage
      title="Our Van Fleet"
      description="Discover our spacious and versatile van selection, perfect for family trips, group travel, or cargo transport."
      vehicles={vans}
    />
  )
}

