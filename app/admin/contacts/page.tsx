"use client"

import { useEffect, useState } from "react"
import { ContactRequest, getContactRequests } from "@/services/contactService"
import AdminContactTable from "@/components/admin/AdminContactTable"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminContactsPage() {
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([])
  const [loading, setLoading] = useState(true)

  const loadContactRequests = async () => {
    try {
      const requests = await getContactRequests()
      setContactRequests(requests)
    } catch (error) {
      console.error("Error loading contact requests:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadContactRequests()
  }, [])

  const newRequests = contactRequests.filter(r => r.status === "new")
  const inProgressRequests = contactRequests.filter(r => r.status === "in-progress")
  const resolvedRequests = contactRequests.filter(r => r.status === "resolved")

  if (loading) {
    return <div className="p-8">Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Contact Requests</CardTitle>
          <CardDescription>
            Manage and respond to customer contact requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="new">
            <TabsList>
              <TabsTrigger value="new">
                New ({newRequests.length})
              </TabsTrigger>
              <TabsTrigger value="in-progress">
                In Progress ({inProgressRequests.length})
              </TabsTrigger>
              <TabsTrigger value="resolved">
                Resolved ({resolvedRequests.length})
              </TabsTrigger>
              <TabsTrigger value="all">
                All ({contactRequests.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="new" className="mt-4">
              <AdminContactTable 
                contactRequests={newRequests}
                onStatusUpdate={loadContactRequests}
              />
            </TabsContent>

            <TabsContent value="in-progress" className="mt-4">
              <AdminContactTable 
                contactRequests={inProgressRequests}
                onStatusUpdate={loadContactRequests}
              />
            </TabsContent>

            <TabsContent value="resolved" className="mt-4">
              <AdminContactTable 
                contactRequests={resolvedRequests}
                onStatusUpdate={loadContactRequests}
              />
            </TabsContent>

            <TabsContent value="all" className="mt-4">
              <AdminContactTable 
                contactRequests={contactRequests}
                onStatusUpdate={loadContactRequests}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}