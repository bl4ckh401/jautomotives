import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function TowingPage() {
  return (
    <AssistanceServicePage
      title="24-Hour Towing Service"
      description="Fast, reliable towing service available around the clock for your peace of mind."
      imageUrl="/images/24-hour-towing.jpg"
      benefits={[
        "Immediate response at any time",
        "Experienced and professional tow truck operators",
        "Wide coverage area for quick assistance",
        "Equipped to handle various vehicle types",
        "Transparent pricing with no hidden fees",
      ]}
      steps={[
        {
          title: "Contact Us",
          description: "Call our emergency number or use our mobile app to request assistance.",
        },
        {
          title: "Provide Details",
          description: "Give us your location and information about your vehicle's situation.",
        },
        {
          title: "Wait Safely",
          description: "Our tow truck will arrive promptly. Stay in a safe place while waiting.",
        },
      ]}
      emergencyNumber="0800-TOW-HELP"
      faqs={[
        {
          question: "How long does it typically take for a tow truck to arrive?",
          answer:
            "Our average response time is 30-45 minutes, depending on your location and current demand. We always strive to reach you as quickly as possible.",
        },
        {
          question: "What types of vehicles can you tow?",
          answer:
            "We can tow a wide range of vehicles, including cars, SUVs, motorcycles, and light trucks. For heavier vehicles, we have specialized equipment available.",
        },
        {
          question: "Do you offer long-distance towing?",
          answer:
            "Yes, we provide long-distance towing services. Please call us for a quote based on your specific needs and destination.",
        },
        {
          question: "Is your towing service available on holidays?",
          answer: "Our 24-hour service is available every day of the year, including all holidays.",
        },
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major credit cards, debit cards, and cash. Payment is typically collected at the time of service.",
        },
      ]}
    />
  )
}

