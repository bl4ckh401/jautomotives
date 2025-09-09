"use client"

import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { useMarketplace } from "@/contexts/MarketplaceContext"
import type { VehicleListing } from "@/contexts/MarketplaceContext"
import { ScrollArea } from "@/components/ui/scroll-area"

// Vehicle makes for dropdown
const vehicleMakes = [
  "Audi", "BMW", "Chevrolet", "Dodge", "Ford", "Honda", "Hyundai", 
  "Jeep", "Kia", "Lexus", "Mazda", "Mercedes-Benz", "Nissan", 
  "Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo"
]

// Vehicle types for dropdown
const vehicleTypes = [
  "Sedan", "SUV", "Truck", "Coupe", "Convertible", "Wagon", 
  "Van/Minivan", "Hatchback", "Crossover", ""
]

// Vehicle transmission options
const transmissionTypes = ["Automatic", "Manual", "Semi-automatic", "CVT"]

// Fuel types
const fuelTypes = ["Gasoline", "Diesel", "Electric", "Hybrid", "Plug-in Hybrid", "Hydrogen"]

// Available vehicle features
const featureGroups = {
  exterior: [
    "Sunroof/Moonroof", "Panoramic Roof", "Alloy Wheels", "Roof Rack", 
    "Running Boards", "Towing Package", "LED Headlights", "Fog Lights"
  ],
  interior: [
    "Leather Seats", "Heated Seats", "Ventilated Seats", "Memory Seats", 
    "Power Seats", "Rear Seat Entertainment", "Ambient Lighting", "Premium Audio"
  ],
  safety: [
    "Airbags", "Anti-lock Braking", "Stability Control", "Blind Spot Monitoring",
    "Lane Departure Warning", "Forward Collision Warning", "Automatic Emergency Braking",
    "Rear Cross Traffic Alert", "360-Degree Camera", "Parking Sensors"
  ],
  technology: [
    "Bluetooth", "Apple CarPlay", "Android Auto", "Navigation System",
    "WiFi Hotspot", "Wireless Charging", "Digital Instrument Cluster",
    "Heads-Up Display", "Remote Start", "Keyless Entry"
  ]
}

interface EditVehicleModalProps {
  isOpen: boolean
  onClose: () => void
  vehicleId: string | null
  onSuccess?: () => void
}

