import BookingForm from "@/components/BookingForm"

export default function BookingPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8 text-center">Book a Service</h1>
      <BookingForm />
    </div>
  )
}

