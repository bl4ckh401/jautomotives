import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Car, Wrench, Umbrella, Users } from "lucide-react"

export default function InsuranceCoverage() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Coverage Types</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          We offer a range of coverage options to protect you and your vehicle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <CoverageCard
          icon={<Car className="h-10 w-10 text-blue-500" />}
          title="Comprehensive Coverage"
          description="Protects your vehicle against non-collision incidents such as theft, vandalism, fire, natural disasters, and animal collisions."
          features={[
            "Theft protection",
            "Vandalism coverage",
            "Fire and flood damage",
            "Falling object protection",
            "Glass replacement",
          ]}
        />

        <CoverageCard
          icon={<Shield className="h-10 w-10 text-blue-500" />}
          title="Collision Coverage"
          description="Covers damage to your vehicle resulting from a collision with another vehicle or object, regardless of who is at fault."
          features={[
            "Vehicle repair or replacement",
            "Coverage for single-car accidents",
            "Protection regardless of fault",
            "Rental car coverage while repairs are made",
            "Deductible options to fit your budget",
          ]}
        />

        <CoverageCard
          icon={<Users className="h-10 w-10 text-blue-500" />}
          title="Liability Coverage"
          description="Covers bodily injury and property damage you may cause to others in an accident where you're at fault."
          features={[
            "Bodily injury protection",
            "Property damage coverage",
            "Legal defense costs",
            "Medical expenses for others",
            "Required by law in most areas",
          ]}
        />

        <CoverageCard
          icon={<Wrench className="h-10 w-10 text-blue-500" />}
          title="Mechanical Breakdown"
          description="Similar to an extended warranty, this covers repairs needed when your vehicle breaks down."
          features={[
            "Engine and transmission coverage",
            "Electrical system protection",
            "Air conditioning and heating",
            "Steering and suspension",
            "Extends beyond manufacturer warranty",
          ]}
        />

        <CoverageCard
          icon={<Umbrella className="h-10 w-10 text-blue-500" />}
          title="Gap Insurance"
          description="Covers the 'gap' between what you owe on your vehicle and its actual cash value in case of a total loss."
          features={[
            "Protection for financed vehicles",
            "Covers depreciation gap",
            "Especially valuable for new vehicles",
            "Peace of mind for leased vehicles",
            "One-time premium payment option",
          ]}
        />

        <CoverageCard
          icon={<Shield className="h-10 w-10 text-blue-500" />}
          title="Personal Injury Protection"
          description="Covers medical expenses for you and your passengers regardless of who is at fault in an accident."
          features={[
            "Medical expenses coverage",
            "Lost wages compensation",
            "Rehabilitation costs",
            "Funeral expenses",
            "No-fault coverage",
          ]}
        />
      </div>
    </section>
  )
}

interface CoverageCardProps {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
}

function CoverageCard({ icon, title, description, features }: CoverageCardProps) {
  return (
    <Card className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg overflow-hidden h-full">
      <CardContent className="p-8">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-400">Key Features:</h4>
          <ul className="space-y-1">
            {features.map((feature, idx) => (
              <li key={idx} className="text-gray-300 text-sm flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

