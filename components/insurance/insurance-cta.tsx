import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowRight, FileText, MessageSquare, Calculator } from "lucide-react"
import Link from "next/link"

export default function InsuranceCTA() {
  return (
    <section className="mb-10">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Ready to Get Protected?</h2>
        <div className="w-24 h-1 bg-primary mx-auto mb-6"></div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Take the next step toward securing comprehensive insurance for your vehicle.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <FileText className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Get a Quote</h3>
            <p className="text-muted-foreground mb-6">
              Receive a personalized insurance quote tailored to your specific needs.
            </p>
            <Link href="/quote" className="mt-auto">
              <Button className="bg-primary hover:bg-primary/90">
                Request Quote <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <Calculator className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Calculate Premium</h3>
            <p className="text-muted-foreground mb-6">Use our premium calculator to estimate your insurance costs.</p>
            <Link href="#calculator" className="mt-auto">
              <Button className="bg-primary hover:bg-primary/90">
                Use Calculator <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="bg-card border-border hover:border-primary transition-all duration-300 hover:shadow-primary/20 hover:shadow-lg">
          <CardContent className="p-8 flex flex-col items-center text-center h-full">
            <MessageSquare className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl font-semibold mb-3">Speak to an Agent</h3>
            <p className="text-muted-foreground mb-6">Have questions? Our insurance specialists are here to help you.</p>
            <Link href="/contact" className="mt-auto">
              <Button className="bg-primary hover:bg-primary/90">
                Contact Us <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

