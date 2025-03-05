import AssistanceService from "@/components/AssistanceService"

export default function TowingService() {
  return (
    <AssistanceService
      title="24-Hour Towing Service"
      description="Our round-the-clock towing service is here to help you when you need it most. Whether you've had a breakdown or an accident, our professional team will be there to assist you quickly and efficiently."
      image="/images/towing-service.jpg"
      services={[
        "24/7 emergency towing",
        "Long-distance towing",
        "Flatbed towing",
        "Motorcycle towing",
        "Heavy-duty towing",
        "Accident recovery",
      ]}
      emergencyNumber="0726 692704"
    />
  )
}

