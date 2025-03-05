import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function TruckTowingPage() {
  return (
    <AssistanceServicePage
      title="Specialized Truck Towing"
      description="Heavy-duty towing solutions for trucks of all sizes."
      imageUrl="/images/truck-towing.jpg"
      benefits={[
        "Equipped to handle various truck sizes and weights",
        "Experienced operators trained in truck towing",
        "Safe and secure transportation of your vehicle",
        "Available for both emergency and scheduled towing",
        "Nationwide coverage for long-distance towing",
      ]}
      steps={[
        {
          title: "Request Assistance",
          description: "Contact our truck towing hotline with your location and truck details.",
        },
        {
          title: "Dispatch Appropriate Equipment",
          description: "We'll send the right tow truck based on your vehicle's specifications.",
        },
        {
          title: "Secure Towing",
          description: "Our team will safely load and transport your truck to the desired location.",
        },
      ]}
      emergencyNumber="0800-TRUCKTOW"
    />
  )
}

