import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function EmergencyRoadServicesPage() {
  return (
    <AssistanceServicePage
      title="Emergency Road Services"
      description="Comprehensive roadside assistance for various vehicle issues."
      imageUrl="/images/emergency-road-service.jpg"
      benefits={[
        "Wide range of services for different emergencies",
        "Quick response time to get you moving again",
        "Skilled technicians for on-the-spot repairs",
        "Available 24/7, 365 days a year",
        "Cost-effective alternative to towing",
      ]}
      steps={[
        {
          title: "Call for Assistance",
          description: "Contact our emergency number and describe your situation.",
        },
        {
          title: "Expert Diagnosis",
          description: "Our technician will assess the problem upon arrival.",
        },
        {
          title: "Rapid Resolution",
          description: "We'll perform necessary repairs or arrange further assistance if needed.",
        },
      ]}
      emergencyNumber="0800-ROADHELP"
    />
  )
}

