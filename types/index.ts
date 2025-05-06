// VehicleListing interface for Firestore data
export interface VehicleListing {
  id: string
  make: string
  model: string
  year: string | number
  price: string | number
  vehicleType: string
  title: string
  description: string
  
  // Details
  mileage: string | number
  vin?: string
  exteriorColor: string
  interiorColor: string
  transmission: string
  engineSize?: string
  fuelType: string
  doors: string | number
  
  // Condition and history
  condition: string
  ownerHistory?: string
  accidentHistory?: string
  serviceHistory?: string
  sellingReason?: string
  
  // Features
  features?: Record<string, boolean>
  
  // Contact details
  contactName: string
  contactEmail: string
  contactPhone?: string
  location?: string
  
  // System fields
  images: string[]
  userId: string
  userEmail: string
  listingType: "sale" | "rental"
  status: "active" | "sold" | "inactive" | "pending"
  views: number
  favorites?: number
  inquiries?: number
  soldDate?: string
  buyerName?: string
  createdAt?: string
  updatedAt?: string
} 