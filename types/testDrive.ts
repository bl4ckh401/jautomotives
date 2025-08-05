export interface TestDriveBooking {
  id?: string
  userId: string
  userEmail: string
  userName: string
  userPhone: string
  vehicleId: string
  vehicleDetails: {
    make: string
    model: string
    year: string | number
    image: string
    price: string | number
  }
  preferredDate: Date
  preferredTime: string
  duration: number // in minutes, typically 30, 60, or 90
  pickupLocation?: string
  specialRequests?: string
  drivingLicense: string
  status: "pending" | "confirmed" | "completed" | "cancelled"
  createdAt?: any
  updatedAt?: any
  adminNotes?: string
}

export interface TestDriveTimeSlot {
  time: string
  available: boolean
  booked?: boolean
}

export interface TestDriveAvailability {
  date: string
  slots: TestDriveTimeSlot[]
}
