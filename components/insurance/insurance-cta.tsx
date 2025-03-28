import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText, MessageSquare, Calculator } from "lucide-react"
import Link from "next/link"

export default function InsuranceCTA() {
  return (
    <section className="mb-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Get Protected?</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Take the next step toward securing comprehensive insurance for your vehicle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <FileText className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Get a Quote</h3>
            <p className="text-gray-300 mb-6">
              Receive a personalized insurance quote tailored to your specific needs.
            </p>
            <Link href="/quote" className="mt-auto">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <Calculator className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Calculate Premium</h3>
            <p className="text-gray-300 mb-6">Use our premium calculator to estimate your insurance costs.</p>
            <Link href="#calculator" className="mt-auto">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Use Calculator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-[#242b33] border-gray-700 hover:border-blue-500 transition-all duration-300 hover:shadow-blue-500/20 hover:shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <MessageSquare className="h-12 w-12 text-blue-500 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Speak to an Agent</h3>
            <p className="text-gray-300 mb-6">Have questions? Our insurance specialists are here to help you.</p>
            <Link href="/contact" className="mt-auto">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

