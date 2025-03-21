"use client"

import type React from "react"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Phone, CheckCircle, ArrowRight, Clock, Shield, Truck, MapPin } from "lucide-react"

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
    <div className="min-h-screen bg-[#1a1f24] text-white">
      {/* Hero Section */}
      <div className="relative h-[70vh] min-h-[600px] overflow-hidden">
        <Image
          src={imageUrl || "/placeholder.svg?height=800&width=1600"}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1a1f24]/90 to-black/80" />

        {/* Emergency Contact Button - Floating */}
        <div className="absolute top-8 right-8 z-30 hidden md:block">
          <a
            href={`tel:${emergencyNumber}`}
            className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-105 animate-pulse"
          >
            <Phone className="h-6 w-6" />
            <span className="text-xl font-bold">{emergencyNumber}</span>
          </a>
        </div>

        <div className="absolute inset-0 flex flex-col justify-center items-start text-white p-8 md:p-16 max-w-7xl mx-auto z-20">
          <div className="bg-[#1a1f24]/80 backdrop-blur-sm p-8 rounded-xl max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">{title}</h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">{description}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6 rounded-full"
              >
                <Phone className="mr-2 h-6 w-6" /> Call Now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1a1f24] font-bold text-lg px-8 py-6 rounded-full"
              >
                Request Service Online
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Benefits Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Our Service</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card
                key={index}
                className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg overflow-hidden group"
              >
                <CardContent className="p-8 flex flex-col items-center text-center h-full">
                  <div className="w-16 h-16 rounded-full bg-blue-600/20 flex items-center justify-center mb-6 group-hover:bg-blue-600/30 transition-all duration-300">
                    <CheckCircle className="text-blue-500 h-8 w-8" />
                  </div>
                  <p className="text-lg font-medium">{benefit}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="mb-20 relative">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=600&width=1200')] bg-fixed bg-cover opacity-10 rounded-xl"></div>
          <div className="relative bg-[#242b33]/90 backdrop-blur-sm rounded-xl p-8 md:p-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">How It Works</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Our streamlined process ensures you get help quickly and efficiently when you need it most.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-12">
                {steps.slice(0, Math.ceil(steps.length / 2)).map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                        {index + 1}
                      </div>
                      {index < Math.ceil(steps.length / 2) - 1 && (
                        <div className="w-0.5 h-16 bg-blue-600/50 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-12">
                {steps.slice(Math.ceil(steps.length / 2)).map((step, index) => (
                  <div key={index} className="flex">
                    <div className="flex-shrink-0 mr-6">
                      <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center text-xl font-bold">
                        {index + Math.ceil(steps.length / 2) + 1}
                      </div>
                      {index < steps.slice(Math.ceil(steps.length / 2)).length - 1 && (
                        <div className="w-0.5 h-16 bg-blue-600/50 mx-auto mt-2"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                      <p className="text-gray-300">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Service Features */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">Our Service Features</h2>
            <div className="w-24 h-1 bg-blue-600 mx-auto"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Clock className="h-10 w-10 text-blue-500" />}
              title="24/7 Availability"
              description="We're available around the clock, every day of the year, including holidays."
            />
            <FeatureCard
              icon={<Shield className="h-10 w-10 text-blue-500" />}
              title="Fully Insured"
              description="All our services are fully insured for your peace of mind."
            />
            <FeatureCard
              icon={<Truck className="h-10 w-10 text-blue-500" />}
              title="Modern Equipment"
              description="We use the latest equipment and technology to provide efficient service."
            />
            <FeatureCard
              icon={<MapPin className="h-10 w-10 text-blue-500" />}
              title="Wide Coverage"
              description="We cover all major areas and highways in the region."
            />
          </div>
        </section>

        {/* Emergency Contact Section */}
        <section className="mb-20">
          <div className="relative overflow-hidden rounded-xl">
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] bg-cover bg-center opacity-20"></div>
            <div className="relative bg-gradient-to-r from-blue-900 to-[#1a1f24] p-12 md:p-16 flex flex-col md:flex-row justify-between items-center">
              <div className="mb-8 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold mb-4">Need Immediate Assistance?</h2>
                <p className="text-xl text-gray-200">Our emergency team is standing by 24/7 to help you.</p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6 rounded-full"
                  onClick={() => (window.location.href = `tel:${emergencyNumber}`)}
                >
                  <Phone className="mr-2 h-6 w-6" />
                  {emergencyNumber}
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 text-lg px-8 py-6 rounded-full"
                >
                  Request Online <ArrowRight className="ml-2 h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        {faqs && faqs.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
              <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Find answers to common questions about our services.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-gray-700 mb-4">
                    <AccordionTrigger className="text-lg font-semibold py-4 px-6 bg-[#242b33] hover:bg-[#2a3138] rounded-t-lg">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-300 bg-[#242b33]/70 p-6 rounded-b-lg">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </section>
        )}

        {/* Call-to-Action */}
        <section className="text-center">
          <div className="bg-[#242b33] rounded-xl p-12 max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Get Help?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Don't wait until it's too late. Contact our team now for immediate assistance or to learn more about our
              services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg px-8 py-6 rounded-full"
              >
                Request Assistance <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-[#1a1f24] font-bold text-lg px-8 py-6 rounded-full"
              >
                Learn More About Our Services
              </Button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// Helper component for feature cards
function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <Card className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg overflow-hidden h-full">
      <CardContent className="p-8 flex flex-col items-center text-center h-full">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </CardContent>
    </Card>
  )
}

