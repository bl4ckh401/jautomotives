"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"

export default function SellForm() {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: "",
    price: "",
    description: "",
    images: null,
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, images: e.target.files }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log(formData)
    toast({
      title: "Vehicle listed successfully",
      description: "Your  vehicle has been added to the marketplace.",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
      <div>
        <Label htmlFor="make">Make</Label>
        <Input id="make" name="make" value={formData.make} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="model">Model</Label>
        <Input id="model" name="model" value={formData.model} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="year">Year</Label>
        <Input id="year" name="year" type="number" value={formData.year} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="price">Price (USD)</Label>
        <Input id="price" name="price" type="number" value={formData.price} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="images">Images</Label>
        <Input id="images" name="images" type="file" multiple onChange={handleFileChange} accept="image/*" required />
      </div>
      <Button type="submit" className="w-full">
        List Vehicle
      </Button>
    </form>
  )
}

