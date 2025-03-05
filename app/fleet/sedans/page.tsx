import FleetCategoryPage from "@/components/FleetCategoryPage"

const sedans = [
  { name: "Toyota Corolla", image: "/images/toyota-corolla.jpg" },
  { name: "Honda Civic", image: "/images/honda-civic.jpg" },
  { name: "Mazda 3", image: "/images/mazda-3.jpg" },
  { name: "Nissan Altima", image: "/images/nissan-altima.jpg" },
  { name: "Hyundai Elantra", image: "/images/hyundai-elantra.jpg" },
  { name: "Kia Forte", image: "/images/kia-forte.jpg" },
]

export default function SedansPage() {
  return (
    <FleetCategoryPage
      title="Our Sedan Fleet"
      description="Discover our range of comfortable and efficient sedans, perfect for city driving and long trips alike."
      vehicles={sedans}
    />
  )
}

