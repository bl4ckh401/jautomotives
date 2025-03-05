import FleetCategoryPage from "@/components/FleetCategoryPage"

const trucks = [
  { name: "Ford F-150", image: "/images/ford-f150.jpg" },
  { name: "Chevrolet Silverado", image: "/images/chevrolet-silverado.jpg" },
  { name: "Ram 1500", image: "/images/ram-1500.jpg" },
  { name: "Toyota Tundra", image: "/images/toyota-tundra.jpg" },
  { name: "GMC Sierra", image: "/images/gmc-sierra.jpg" },
  { name: "Nissan Titan", image: "/images/nissan-titan.jpg" },
]

export default function TrucksPage() {
  return (
    <FleetCategoryPage
      title="Our Truck Fleet"
      description="Discover our powerful and reliable truck fleet, perfect for heavy-duty tasks, towing, and off-road adventures."
      vehicles={trucks}
    />
  )
}

