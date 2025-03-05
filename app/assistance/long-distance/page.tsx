import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function LongDistanceTowingPage() {
  return (
    <AssistanceServicePage
      title="Long Distance Towing Service"
      description="Reliable and secure long-haul towing for vehicles of all types."
      imageUrl="/images/long-distance-towing.jpg"
      benefits={[
        "Nationwide coverage for long-distance towing",
        "Secure transport to protect your vehicle",
        "Experienced drivers for safe long-haul journeys",
        "Regular updates on your vehicle's progress",
        "Competitive rates for long-distance transport",
      ]}
      steps={[
        {
          title: "Request a Quote",
          description: "Contact us with your vehicle details and desired destination.",
        },
        {
          title: "Schedule Pickup",
          description: "We'll arrange a convenient time to collect your vehicle.",
        },
        {
          title: "Safe Transport",
          description: "Your vehicle will be securely loaded and transported to its destination.",
        },
      ]}
      emergencyNumber="0800-LONGTOW"
    />
  )
}

