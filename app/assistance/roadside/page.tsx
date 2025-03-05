import AssistanceServicePage from "@/components/AssistanceServicePage"

export default function RoadsideAssistancePage() {
  return (
    <AssistanceServicePage
      title="Comprehensive Roadside Assistance"
      description="From jump starts to tire changes, we've got you covered on the road."
      imageUrl="/images/roadside-assistance.jpg"
      benefits={[
        "Wide range of services for common roadside issues",
        "Fast response times to minimize your wait",
        "Skilled technicians for efficient problem-solving",
        "Available 24/7 for unexpected breakdowns",
        "Cost-effective solutions to avoid expensive tows",
      ]}
      steps={[
        {
          title: "Call for Help",
          description: "Contact our roadside assistance number and describe your issue.",
        },
        {
          title: "Expert Arrives",
          description: "Our technician will come to your location with necessary equipment.",
        },
        {
          title: "Problem Solved",
          description: "We'll fix the issue on-site or arrange further assistance if needed.",
        },
      ]}
      emergencyNumber="0800-ROADSIDE"
    />
  )
}

