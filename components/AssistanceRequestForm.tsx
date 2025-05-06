"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { createAssistanceRequest, AssistanceRequest } from "@/services/assistanceService"

const ASSISTANCE_TYPES = [
  { value: "towing", label: "Towing Service" },
  { value: "battery", label: "Battery Jump Start" },
  { value: "fuel", label: "Fuel Delivery" },
  { value: "lockout", label: "Vehicle Lockout" },
  { value: "tire", label: "Tire Change" },
  { value: "other", label: "Other Assistance" },
]

export default function AssistanceRequestForm() {
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    issueType: "",
    description: "",
    location: {
      latitude: 0,
      longitude: 0,
      address: "",
    },
    name: "",
    phone: "",
    email: "",
  })

  // Get user's location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            location: {
              ...prev.location,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            }
          }))
        },
        (error) => {
          toast({
            title: "Location Error",
            description: "Could not get your location. Please enter it manually.",
            variant: "destructive",
          })
        }
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await createAssistanceRequest({
        issueType: formData.issueType as AssistanceRequest["issueType"],
        description: formData.description,
        location: formData.location,
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        vehicleDetails: {}
      })

      toast({
        title: "Assistance request sent",
        description: "Our team will contact you shortly.",
      })

      // Reset form
      setFormData({
        issueType: "",
        description: "",
        location: {
          latitude: 0,
          longitude: 0,
          address: "",
        },
        name: "",
        phone: "",
        email: "",
      })
    } catch (error) {
      toast({
        title: "Error sending request",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Type of Assistance</label>
        <Select
          onValueChange={(value) => setFormData(prev => ({ ...prev, issueType: value }))}
          value={formData.issueType}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select type of assistance needed" />
          </SelectTrigger>
          <SelectContent>
            {ASSISTANCE_TYPES.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Your Name</label>
        <Input
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Phone Number</label>
        <Input
          type="tel"
          name="phone"
          required
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Location</label>
        <div className="space-y-2">
          <Input
            type="text"
            name="location.address"
            placeholder="Enter your location"
            required
            value={formData.location.address}
            onChange={(e) => setFormData(prev => ({
              ...prev,
              location: { ...prev.location, address: e.target.value }
            }))}
          />
          <Button 
            type="button" 
            variant="outline" 
            onClick={getCurrentLocation}
            className="w-full"
          >
            Get Current Location
          </Button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Description</label>
        <Textarea
          name="description"
          placeholder="Please describe your situation"
          required
          value={formData.description}
          onChange={handleChange}
          className="min-h-[100px]"
        />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Sending Request..." : "Request Assistance"}
      </Button>
    </form>
  )
}