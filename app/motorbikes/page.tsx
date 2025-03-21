import { SearchFilters } from "@/components/motorbikes/search-filters"
import { MotorbikeCard } from "@/components/motorbikes/motorbike-card"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Motorbikes Marketplace | JABA Automobiles",
  description: "Explore our collection of premium motorbikes available for purchase with cryptocurrency",
}

// This would typically come from your API
const motorbikes = [
  {
    id: "1",
    title: "Ducati Panigale V4",
    year: 2023,
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop",
    price: 2500000,
    specs: {
      engine: "1103 CC",
      power: "215.5 HP",
      torque: "124 Nm",
      weight: "175 kg",
      condition: "New",
    },
    description:
      "The Ducati Panigale V4 is the most powerful production motorcycle from the Borgo Panigale factory, delivering exceptional performance with advanced electronics and aerodynamics.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  {
    id: "2",
    title: "BMW S 1000 RR",
    year: 2022,
    image: "https://images.unsplash.com/photo-1635073908681-644d2b6f0ff2?q=80&w=1974&auto=format&fit=crop",
    price: 2200000,
    specs: {
      engine: "999 CC",
      power: "205 HP",
      torque: "113 Nm",
      weight: "197 kg",
      condition: "Foreign Used",
    },
    description:
      "The BMW S 1000 RR revolutionized the supersports motorcycle category right from the outset. Now it's raising the bar even higher with its optimized chassis and enhanced performance.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  {
    id: "3",
    title: "Kawasaki Ninja ZX-10R",
    year: 2023,
    image: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?q=80&w=2070&auto=format&fit=crop",
    price: 1950000,
    specs: {
      engine: "998 CC",
      power: "203 HP",
      torque: "114.9 Nm",
      weight: "207 kg",
      condition: "New",
    },
    description:
      "The Kawasaki Ninja ZX-10R is a motorcycle in the Ninja sport bike series from the Japanese manufacturer Kawasaki, the successor to the Ninja ZX-9R.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  {
    id: "4",
    title: "Honda CBR1000RR-R Fireblade",
    year: 2022,
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=1974&auto=format&fit=crop",
    price: 2300000,
    specs: {
      engine: "1000 CC",
      power: "214 HP",
      torque: "113 Nm",
      weight: "201 kg",
      condition: "Foreign Used",
    },
    description:
      "The Honda CBR1000RR-R Fireblade is designed to dominate the track and deliver street-legal thrills with MotoGP-inspired aerodynamics and a powerful inline-four engine.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  {
    id: "5",
    title: "Yamaha YZF-R1",
    year: 2023,
    image: "https://images.unsplash.com/photo-1558981852-426c6c22a060?q=80&w=2070&auto=format&fit=crop",
    price: 2100000,
    specs: {
      engine: "998 CC",
      power: "200 HP",
      torque: "112.4 Nm",
      weight: "200 kg",
      condition: "New",
    },
    description:
      "The Yamaha YZF-R1 features a crossplane crankshaft engine and electronics package derived from MotoGP technology, delivering exceptional handling and performance.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
  {
    id: "6",
    title: "Suzuki GSX-R1000R",
    year: 2022,
    image: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=2070&auto=format&fit=crop",
    price: 1900000,
    specs: {
      engine: "999.8 CC",
      power: "202 HP",
      torque: "117.6 Nm",
      weight: "203 kg",
      condition: "Foreign Used",
    },
    description:
      "The Suzuki GSX-R1000R is the pinnacle of Suzuki's sport bike lineup, featuring advanced electronics, a powerful engine, and race-inspired design.",
    dealer: {
      name: "Jaba Automotives",
      verified: true,
    },
  },
]

export default function MotorbikesPage() {
  return (
    <div className="container mx-auto px-4 py-8 pt-24">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Motorbikes Marketplace</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">Showing {motorbikes.length} motorbikes</span>
          </div>
        </div>
        <SearchFilters />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {motorbikes.map((motorbike) => (
            <MotorbikeCard key={motorbike.id} {...motorbike} />
          ))}
        </div>
      </div>
    </div>
  )
}

