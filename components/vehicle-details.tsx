"use client"
import { Star } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface VehicleDetailsProps {
  specs: Record<string, any>
}

export function VehicleDetails({ specs }: VehicleDetailsProps) {
  // Convert condition to a score (for stars)
  let conditionScore = 3; // Default to 3 stars
  
  if (typeof specs.condition_score === 'number') {
    conditionScore = specs.condition_score;
  } else if (typeof specs.condition_score === 'string') {
    // Map string condition to star rating
    switch(specs.condition_score) {
      case 'New':
        conditionScore = 5;
        break;
      case 'Certified Pre-Owned':
        conditionScore = 4;
        break;
      case 'Used':
        conditionScore = 3;
        break;
      default:
        conditionScore = 3;
    }
  }
  
  return (
    <div className="space-y-6">
      <Accordion type="single" collapsible defaultValue="specifications">
        <AccordionItem value="specifications">
          <AccordionTrigger>Specifications</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              {/* <div className="flex items-center space-x-2">
                <div className="text-sm font-medium">Condition</div>
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < conditionScore ? "text-flax fill-current" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
              </div> */}

              <div className="grid grid-cols-1 gap-4 text-sm">
                {Object.entries(specs).map(([key, value]) => {
                  if (key === 'condition_score') return null;
                  if (value === undefined || value === null) return null;
                  
                  return (
                    <div key={key} className="flex justify-between border-b border-gray-700 pb-2">
                      <div className="font-medium capitalize">{key.replace(/_/g, " ")}</div>
                      <div className="text-muted-foreground">{value}</div>
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
            <div className="text-sm text-center text-muted-foreground">
              Running cost information will be available soon.
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}

