import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import AssistanceRequestForm from "@/components/AssistanceRequestForm"
import { AlertTriangle, Clock, MapPin, Phone } from "lucide-react"

export default function RequestAssistancePage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h1 className="text-4xl font-bold mb-6">Request Roadside Assistance</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Need help? We're available 24/7 for emergency roadside assistance. Fill out the form and our team will respond immediately.
          </p>
          
          <div className="space-y-6">
            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Phone className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">Emergency Hotline</p>
                  <p className="text-muted-foreground">+1 (555) 911-0000</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex items-center gap-4 p-4">
                <Clock className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">24/7 Service</p>
                  <p className="text-muted-foreground">Available round the clock</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-yellow-500" />
                  Important Note
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm">
                  If you're in an emergency situation or immediate danger, please call emergency services (911) first. 
                  Our service is for non-life-threatening vehicle-related issues.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="lg:sticky lg:top-6">
          <CardHeader>
            <CardTitle>Request Assistance</CardTitle>
            <CardDescription>
              Fill out the form below with your location and situation details. We'll dispatch help immediately.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AssistanceRequestForm />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}