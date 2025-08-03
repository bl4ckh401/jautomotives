"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import { useAuth } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Motorbike brands
const motorbikeBrands = [
  "BMW", "Ducati", "Harley-Davidson", "Honda", "Kawasaki", "KTM", 
  "Suzuki", "Triumph", "Yamaha", "Royal Enfield", "Aprilia", "Benelli",
  "Husqvarna", "Indian", "Moto Guzzi", "MV Agusta", "Piaggio", "Vespa"
]

// Engine sizes
const engineSizes = [
  "Under 125cc", "125cc-250cc", "251cc-500cc", "501cc-750cc", 
  "751cc-1000cc", "1001cc-1250cc", "Over 1250cc"
]

// Motorbike types
const motorbikeTypes = [
  "Sport", "Cruiser", "Touring", "Adventure", "Naked", "Off-Road", 
  "Scooter", "Chopper", "Cafe Racer", "Dirt Bike", "Dual Sport", "Standard"
]

export default function UploadMotorbikePage() {
  const { toast } = useToast()
  const router = useRouter()
  const { user } = useAuth()
  const { createListing } = useMarketplace()
  const [isLoading, setIsLoading] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    make: "",
    model: "",
    year: new Date().getFullYear().toString(),
    price: "",
    mileage: "",
    engineSize: "",
    condition: "Used",
    description: "",
    title: "",
    images: [] as File[],
    contactName: user?.name || "",
    contactEmail: user?.email || "",
    contactPhone: "",
    location: "",
    motorbikeType: "Sport"
  })
  
  // Handle text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle select inputs
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle file uploads
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files)
      setFormData(prev => ({ 
        ...prev, 
        images: [...prev.images, ...fileArray].slice(0, 10) // Limit to 10 images
      }))
    }
  }
  
  // Remove an image from the selection
  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }))
  }
  
  // Form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to list a motorbike",
        variant: "destructive"
      })
      return
    }
    
    try {
      setIsLoading(true)
      
      const listingData = {
        // Basic info
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        vehicleType: "Motorbike", // This marks it as a motorbike
        title: formData.title || `${formData.year} ${formData.make} ${formData.model}`,
        description: formData.description,
        
        // Details
        mileage: formData.mileage,
        engineSize: formData.engineSize,
        condition: formData.condition as any,
        motorbikeType: formData.motorbikeType,
        
        // Contact details
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        location: formData.location,
        
        // Required properties to satisfy the type
        images: [] as string[],
        userId: user?.id || "",
        userEmail: user?.email || "",
        listingType: "sale" as const,
        
        // Defaults
        transmission: "Manual",
        fuelType: "Gasoline",
        doors: "0",
      }
      
      // Use the marketplace context to create the listing
      const listingId = await createListing(listingData, formData.images)
      
      toast({
        title: "Motorbike listed successfully",
        description: "Your motorbike has been added to the marketplace."
      })
      
      // Redirect to the listing page
      router.push(`/marketplace/${listingId}`)
      
    } catch (error: any) {
      console.error("Error creating listing:", error)
      toast({
        title: "Error listing motorbike",
        description: "There was a problem creating your listing. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  return (
    <div className="container mx-auto px-4 py-16 pt-24">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Sell Your Motorbike</h1>
        
        <Card>
          <CardHeader>
            <CardTitle>Motorbike Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Info Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Basic Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="make">Brand/Make*</Label>
                    <Select
                      value={formData.make}
                      onValueChange={(value) => handleSelectChange("make", value)}
                      required
                    >
                      <SelectTrigger id="make">
                        <SelectValue placeholder="Select brand" />
                      </SelectTrigger>
                      <SelectContent>
                        {motorbikeBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>{brand}</SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="model">Model*</Label>
                    <Input 
                      id="model" 
                      name="model" 
                      value={formData.model} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="motorbikeType">Motorbike Type*</Label>
                    <Select
                      value={formData.motorbikeType}
                      onValueChange={(value) => handleSelectChange("motorbikeType", value)}
                      required
                    >
                      <SelectTrigger id="motorbikeType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {motorbikeTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="year">Year*</Label>
                    <Input 
                      id="year" 
                      name="year" 
                      type="number" 
                      min="1900"
                      max={new Date().getFullYear() + 1}
                      value={formData.year} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price (USD)*</Label>
                    <Input 
                      id="price" 
                      name="price" 
                      type="number"
                      min="0"
                      step="1"
                      value={formData.price} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="engineSize">Engine Size*</Label>
                    <Select
                      value={formData.engineSize}
                      onValueChange={(value) => handleSelectChange("engineSize", value)}
                      required
                    >
                      <SelectTrigger id="engineSize">
                        <SelectValue placeholder="Select engine size" />
                      </SelectTrigger>
                      <SelectContent>
                        {engineSizes.map((size) => (
                          <SelectItem key={size} value={size}>{size}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition*</Label>
                  <RadioGroup 
                    value={formData.condition} 
                    onValueChange={(value) => handleSelectChange("condition", value)}
                    className="flex space-x-4"
                    required
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="New" id="condition-new" />
                      <Label htmlFor="condition-new">New</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Used" id="condition-used" />
                      <Label htmlFor="condition-used">Used</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Certified Pre-Owned" id="condition-cpo" />
                      <Label htmlFor="condition-cpo">Certified Pre-Owned</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="mileage">Mileage (km)*</Label>
                  <Input 
                    id="mileage" 
                    name="mileage" 
                    type="number"
                    min="0"
                    value={formData.mileage} 
                    onChange={handleInputChange} 
                    required 
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="title">Listing Title</Label>
                  <Input 
                    id="title" 
                    name="title" 
                    value={formData.title} 
                    onChange={handleInputChange}
                    placeholder="e.g. 2021 Honda CBR650R - Perfect Condition"
                  />
                  <p className="text-sm text-muted-foreground">
                    Leave blank to auto-generate from make, model and year
                  </p>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your motorbike in detail, including its condition, features, modifications, and any other information a buyer would want to know."
                    className="min-h-32"
                    required
                  />
                </div>
              </div>
              
              {/* Images Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Images</h2>
                <p className="text-sm text-muted-foreground">
                  Upload high-quality images of your motorbike (up to 10 images).
                </p>
                
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-700 p-6 rounded-lg text-center">
                  <Input 
                    id="images" 
                    type="file" 
                    multiple 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <Label 
                    htmlFor="images" 
                    className="cursor-pointer flex flex-col items-center justify-center"
                  >
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6 text-primary">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </div>
                    <span className="text-primary font-medium">Click to browse files</span>
                    <span className="text-sm text-muted-foreground mt-1">
                      or drag and drop images here
                    </span>
                  </Label>
                </div>
                
                {/* Image preview */}
                {formData.images.length > 0 && (
                  <div>
                    <h4 className="text-base font-medium mb-3">Selected Images ({formData.images.length}/10)</h4>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.images.map((file, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Motorbike preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-md"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-black/70 text-primary p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-0 left-0 right-0 bg-primary text-primary-foreground text-xs py-1 text-center">
                              Main Image
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Contact Details Section */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Contact Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contactName">Contact Name*</Label>
                    <Input 
                      id="contactName" 
                      name="contactName" 
                      value={formData.contactName} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactEmail">Contact Email*</Label>
                    <Input 
                      id="contactEmail" 
                      name="contactEmail"
                      type="email" 
                      value={formData.contactEmail} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input 
                      id="contactPhone" 
                      name="contactPhone" 
                      value={formData.contactPhone} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location">Motorbike Location*</Label>
                    <Input 
                      id="location" 
                      name="location"
                      placeholder="City, State/Province" 
                      value={formData.location} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                </div>
              </div>
              
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Submitting..." : "List Motorbike"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 