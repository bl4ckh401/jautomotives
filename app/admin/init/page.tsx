"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, CheckCircle } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useAdmin } from "@/contexts/AdminContext"

export default function AdminInitPage() {
  const { user, loading: authLoading } = useAuth()
  const { isAdmin, isLoading: adminLoading, initialAdminSetup } = useAdmin()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  
  // Redirect if already admin
  useEffect(() => {
    if (!authLoading && !adminLoading && isAdmin) {
      router.push("/admin")
    }
  }, [isAdmin, authLoading, adminLoading, router])
  
  const handleSetupAdmin = async () => {
    if (!user) {
      setError("You must be logged in to set up admin access")
      return
    }
    
    try {
      setIsSubmitting(true)
      setError(null)
      
      // Try to initialize through the context first
      await initialAdminSetup()
      
      setSuccess(true)
      setTimeout(() => {
        router.push("/admin")
      }, 2000)
    } catch (err: any) {
      console.error("Error setting up admin:", err)
      setError(err?.message || "Failed to set up admin access. Please try again or contact support.")
    } finally {
      setIsSubmitting(false)
    }
  }
  
  if (authLoading || adminLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Setup</CardTitle>
            <CardDescription className="text-center">Checking authentication status...</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center py-6">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </CardContent>
        </Card>
      </div>
    )
  }
  
  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">Admin Setup</CardTitle>
            <CardDescription className="text-center">
              Authentication Required
            </CardDescription>
          </CardHeader>
          <CardContent className="py-6">
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Authentication Required</AlertTitle>
              <AlertDescription>
                You must be logged in to set up admin access
              </AlertDescription>
            </Alert>
            <div className="flex justify-center">
              <Link href="/sign-in">
                <Button>Sign In</Button>
              </Link>
            </div>
          </CardContent>
          <CardFooter className="flex justify-center border-t pt-6">
            <Link href="/" className="text-sm text-muted-foreground hover:underline">
              Return to Homepage
            </Link>
          </CardFooter>
        </Card>
      </div>
    )
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-center">Admin Setup</CardTitle>
          <CardDescription className="text-center">
            {success
              ? "Admin access has been granted!"
              : "Set up admin access for your account"}
          </CardDescription>
        </CardHeader>
        <CardContent className="py-6">
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          {success ? (
            <div className="text-center space-y-4">
              <div className="mx-auto bg-green-100 dark:bg-green-900/30 w-16 h-16 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <Alert variant="default" className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800">
                <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>
                  Admin access has been granted! Redirecting to admin dashboard...
                </AlertDescription>
              </Alert>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Welcome to Admin Setup</h3>
                <p className="text-muted-foreground">
                  You are about to set up admin access for your account:
                </p>
                <p className="font-medium bg-gray-100 dark:bg-gray-800 p-2 rounded text-center">
                  {user.email}
                </p>
              </div>
              
              <div className="space-y-2">
                <h4 className="font-medium">This will grant you:</h4>
                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                  <li>Full administrative privileges to manage the platform</li>
                  <li>Access to all user management features</li>
                  <li>Ability to manage vehicle listings and bookings</li>
                  <li>Control over system settings and configurations</li>
                </ul>
              </div>
              
              <div className="flex justify-center pt-4">
                <Button 
                  onClick={handleSetupAdmin} 
                  disabled={isSubmitting}
                  className="w-full"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Setting up admin access...
                    </>
                  ) : (
                    "Set Up Admin Access"
                  )}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center border-t pt-6">
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            Return to Homepage
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
} 