"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle, Mail, Phone } from "lucide-react"
import Link from "next/link"

export default function SuspendedPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-destructive/10 p-3">
              <AlertCircle className="h-12 w-12 text-destructive" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Payment Required</CardTitle>
          <CardDescription>
            Service temporarily suspended due to outstanding balance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center text-sm text-muted-foreground">
            <p className="mb-4">
              Your service has been temporarily suspended due to an outstanding payment balance.
            </p>
            <p>
              Please contact us to settle your balance and restore full access to your website.
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t">
            <h3 className="font-semibold text-sm">Contact Us to Make Payment</h3>
            <div className="space-y-2">
              <a 
                href="mailto:pavkiptoo@gmail.com" 
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
              >
                <Mail className="h-4 w-4" />
                pavkiptoo@gmail.com
              </a>
              <a 
                href="tel:+254795684601" 
                className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600"
              >
                <Phone className="h-4 w-4" />
                +254 720 447 239
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
