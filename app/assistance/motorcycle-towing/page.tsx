import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function MotorcycleTowingPage() {
  return (
    <AssistanceServicePage
      title="Specialized Motorcycle Towing"
      description="Safe and secure towing services designed specifically for motorcycles."
      imageUrl="/images/motorcycle-towing.jpg"
      benefits={[
        "Specialized equipment for motorcycle transport",
        "Trained technicians to handle bikes safely",
        "Available for all types of motorcycles",
        "Enclosed transport options for added protection",
        "Quick response time for roadside breakdowns",
      ]}
      steps={[
        {
          title: "Contact Us",
          description: "Call our motorcycle towing hotline for immediate assistance.",
        },
        {
          title: "Provide Details",
          description: "Describe your motorcycle and its current situation.",
        },
        {
          title: "Secure Transport",
          description: "We'll carefully load and transport your motorcycle to the desired location.",
        },
      ]}
      emergencyNumber="0800-BIKETOW"
    />
  )
}

