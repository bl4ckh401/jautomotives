import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function FinancingFAQ() {
  const faqs = [
    {
      question: "What credit score do I need to qualify for financing?",
      answer:
        "Credit score requirements vary by financing option. For traditional auto loans, a score of 650 or higher will typically qualify you for the best rates. Our in-house financing is more flexible, with options available for scores as low as 550. Cryptocurrency financing relies more on your crypto collateral than credit score.",
    },
    {
      question: "How much should I put down as a down payment?",
      answer:
        "We generally recommend a down payment of 10-20% of the vehicle's purchase price for traditional financing. A larger down payment will reduce your monthly payments and total interest paid. For in-house financing, down payment requirements vary based on credit history. With cryptocurrency financing, your crypto assets serve as collateral.",
    },
    {
      question: "Can I get pre-approved for financing before shopping?",
      answer:
        "Yes, we offer pre-approval for all our financing options. Pre-approval gives you a clear budget and strengthens your negotiating position. The pre-approval process is quick and can often be completed online or over the phone.",
    },
    {
      question: "How does cryptocurrency financing work?",
      answer:
        "Our cryptocurrency financing allows you to use your crypto assets as collateral for your auto loan, or to make direct purchases using major cryptocurrencies. This lets you maintain your crypto investment position while still accessing its value. We support Bitcoin, Ethereum, and several other major cryptocurrencies.",
    },
    {
      question: "What's the difference between leasing and financing?",
      answer:
        "When you finance a vehicle, you're working toward ownership and will own the vehicle outright once the loan is paid off. With leasing, you're essentially paying for the use of the vehicle for a specific period (typically 24-48 months), after which you return the vehicle or have the option to purchase it for a predetermined amount.",
    },
    {
      question: "Can I refinance my current auto loan with you?",
      answer:
        "Yes, we offer refinancing options that may help lower your interest rate or monthly payment. Refinancing is a great option if your credit score has improved since your original loan or if interest rates have decreased.",
    },
    {
      question: "Are there any prepayment penalties?",
      answer:
        "None of our financing options carry prepayment penalties. You're free to pay off your loan early or make additional payments at any time, which can save you money on interest over the life of the loan.",
    },
    {
      question: "How long does the financing approval process take?",
      answer:
        "Approval times vary by financing type. Traditional auto loans typically take 1-3 business days for full approval. In-house financing can often be completed the same day. Cryptocurrency financing approval depends on verification of your crypto assets but can also be completed quickly in many cases.",
    },
  ]

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Find answers to common questions about our financing options.
        </p>
      </div>

      <Card className="bg-[#242b33] border-gray-700">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <HelpCircle className="mr-2 h-6 w-6 text-blue-500" />
            Financing FAQs
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
                <AccordionTrigger className="text-lg font-semibold py-4 hover:text-blue-400">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-300 py-4">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </CardContent>
      </Card>

      <div className="mt-12 bg-background p-6 rounded-lg border border-gray-700">
        <h3 className="text-xl font-semibold mb-4">Financing Glossary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-400">APR (Annual Percentage Rate)</h4>
            <p className="text-gray-300 text-sm">
              The yearly cost of a loan expressed as a percentage, including fees and interest.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Principal</h4>
            <p className="text-gray-300 text-sm">The original amount borrowed, not including interest or fees.</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Down Payment</h4>
            <p className="text-gray-300 text-sm">An initial upfront payment made when purchasing a vehicle.</p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Term</h4>
            <p className="text-gray-300 text-sm">
              The length of time you have to repay your loan, typically expressed in months.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Residual Value</h4>
            <p className="text-gray-300 text-sm">
              The estimated value of a leased vehicle at the end of the lease term.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Money Factor</h4>
            <p className="text-gray-300 text-sm">
              A decimal figure used to calculate lease charges, similar to an interest rate.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Collateral</h4>
            <p className="text-gray-300 text-sm">
              An asset that secures a loan and may be seized if you default on payments.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Amortization</h4>
            <p className="text-gray-300 text-sm">
              The process of spreading out a loan into a series of fixed payments over time.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

