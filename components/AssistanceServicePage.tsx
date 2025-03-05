import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, CheckCircle, ArrowRight } from "lucide-react"

interface ServiceStep {
  title: string
  description: string
}

interface FAQ {
  question: string
  answer: string
}

interface AssistanceServicePageProps {
  title: string
  description: string
  imageUrl: string
  benefits: string[]
  steps: ServiceStep[]
  emergencyNumber: string
  faqs?: FAQ[]
}

export default function AssistanceServicePage({
  title,
  description,
  imageUrl,
  benefits,
  steps,
  emergencyNumber,
  faqs,
}: AssistanceServicePageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <div className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/70 to-purple-600/70" />
        <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-8 md:p-16 max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight">{title}</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl">{description}</p>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6">
            <Phone className="mr-2 h-6 w-6" /> Call Now
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Benefits Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-6 flex items-start">
                  <CheckCircle className="text-green-500 mr-4 flex-shrink-0 h-6 w-6" />
                  <p className="text-lg">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">How It Works</h2>
          <div className="space-y-8">
            {steps.map((step, index) => (
              <div key={index} className="flex items-start">
                <div className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-bold text-lg mr-4 flex-shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="mb-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8 md:p-12 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">24/7 Emergency Assistance</h2>
            <p className="text-xl">We're here for you, anytime, anywhere.</p>
          </div>
          <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Phone className="mr-2 h-6 w-6" />
            {emergencyNumber}
          </Button>
        </section>

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="mb-20">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-lg font-semibold">{faq.question}</AccordionTrigger>
                  <AccordionContent className="text-gray-600 dark:text-gray-300">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </section>
        )}

        {/* Call-to-Action */}
        <section className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Help?</h2>
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold text-lg px-8 py-6">
            Request Assistance <ArrowRight className="ml-2 h-6 w-6" />
          </Button>
        </section>
      </div>
    </div>
  )
}

