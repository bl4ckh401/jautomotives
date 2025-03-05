import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function BatteryReplacementPage() {
  return (
    <AssistanceServicePage
      title="On-Site Battery Replacement"
      description="Don't let a dead battery leave you stranded. We'll come to you with a new one."
      imageUrl="/images/battery-replacement.jpg"
      benefits={[
        "Convenient on-site service",
        "Quick diagnosis and replacement",
        "High-quality batteries for all vehicle types",
        "Expert technicians ensure proper installation",
        "Competitive pricing with warranty options",
      ]}
      steps={[
        {
          title: "Request Service",
          description: "Call us or use our app to report your battery issue.",
        },
        {
          title: "Battery Check",
          description: "Our technician will test your battery to confirm if replacement is needed.",
        },
        {
          title: "Swift Replacement",
          description: "If required, we'll replace your battery on the spot with a suitable new one.",
        },
      ]}
      emergencyNumber="0800-BATTERY"
    />
  )
}

