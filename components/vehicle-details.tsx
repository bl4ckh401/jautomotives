"use client"
import { Star } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface VehicleDetailsProps {
  specs: {
    condition_score: number
    year_of_manufacture: number
    current_location: string
    availability: string
    drive: string
    mileage: string
    engine_size: string
    fuel_type: string
    horse_power: string
    transmission: string
    torque: string
    acceleration: string
  }
}

export function VehicleDetails({ specs }: VehicleDetailsProps) {
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="specifications">
        <AccordionItem value="specifications">
          <AccordionTrigger>Specifications</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">Condition Score</div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < specs.condition_score ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 text-sm">
                {Object.entries(specs).map(([key, value]) => {
                  if (key === "condition_score") return null
                  return (
                    <div key={key} className="flex justify-between border-b border-gray-700 pb-2">
                      <div className="font-medium capitalize">{key.replace(/_/g, " ")}</div>
                      <div className="text-gray-400">{value}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="running-costs">
          <AccordionTrigger>Running Costs</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <div className="font-medium">Fuel Consumption (City)</div>
                <div className="text-gray-400">8.5L/100km</div>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <div className="font-medium">Fuel Consumption (Highway)</div>
                <div className="text-gray-400">6.8L/100km</div>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <div className="font-medium">Annual Road Tax</div>
                <div className="text-gray-400">KES 15,000</div>
              </div>
              <div className="flex justify-between border-b border-gray-700 pb-2">
                <div className="font-medium">Insurance Estimate</div>
                <div className="text-gray-400">KES 120,000/year</div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

