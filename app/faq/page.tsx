import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import SEO from "@/components/SEO"
import StructuredData from "@/components/StructuredData"

const faqs = [
  {
    question: "How can I buy a luxury car with cryptocurrency?",
    answer:
      "To buy a luxury car with cryptocurrency on CryptoDrive Luxury, browse our selection, choose your desired vehicle, and select the cryptocurrency payment option at checkout. We support various cryptocurrencies including Bitcoin, Ethereum, and more.",
  },
  {
    question: "What cryptocurrencies do you accept?",
    answer:
      "We accept a wide range of cryptocurrencies, including Bitcoin (BTC), Ethereum (ETH), Litecoin (LTC), and others. Check our payment options page for a full list of accepted cryptocurrencies.",
  },
  {
    question: "Is buying a car with cryptocurrency safe?",
    answer:
      "Yes, buying a car with cryptocurrency on CryptoDrive Luxury is safe. We use secure blockchain technology for transactions and implement strict security measures to protect your personal and financial information.",
  },
  {
    question: "Can I sell my luxury car for cryptocurrency?",
    answer:
      "You can list your luxury car for sale on CryptoDrive Luxury and choose to accept cryptocurrency as payment. Our platform supports secure transactions for both buyers and sellers.",
  },
  {
    question: "Do you offer financing options for cryptocurrency purchases?",
    answer:
      "Yes, we offer cryptocurrency-based financing options. Check our financing page for more details on terms, rates, and eligibility criteria.",
  },
]

export default function FAQPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }

  return (
    <>
      <SEO
        title="CryptoDrive Luxury FAQ | Buying Luxury Cars with Cryptocurrency"
        description="Find answers to frequently asked questions about buying and selling luxury cars with cryptocurrency on CryptoDrive Luxury."
        keywords="luxury cars, cryptocurrency, FAQ, bitcoin, car buying, crypto payments"
      />
      <StructuredData data={structuredData} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  )
}

