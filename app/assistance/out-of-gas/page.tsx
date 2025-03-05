import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function OutOfGasPage() {
  return (
    <AssistanceServicePage
      title="Out-of-Gas Rescue Service"
      description="Quick fuel delivery when you're stranded with an empty tank."
      imageUrl="/images/out-of-gas.jpg"
      benefits={[
        "Fast delivery of fuel to your location",
        "Available 24/7 for unexpected situations",
        "Enough fuel to reach the nearest gas station",
        "Service for all types of vehicles",
        "Competitive pricing with no hidden fees",
      ]}
      steps={[
        {
          title: "Request Fuel Delivery",
          description: "Call our emergency number and provide your location.",
        },
        {
          title: "Wait Safely",
          description: "Remain with your vehicle in a safe area.",
        },
        {
          title: "Refuel and Go",
          description: "We'll deliver and add fuel to get you back on the road.",
        },
      ]}
      emergencyNumber="0800-GASNOW"
    />
  )
}

