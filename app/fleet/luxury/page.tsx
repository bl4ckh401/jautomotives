import FleetCategoryPage from "@/components/FleetCategoryPage"

const luxuryCars = [
  { name: "Mercedes-Benz S-Class", image: "/images/mercedes-s-class.jpg" },
  { name: "BMW 7 Series", image: "/images/bmw-7-series.jpg" },
  { name: "Audi A8", image: "/images/audi-a8.jpg" },
  { name: "Lexus LS", image: "/images/lexus-ls.jpg" },
  { name: "Porsche Panamera", image: "/images/porsche-panamera.jpg" },
  { name: "Jaguar XJ", image: "/images/jaguar-xj.jpg" },
]

export default function CarsPage() {
  return (
    <FleetCategoryPage
      title="Our  Car Fleet"
      description="Indulge in our premium selection of luxury vehicles, offering unparalleled comfort, style, and performance."
      vehicles={luxuryCars}
    />
  )
}

