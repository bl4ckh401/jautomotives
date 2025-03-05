import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#1a1f24] from-gray-100 to-white">
      {/* Hero Section */}
      <div
        className="relative h-80 bg-cover bg-center"
        style={{ backgroundImage: "url('/placeholder.svg?height=400&width=800')" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center">Get in Touch</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="p-6 shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <form className="space-y-4">
              <Input type="text" placeholder="Your Name" required className="w-full" />
              <Input type="email" placeholder="Your Email" required className="w-full" />
              <Input type="tel" placeholder="Your Phone" className="w-full" />
              <Textarea placeholder="Your Message" required className="w-full min-h-[150px]" />
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center p-4">
                  <Phone className="mr-4 h-6 w-6 text-blue-500" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <p className="text-gray-600">+254 726 692704</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center p-4">
                  <Mail className="mr-4 h-6 w-6 text-green-500" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <p className="text-gray-600">info@jabaautomobiles.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center p-4">
                  <MapPin className="mr-4 h-6 w-6 text-red-500" />
                  <div>
                    <h3 className="font-semibold">Address</h3>
                    <p className="text-gray-600">123 Auto Street, Nairobi, Kenya</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
                <CardContent className="flex items-center p-4">
                  <Clock className="mr-4 h-6 w-6 text-purple-500" />
                  <div>
                    <h3 className="font-semibold">Business Hours</h3>
                    <p className="text-gray-600">Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p>
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4">Find Us</h2>
          <div className="aspect-w-16 aspect-h-9">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.818391087547!2d36.81963021475803!3d-1.2841924359736388!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d22f28f0c7%3A0x5f7f3c0a6f2a0f0!2sNairobi%2C%20Kenya!5e0!3m2!1sen!2sus!4v1625581243076!5m2!1sen!2sus"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>
    </div>
  )
}

