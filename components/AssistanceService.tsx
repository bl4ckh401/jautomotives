import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Phone } from "lucide-react"
import { formatPhoneNumber } from "@/utils/vehicleDisplay"

interface AssistanceServiceProps {
  title: string
  description: string
  image: string
  services: string[]
  emergencyNumber: string
}

export default function AssistanceService({
  title,
  description,
  image,
  services,
  emergencyNumber,
}: AssistanceServiceProps) {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Image src={image || "/placeholder.svg"} alt={title} width={600} height={400} className="rounded-lg" />
        </div>
        <div>
          <p className="text-lg mb-6">{description}</p>
          <h2 className="text-2xl font-semibold mb-4">Our Services</h2>
          <ul className="list-disc list-inside mb-6">
            {services.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          <Card>
            <CardHeader>
              <CardTitle>24/7 Emergency Assistance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="flex items-center">
                <Phone className="mr-2" />
                {emergencyNumber}
              </p>
            </CardContent>
          </Card>
          <Button className="mt-6 w-full">
            <a href={`tel:${formatPhoneNumber(emergencyNumber)}`} className="w-full">
              Call Now
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}

