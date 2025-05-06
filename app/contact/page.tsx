import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Star } from "lucide-react"
import ReviewForm from "@/components/ReviewForm"
import ReviewsList from "@/components/ReviewsList"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ContactForm from "@/components/ContactForm"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#1a1f24] text-white">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-4xl font-bold mb-6">Get in Touch</h1>
            <p className="text-lg text-muted-foreground mb-8">
              Have questions about our services? Want to know more about our vehicles? We're here to help.
            </p>
            
            <div className="space-y-6">
              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <Phone className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <Mail className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@jautomotives.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-4 p-4">
                  <MapPin className="h-6 w-6" />
                  <div>
                    <p className="font-medium">Address</p>
                    <p className="text-muted-foreground">123 Auto Street, Car City, CC 12345</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Send us a Message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </div>

        {/* Reviews Section */}
        <div className="mt-16 mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Customer Reviews</h2>
          
          <Tabs defaultValue="view" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="view">Read Reviews</TabsTrigger>
              <TabsTrigger value="write">Write a Review</TabsTrigger>
            </TabsList>
            
            <TabsContent value="view">
              <ReviewsList />
            </TabsContent>
            
            <TabsContent value="write">
              <div className="max-w-2xl mx-auto">
                <ReviewForm />
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Map Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-semibold mb-4 text-white">Find Us</h2>
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

