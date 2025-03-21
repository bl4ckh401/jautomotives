import { Card, CardContent } from "@/components/ui/card"
import { ClipboardCheck, Car, DollarSign, ThumbsUp } from "lucide-react"

export function TradeInProcess() {
  const steps = [
    {
      icon: <ClipboardCheck className="h-10 w-10 text-blue-500" />,
      title: "Submit Your Vehicle Details",
      description: "Fill out our simple form with information about your current vehicle to get started.",
    },
    {
      icon: <DollarSign className="h-10 w-10 text-green-500" />,
      title: "Receive Your Valuation",
      description: "Our team will evaluate your vehicle and provide you with a fair trade-in value within 24 hours.",
    },
    {
      icon: <Car className="h-10 w-10 text-purple-500" />,
      title: "Choose Your New Vehicle",
      description: "Browse our selection of trade-in eligible vehicles and select your upgrade.",
    },
    {
      icon: <ThumbsUp className="h-10 w-10 text-yellow-500" />,
      title: "Complete the Trade",
      description: "Visit our showroom to finalize the paperwork and drive away in your new vehicle.",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {steps.map((step, index) => (
        <Card key={index} className="bg-[#1a1f24] border-gray-700">
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="mb-4 rounded-full bg-gray-800 p-3">{step.icon}</div>
            <div className="text-xl font-bold mb-2">{step.title}</div>
            <p className="text-gray-400">{step.description}</p>
            <div className="mt-4 text-2xl font-bold text-gray-500">Step {index + 1}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

