import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function UnlockingPage() {
  return (
    <AssistanceServicePage
      title="Vehicle Unlocking Service"
      description="Quick and safe solution when you're locked out of your vehicle."
      imageUrl="/images/car-unlocking.jpg"
      benefits={[
        "Fast response time to get you back on the road",
        "Skilled technicians trained in various unlocking methods",
        "Damage-free entry to protect your vehicle",
        "Available 24/7 for emergencies",
        "Service for all types of vehicles",
      ]}
      steps={[
        {
          title: "Call for Help",
          description: "Contact our emergency number for immediate assistance.",
        },
        {
          title: "Verify Ownership",
          description: "Provide necessary information to confirm you're the vehicle owner.",
        },
        {
          title: "Professional Unlocking",
          description: "Our technician will arrive and safely unlock your vehicle.",
        },
      ]}
      emergencyNumber="0800-UNLOCK"
    />
  )
}

