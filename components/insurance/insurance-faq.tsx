import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { HelpCircle } from "lucide-react"

export default function InsuranceFAQ() {
  const faqs = [
    {
      question: "What factors affect my insurance premium?",
      answer:
        "Several factors influence your insurance premium, including your vehicle's make, model, and year; your age and driving history; where you live and park your vehicle; your coverage limits and deductibles; and how you use your vehicle (personal or business). Additional factors may include your credit history, annual mileage, and any anti-theft devices installed in your vehicle.",
    },
    {
      question: "How do I file a claim?",
      answer:
        "Filing a claim is simple. You can initiate a claim through our 24/7 claims hotline, our mobile app, or our website. You'll need to provide details about the incident, including date, time, location, and a description of what happened. Our claims team will guide you through the process, including documentation requirements and next steps. We aim to process claims quickly and efficiently to minimize disruption to your life.",
    },
    {
      question: "What is a deductible and how does it work?",
      answer:
        "A deductible is the amount you agree to pay out of pocket before your insurance coverage kicks in. For example, if you have a KES 10,000 deductible and experience KES 50,000 in covered damages, you would pay KES 10,000 and your insurance would cover the remaining KES 40,000. Generally, choosing a higher deductible results in lower premium payments, while a lower deductible means higher premiums but less out-of-pocket expense when filing a claim.",
    },
    {
      question: "Can I add additional drivers to my policy?",
      answer:
        "Yes, you can add additional drivers to your policy. These might include family members, spouses, or others who regularly use your vehicle. Adding drivers to your policy ensures they're covered when driving your vehicle. The impact on your premium will depend on the additional driver's age, driving history, and other factors. It's important to add all regular drivers to your policy to ensure proper coverage.",
    },
    {
      question: "Do you offer discounts on insurance premiums?",
      answer:
        "Yes, we offer various discounts that can help reduce your premium. These may include safe driver discounts, multi-vehicle discounts, bundling discounts (if you have multiple policies with us), loyalty discounts, anti-theft device discounts, and discounts for completing defensive driving courses. We also offer special rates for low-mileage drivers and those who pay their premium in full rather than monthly installments.",
    },
    {
      question: "What is gap insurance and do I need it?",
      answer:
        "Gap insurance covers the 'gap' between what you owe on your vehicle loan or lease and the vehicle's actual cash value if it's totaled or stolen. This is particularly valuable for new vehicles, which depreciate quickly. If you've financed your vehicle with little or no down payment, or if you have a long-term loan or lease, gap insurance may be worth considering to protect yourself from potentially owing thousands on a vehicle you no longer have.",
    },
    {
      question: "How long does it take to get insured?",
      answer:
        "In many cases, we can provide same-day coverage. The process typically takes 15-30 minutes to complete online or over the phone. Once you've selected your coverage options and provided the necessary information, we can usually bind coverage immediately and provide you with proof of insurance. For more complex situations or specialized coverage needs, the process might take a bit longer, but our team works efficiently to get you covered as quickly as possible.",
    },
    {
      question: "Can I transfer my insurance to a new vehicle?",
      answer:
        "Yes, you can transfer your insurance coverage to a new vehicle. Simply contact our customer service team with details about your new vehicle, and we'll update your policy. Keep in mind that your premium may change based on the new vehicle's make, model, year, and value. It's important to notify us before or on the day you acquire the new vehicle to ensure continuous coverage.",
    },
  ]

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h2>
        <div className="w-24 h-1 bg-blue-600 mx-auto mb-6"></div>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          Find answers to common questions about our insurance options.
        </p>
      </div>

      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <HelpCircle className="mr-2 h-6 w-6 text-blue-500" />
            Insurance FAQs
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
        <h3 className="text-xl font-semibold mb-4">Insurance Glossary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-blue-400">Premium</h4>
            <p className="text-gray-300 text-sm">
              The amount you pay for your insurance coverage, typically on a monthly or annual basis.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Deductible</h4>
            <p className="text-gray-300 text-sm">
              The amount you pay out of pocket before your insurance coverage kicks in.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Liability Coverage</h4>
            <p className="text-gray-300 text-sm">
              Insurance that covers damage or injury you cause to others in an accident.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Comprehensive Coverage</h4>
            <p className="text-gray-300 text-sm">
              Insurance that covers damage to your vehicle from non-collision incidents like theft or natural disasters.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Collision Coverage</h4>
            <p className="text-gray-300 text-sm">
              Insurance that covers damage to your vehicle from a collision, regardless of fault.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Claim</h4>
            <p className="text-gray-300 text-sm">
              A formal request to your insurance company for coverage or compensation for a covered loss.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Policy</h4>
            <p className="text-gray-300 text-sm">
              The contract between you and your insurance company that outlines your coverage.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-blue-400">Underwriting</h4>
            <p className="text-gray-300 text-sm">
              The process insurers use to evaluate risk and determine premium rates.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

