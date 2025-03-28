import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { ClipboardCheck, FileText, MessageSquare, ThumbsUp } from "lucide-react"

export default function InsuranceProcess() {
  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Getting insured with us is quick and easy. Follow these simple steps.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <ProcessCard
          step={1}
          icon={<ClipboardCheck className="h-10 w-10 text-blue-500" />}
          title="Get a Quote"
          description="Fill out our simple online form or speak with an insurance specialist to get a personalized quote based on your needs."
        />

        <ProcessCard
          step={2}
          icon={<FileText className="h-10 w-10 text-blue-500" />}
          title="Choose Your Coverage"
          description="Select the coverage options and policy limits that best fit your needs and budget from our range of plans."
        />

        <ProcessCard
          step={3}
          icon={<MessageSquare className="h-10 w-10 text-blue-500" />}
          title="Complete Application"
          description="Provide the necessary information and documentation to finalize your policy. This can be done online or with an agent."
        />

        <ProcessCard
          step={4}
          icon={<ThumbsUp className="h-10 w-10 text-blue-500" />}
          title="Get Insured"
          description="Once your application is approved and payment is processed, your coverage begins immediately with digital proof of insurance."
        />
      </div>

      <div className="mt-12 bg-[#1a1f24] p-8 rounded-lg border border-gray-700">
        <h3 className="text-2xl font-bold mb-4 text-center">Required Documents</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-[#242b33] p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">Personal Information</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Valid government-issued ID</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Proof of residence</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Contact information</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#242b33] p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">Vehicle Information</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Vehicle registration certificate</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Vehicle identification number (VIN)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Purchase invoice or valuation</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Photos of the vehicle</span>
              </li>
            </ul>
          </div>
          <div className="bg-[#242b33] p-6 rounded-lg">
            <h4 className="text-lg font-semibold mb-3 text-blue-400">Additional Documents</h4>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Valid driver's license</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Previous insurance details (if any)</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Driving history record</span>
              </li>
              <li className="flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span>Payment information</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

interface ProcessCardProps {
  step: number
  icon: React.ReactNode
  title: string
  description: string
}

function ProcessCard({ step, icon, title, description }: ProcessCardProps) {
  return (
    <Card className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg overflow-hidden h-full">
      <CardContent className="p-8 flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-blue-600/20 flex items-center justify-center mb-4">{icon}</div>
        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-lg font-bold mb-4">
          {step}
        </div>
        <h3 className="text-xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}