export function EditVehicleModal({ isOpen, onClose, vehicleId, onSuccess }: EditVehicleModalProps) {
  const { toast } = useToast()
  const { getListing, updateListing, loading: isSubmitting } = useMarketplace()
  const [activeTab, setActiveTab] = useState("basic")
  const [isLoading, setIsLoading] = useState(false)
  const [initialLoad, setInitialLoad] = useState(true)
  
  // Form state
  const [formData, setFormData] = useState({
    // Basic info
    make: "",
    model: "",
    year: "",
    price: "",
    vehicleType: "",
    title: "",
    description: "",
    
    // Details
    mileage: "",
    vin: "",
    exteriorColor: "",
    interiorColor: "",
    transmission: "",
    engineSize: "",
    fuelType: "",
    doors: "",
    
    // Condition and history
    condition: "good" as any,
    ownerHistory: "",
    accidentHistory: "",
    serviceHistory: "",
    sellingReason: "",
    
    // Features
    features: {} as Record<string, boolean>,
    
    // Contact details
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    location: "",
    
    // Listing options
    listingDuration: "",
    featured: false,
    negotiable: true,
    
    // Status
    status: "active" as any
  })

  // Load vehicle data when modal opens
  useEffect(() => {
    if (isOpen && vehicleId && initialLoad) {
      loadVehicleData()
    } else if (!isOpen) {
      setInitialLoad(true)
      setActiveTab("basic")
    }
  }, [isOpen, vehicleId])

  // Initialize features as all unchecked initially
  useEffect(() => {
    if (initialLoad) {
      const initialFeatures = {} as Record<string, boolean>
      
      Object.values(featureGroups).forEach(group => {
        group.forEach(feature => {
          initialFeatures[feature] = false
        })
      })
      
      setFormData(prev => ({
        ...prev,
        features: initialFeatures
      }))
    }
  }, [initialLoad])

  const loadVehicleData = async () => {
    if (!vehicleId) return
    
    setIsLoading(true)
    try {
      const vehicle = await getListing(vehicleId)
      
      setFormData({
        make: vehicle.make || "",
        model: vehicle.model || "",
        year: vehicle.year?.toString() || "",
        price: vehicle.price?.toString() || "",
        vehicleType: vehicle.vehicleType || "",
        title: vehicle.title || "",
        description: vehicle.description || "",
        mileage: vehicle.mileage?.toString() || "",
        vin: vehicle.vin || "",
        exteriorColor: vehicle.exteriorColor || "",
        interiorColor: vehicle.interiorColor || "",
        transmission: vehicle.transmission || "",
        engineSize: vehicle.engineSize || "",
        fuelType: vehicle.fuelType || "",
        doors: vehicle.doors?.toString() || "",
        condition: vehicle.condition || "good",
        ownerHistory: vehicle.ownerHistory || "",
        accidentHistory: vehicle.accidentHistory || "",
        serviceHistory: vehicle.serviceHistory || "",
        sellingReason: vehicle.sellingReason || "",
        features: vehicle.features || {},
        contactName: vehicle.contactName || "",
        contactEmail: vehicle.contactEmail || "",
        contactPhone: vehicle.contactPhone || "",
        location: vehicle.location || "",
        listingDuration: vehicle.listingDuration || "",
        featured: vehicle.featured || false,
        negotiable: vehicle.negotiable !== undefined ? vehicle.negotiable : true,
        status: vehicle.status || "active"
      })
      
      setInitialLoad(false)
    } catch (error: any) {
      console.error("Error loading vehicle data:", error)
      toast({
        title: "Error loading vehicle",
        description: error.message || "Failed to load vehicle data",
        variant: "destructive"
      })
      onClose()
    } finally {
      setIsLoading(false)
    }
  }
  
  // Handle text inputs
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle select inputs
  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }
  
  // Handle checkbox changes for features
  const handleFeatureChange = (feature: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: checked
      }
    }))
  }
  
  // Handle checkbox for other boolean options
  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }))
  }
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!vehicleId) return
    
    try {
      setIsLoading(true)
      
      const updateData = {
        // Basic info
        make: formData.make,
        model: formData.model,
        year: formData.year,
        price: formData.price,
        vehicleType: formData.vehicleType,
        title: formData.title,
        description: formData.description,
        
        // Details
        mileage: formData.mileage,
        vin: formData.vin,
        exteriorColor: formData.exteriorColor,
        interiorColor: formData.interiorColor,
        transmission: formData.transmission,
        engineSize: formData.engineSize,
        fuelType: formData.fuelType,
        doors: formData.doors,
        
        // Condition and history
        condition: formData.condition,
        ownerHistory: formData.ownerHistory,
        accidentHistory: formData.accidentHistory,
        serviceHistory: formData.serviceHistory,
        sellingReason: formData.sellingReason,
        
        // Features
        features: formData.features,
        
        // Contact details
        contactName: formData.contactName,
        contactEmail: formData.contactEmail,
        contactPhone: formData.contactPhone,
        location: formData.location,
        
        // Listing options
        listingDuration: formData.listingDuration,
        featured: formData.featured,
        negotiable: formData.negotiable,
        
        // Status
        status: formData.status
      }
      
      await updateListing(vehicleId, updateData)
      
      toast({
        title: "Vehicle updated",
        description: "The vehicle listing has been updated successfully.",
      })
      
      onSuccess?.()
      onClose()
      
    } catch (error: any) {
      console.error("Error updating vehicle:", error)
      toast({
        title: "Error updating vehicle",
        description: error.message || "There was a problem updating the vehicle listing.",
        variant: "destructive"
      })
    } finally {
      setIsLoading(false)
    }
  }
  
  const nextTab = () => {
    if (activeTab === "basic") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("features")
    else if (activeTab === "features") setActiveTab("contact")
  }
  
  const prevTab = () => {
    if (activeTab === "contact") setActiveTab("features")
    else if (activeTab === "features") setActiveTab("details")
    else if (activeTab === "details") setActiveTab("basic")
  }

  if (isLoading && initialLoad) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl max-h-[90vh]">
          <div className="flex items-center justify-center py-8">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p>Loading vehicle data...</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    )
  }
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Edit Vehicle Listing</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="max-h-[80vh] px-6 pb-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="basic" disabled={isLoading}>Basic Info</TabsTrigger>
              <TabsTrigger value="details" disabled={isLoading}>Details</TabsTrigger>
              <TabsTrigger value="features" disabled={isLoading}>Features</TabsTrigger>
              <TabsTrigger value="contact" disabled={isLoading}>Contact & Status</TabsTrigger>
            </TabsList>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information Tab */}
              <TabsContent value="basic" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="make">Make*</Label>
                    <Select
                      value={formData.make}
                      onValueChange={(value) => handleSelectChange("make", value)}
                      required
                    >
                      <SelectTrigger id="make">
                        <SelectValue placeholder="Select make" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleMakes.map((make) => (
                          <SelectItem key={make} value={make}>{make}</SelectItem>
                        ))}
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="model">Model*</Label>
                    <Input 
                      id="model" 
                      name="model" 
                      value={formData.model} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div>
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
                  
                  <div>
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
                  
                  <div>
                    <Label htmlFor="vehicleType">Vehicle Type*</Label>
                    <Select
                      value={formData.vehicleType}
                      onValueChange={(value) => handleSelectChange("vehicleType", value)}
                      required
                    >
                      <SelectTrigger id="vehicleType">
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {vehicleTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="title">Listing Title*</Label>
                    <Input 
                      id="title" 
                      name="title" 
                      value={formData.title} 
                      onChange={handleInputChange}
                      placeholder="e.g. 2021 BMW X5 xDrive - Excellent Condition"
                      required 
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="description">Description*</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Describe your vehicle in detail..."
                    className="min-h-24"
                    required
                  />
                </div>
                
                <div className="flex justify-end">
                  <Button type="button" onClick={nextTab}>
                    Next: Vehicle Details
                  </Button>
                </div>
              </TabsContent>
              
              {/* Vehicle Details Tab */}
              <TabsContent value="details" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="mileage">Mileage*</Label>
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
                  
                  <div>
                    <Label htmlFor="vin">VIN</Label>
                    <Input 
                      id="vin" 
                      name="vin" 
                      value={formData.vin} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="exteriorColor">Exterior Color*</Label>
                    <Input 
                      id="exteriorColor" 
                      name="exteriorColor" 
                      value={formData.exteriorColor} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="interiorColor">Interior Color*</Label>
                    <Input 
                      id="interiorColor" 
                      name="interiorColor" 
                      value={formData.interiorColor} 
                      onChange={handleInputChange} 
                      required 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="transmission">Transmission*</Label>
                    <Select
                      value={formData.transmission}
                      onValueChange={(value) => handleSelectChange("transmission", value)}
                      required
                    >
                      <SelectTrigger id="transmission">
                        <SelectValue placeholder="Select transmission" />
                      </SelectTrigger>
                      <SelectContent>
                        {transmissionTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="fuelType">Fuel Type*</Label>
                    <Select
                      value={formData.fuelType}
                      onValueChange={(value) => handleSelectChange("fuelType", value)}
                      required
                    >
                      <SelectTrigger id="fuelType">
                        <SelectValue placeholder="Select fuel type" />
                      </SelectTrigger>
                      <SelectContent>
                        {fuelTypes.map((type) => (
                          <SelectItem key={type} value={type}>{type}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="engineSize">Engine Size/Power</Label>
                    <Input 
                      id="engineSize" 
                      name="engineSize" 
                      placeholder="e.g. 2.0L Turbo, 300hp" 
                      value={formData.engineSize} 
                      onChange={handleInputChange} 
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="doors">Number of Doors*</Label>
                    <Select
                      value={formData.doors}
                      onValueChange={(value) => handleSelectChange("doors", value)}
                      required
                    >
                      <SelectTrigger id="doors">
                        <SelectValue placeholder="Select doors" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Vehicle History</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <Label>Condition*</Label>
                      <RadioGroup 
                        value={formData.condition} 
                        onValueChange={(value) => handleSelectChange("condition", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="excellent" id="condition-excellent" />
                          <Label htmlFor="condition-excellent">Excellent</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="good" id="condition-good" />
                          <Label htmlFor="condition-good">Good</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fair" id="condition-fair" />
                          <Label htmlFor="condition-fair">Fair</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="poor" id="condition-poor" />
                          <Label htmlFor="condition-poor">Poor</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label>Previous Owners*</Label>
                      <RadioGroup 
                        value={formData.ownerHistory} 
                        onValueChange={(value) => handleSelectChange("ownerHistory", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="0" id="owner-0" />
                          <Label htmlFor="owner-0">0 (New)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="1" id="owner-1" />
                          <Label htmlFor="owner-1">1</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="2" id="owner-2" />
                          <Label htmlFor="owner-2">2</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="3+" id="owner-3plus" />
                          <Label htmlFor="owner-3plus">3+</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div>
                      <Label>Accident History*</Label>
                      <RadioGroup 
                        value={formData.accidentHistory} 
                        onValueChange={(value) => handleSelectChange("accidentHistory", value)}
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="none" id="accident-none" />
                          <Label htmlFor="accident-none">No Accidents</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="minor" id="accident-minor" />
                          <Label htmlFor="accident-minor">Minor</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="major" id="accident-major" />
                          <Label htmlFor="accident-major">Major</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="serviceHistory">Service History</Label>
                    <Textarea
                      id="serviceHistory"
                      name="serviceHistory"
                      value={formData.serviceHistory}
                      onChange={handleInputChange}
                      placeholder="Describe the vehicle's service history..."
                      className="min-h-20"
                    />
                  </div>
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Back: Basic Info
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Next: Features
                  </Button>
                </div>
              </TabsContent>
              
              {/* Features Tab */}
              <TabsContent value="features" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Vehicle Features</h3>
                  
                  {Object.entries(featureGroups).map(([groupName, features]) => (
                    <Card key={groupName}>
                      <CardContent className="pt-4">
                        <h4 className="text-base font-medium capitalize mb-3">{groupName} Features</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {features.map((feature) => (
                            <div key={feature} className="flex items-center space-x-2">
                              <Checkbox 
                                id={`feature-${feature.replace(/\s+/g, '-').toLowerCase()}`}
                                checked={formData.features[feature] || false}
                                onCheckedChange={(checked) => 
                                  handleFeatureChange(feature, checked === true)
                                }
                              />
                              <Label 
                                htmlFor={`feature-${feature.replace(/\s+/g, '-').toLowerCase()}`}
                                className="text-sm"
                              >
                                {feature}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Back: Vehicle Details
                  </Button>
                  <Button type="button" onClick={nextTab}>
                    Next: Contact & Status
                  </Button>
                </div>
              </TabsContent>
              
              {/* Contact & Status Tab */}
              <TabsContent value="contact" className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="contactName">Contact Name*</Label>
                      <Input 
                        id="contactName" 
                        name="contactName" 
                        value={formData.contactName} 
                        onChange={handleInputChange} 
                        required 
                      />
                    </div>
                    
                    <div>
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
                    
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input 
                        id="contactPhone" 
                        name="contactPhone" 
                        value={formData.contactPhone} 
                        onChange={handleInputChange} 
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="location">Vehicle Location*</Label>
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
                
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Listing Status & Options</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="status">Listing Status*</Label>
                      <Select
                        value={formData.status}
                        onValueChange={(value) => handleSelectChange("status", value)}
                        required
                      >
                        <SelectTrigger id="status">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="pending">Pending</SelectItem>
                          <SelectItem value="sold">Sold</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="listingDuration">Listing Duration (days)</Label>
                      <Select
                        value={formData.listingDuration}
                        onValueChange={(value) => handleSelectChange("listingDuration", value)}
                      >
                        <SelectTrigger id="listingDuration">
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="7">7 days</SelectItem>
                          <SelectItem value="14">14 days</SelectItem>
                          <SelectItem value="30">30 days</SelectItem>
                          <SelectItem value="60">60 days</SelectItem>
                          <SelectItem value="90">90 days</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex gap-6">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="featured"
                        checked={formData.featured}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("featured", checked === true)
                        }
                      />
                      <Label htmlFor="featured">Featured Listing</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="negotiable"
                        checked={formData.negotiable}
                        onCheckedChange={(checked) => 
                          handleCheckboxChange("negotiable", checked === true)
                        }
                      />
                      <Label htmlFor="negotiable">Price is Negotiable</Label>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={prevTab}>
                    Back: Features
                  </Button>
                  <div className="flex gap-2">
                    <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isLoading} className="min-w-32">
                      {isLoading ? "Updating..." : "Update Vehicle"}
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </form>
          </Tabs>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}
