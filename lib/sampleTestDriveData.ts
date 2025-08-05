/**
 * Sample test drive data for development and testing
 * This file contains mock data to test the test drive booking functionality
 */

import { TestDriveBooking } from "@/types/testDrive"

export const sampleTestDriveBookings: TestDriveBooking[] = [
  {
    id: "td_001",
    userId: "user_001",
    userEmail: "john.doe@example.com",
    userName: "John Doe",
    userPhone: "+254712345678",
    vehicleId: "vehicle_001",
    vehicleDetails: {
      make: "Toyota",
      model: "Camry",
      year: "2022",
      image: "/images/toyota-camry.jpg",
      price: "KES 3,500,000"
    },
    preferredDate: new Date("2025-01-15T10:00:00Z"),
    preferredTime: "10:00",
    duration: 60,
    pickupLocation: "Dealership location",
    specialRequests: "Would like to test highway driving capabilities",
    drivingLicense: "DL123456789",
    status: "pending",
    createdAt: new Date("2025-01-10T08:30:00Z"),
    updatedAt: new Date("2025-01-10T08:30:00Z")
  },
  {
    id: "td_002",
    userId: "user_002",
    userEmail: "jane.smith@example.com",
    userName: "Jane Smith",
    userPhone: "+254723456789",
    vehicleId: "vehicle_002",
    vehicleDetails: {
      make: "Honda",
      model: "Civic",
      year: "2023",
      image: "/images/honda-civic.jpg",
      price: "KES 2,800,000"
    },
    preferredDate: new Date("2025-01-16T14:00:00Z"),
    preferredTime: "14:00",
    duration: 90,
    pickupLocation: "Customer location - Westlands",
    specialRequests: "",
    drivingLicense: "DL987654321",
    status: "confirmed",
    createdAt: new Date("2025-01-11T09:15:00Z"),
    updatedAt: new Date("2025-01-11T11:45:00Z"),
    adminNotes: "Customer confirmed via phone call"
  },
  {
    id: "td_003",
    userId: "user_003",
    userEmail: "mike.wilson@example.com",
    userName: "Mike Wilson",
    userPhone: "+254734567890",
    vehicleId: "vehicle_003",
    vehicleDetails: {
      make: "BMW",
      model: "X5",
      year: "2021",
      image: "/images/bmw-x5.jpg",
      price: "KES 8,500,000"
    },
    preferredDate: new Date("2025-01-12T16:00:00Z"),
    preferredTime: "16:00",
    duration: 60,
    pickupLocation: "Dealership location",
    specialRequests: "Interested in off-road capabilities",
    drivingLicense: "DL456789123",
    status: "completed",
    createdAt: new Date("2025-01-08T14:20:00Z"),
    updatedAt: new Date("2025-01-12T17:30:00Z"),
    adminNotes: "Test drive completed successfully. Customer expressed high interest."
  },
  {
    id: "td_004",
    userId: "user_004",
    userEmail: "sarah.johnson@example.com",
    userName: "Sarah Johnson",
    userPhone: "+254745678901",
    vehicleId: "vehicle_004",
    vehicleDetails: {
      make: "Mercedes-Benz",
      model: "C-Class",
      year: "2022",
      image: "/images/mercedes-c-class.jpg",
      price: "KES 6,200,000"
    },
    preferredDate: new Date("2025-01-14T09:00:00Z"),
    preferredTime: "09:00",
    duration: 60,
    pickupLocation: "Dealership location",
    specialRequests: "Need automatic transmission only",
    drivingLicense: "DL789123456",
    status: "cancelled",
    createdAt: new Date("2025-01-09T16:45:00Z"),
    updatedAt: new Date("2025-01-13T10:20:00Z"),
    adminNotes: "Customer cancelled due to budget constraints"
  }
]

export const sampleVehicleData = [
  {
    id: "vehicle_001",
    make: "Toyota",
    model: "Camry",
    year: "2022",
    image: "/images/toyota-camry.jpg",
    price: "KES 3,500,000"
  },
  {
    id: "vehicle_002",
    make: "Honda",
    model: "Civic",
    year: "2023",
    image: "/images/honda-civic.jpg",
    price: "KES 2,800,000"
  },
  {
    id: "vehicle_003",
    make: "BMW",
    model: "X5",
    year: "2021",
    image: "/images/bmw-x5.jpg",
    price: "KES 8,500,000"
  },
  {
    id: "vehicle_004",
    make: "Mercedes-Benz",
    model: "C-Class",
    year: "2022",
    image: "/images/mercedes-c-class.jpg",
    price: "KES 6,200,000"
  }
]

/**
 * Function to generate time slots for a given date
 */
export const generateTimeSlots = () => {
  const slots = []
  for (let hour = 9; hour <= 18; hour++) {
    slots.push({
      time: `${hour.toString().padStart(2, '0')}:00`,
      available: Math.random() > 0.3, // Random availability for demo
      booked: Math.random() < 0.3
    })
  }
  return slots
}

/**
 * Mock function to simulate checking availability
 */
export const mockCheckAvailability = (vehicleId: string, date: Date) => {
  return {
    date: date.toISOString().split('T')[0],
    slots: generateTimeSlots()
  }
}
