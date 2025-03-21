import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function TradeInFAQ() {
  const faqs = [
    {
      question: "How is my vehicle's trade-in value determined?",
      answer:
        "We evaluate your vehicle based on its make, model, year, condition, mileage, market demand, and service history. Our team uses industry-standard valuation tools along with our market expertise to provide you with a fair and competitive offer.",
    },
    {
      question: "Can I trade in a vehicle that's not fully paid off?",
      answer:
        "Yes, you can trade in a vehicle that still has an outstanding loan. If your vehicle is worth more than what you owe, the difference can be applied to your new purchase. If you owe more than the vehicle's value, the remaining balance can be rolled into your new financing or paid separately.",
    },
    {
      question: "What documents do I need to bring for a trade-in?",
      answer:
        "You'll need to bring your vehicle's title (if paid off), current registration, all vehicle keys, loan information (if applicable), valid ID, and service records if available.",
    },
    {
      question: "How long is my trade-in offer valid?",
      answer:
        "Typically, our trade-in offers are valid for 7 days, as market conditions and vehicle values can change. If you need more time, please let us know, and we'll work with you to accommodate your timeline when possible.",
    },
    {
      question: "Do I need to make an appointment for a trade-in evaluation?",
      answer:
        "While walk-ins are welcome, we recommend scheduling an appointment to ensure our team can give you and your vehicle the proper attention. This also helps minimize your wait time.",
    },
    {
      question: "Can I trade in multiple vehicles?",
      answer:
        "Yes, we accept multiple trade-ins. Each vehicle will be evaluated separately, and the combined value can be applied to your new purchase.",
    },
    {
      question: "What types of vehicles do you accept for trade-in?",
      answer:
        "We accept cars, SUVs, trucks, and motorbikes for trade-in. The vehicle should be in running condition and have a clean title. However, we evaluate each vehicle on a case-by-case basis.",
    },
  ]

  return (
    <Accordion type="single" collapsible className="w-full">
      {faqs.map((faq, index) => (
        <AccordionItem key={index} value={`item-${index}`} className="border-gray-700">
          <AccordionTrigger className="text-lg font-medium">{faq.question}</AccordionTrigger>
          <AccordionContent className="text-gray-400">{faq.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

