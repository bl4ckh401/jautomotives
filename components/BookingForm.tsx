"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

export default function BookingForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    date: "",
    time: "",
    details: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    toast({
      title: "Booking submitted successfully",
      description: "We will contact you shortly to confirm your booking.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="service">Service</Label>
        <Select onValueChange={(value) => handleSelectChange("service", value)}>
          <SelectTrigger>
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="wedding">Wedding Car Rental</SelectItem>
            <SelectItem value="corporate">Corporate Car Rental</SelectItem>
            <SelectItem value="airport">Airport Transfer</SelectItem>
            <SelectItem value="self-drive">Self-Drive Car Hire</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="date">Date</Label>
        <Input id="date" name="date" type="date" value={formData.date} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="time">Time</Label>
        <Input id="time" name="time" type="time" value={formData.time} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="details">Additional Details</Label>
        <Textarea id="details" name="details" value={formData.details} onChange={handleInputChange} />
      </div>
      <Button type="submit" className="w-full">
        Submit Booking
      </Button>
    </form>
  )
}

