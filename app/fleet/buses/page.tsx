import FleetCategoryPage from "@/components/FleetCategoryPage"

const buses = [
  { name: "Mercedes-Benz Tourismo", image: "/images/mercedes-tourismo.jpg" },
  { name: "Volvo 9700", image: "/images/volvo-9700.jpg" },
  { name: "MAN Lion's Coach", image: "/images/man-lions-coach.jpg" },
  { name: "Scania Touring", image: "/images/scania-touring.jpg" },
  { name: "Irizar i8", image: "/images/irizar-i8.jpg" },
  { name: "VDL Futura", image: "/images/vdl-futura.jpg" },
]

export default function BusesPage() {
  return (
    <FleetCategoryPage
      title="Our Bus Fleet"
      description="Explore our range of comfortable and spacious buses, ideal for group travel, tours, and long-distance journeys."
      vehicles={buses}
    />
  )
}

