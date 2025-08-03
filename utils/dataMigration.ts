import { collection, getDocs, doc, setDoc, deleteDoc, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

/**
 * Migrate data from carListings collection to vehicleListings collection
 * This function will help consolidate all vehicle data into the correct collection
 */
export const migrateCarListingsToVehicleListing = async () => {
  try {
    console.log("Starting migration from carListings to vehicleListings...")
    
    // Get all documents from carListings
    const carListingsRef = collection(db, "carListings")
    const carListingsSnapshot = await getDocs(carListingsRef)
    
    if (carListingsSnapshot.empty) {
      console.log("No carListings found to migrate")
      return { migrated: 0, message: "No carListings found to migrate" }
    }
    
    let migrated = 0
    
    // Migrate each document
    for (const carDoc of carListingsSnapshot.docs) {
      const carData = carDoc.data()
      
      // Check if this document already exists in vehicleListings
      const vehicleListingRef = collection(db, "vehicleListings")
      const existingQuery = query(vehicleListingRef, where("__migrated_from__", "==", carDoc.id))
      const existingSnapshot = await getDocs(existingQuery)
      
      if (!existingSnapshot.empty) {
        console.log(`Skipping ${carDoc.id} - already migrated`)
        continue
      }
      
      // Transform carListing data to vehicleListings format
      const vehicleData = {
        // Basic info
        title: carData.title || `${carData.year} ${carData.make} ${carData.model}`,
        make: carData.make || "Unknown",
        model: carData.model || "Unknown",
        year: carData.year?.toString() || new Date().getFullYear().toString(),
        price: carData.price?.toString() || "0",
        vehicleType: "Car", // Default type
        description: carData.description || "",
        
        // Details with defaults
        mileage: "0",
        exteriorColor: "Unknown",
        interiorColor: "Unknown",
        transmission: "Manual",
        fuelType: "Gasoline",
        doors: "4",
        
        // Condition and history
        condition: "good",
        ownerHistory: "1",
        accidentHistory: "none",
        
        // Features
        features: {},
        
        // Images
        images: carData.imageUrls || [],
        mainImage: carData.imageUrls?.[0] || null,
        
        // Contact details
        contactName: "Admin",
        contactEmail: "admin@jaba.com",
        location: "Unknown",
        
        // Listing options
        listingDuration: "30",
        featured: false,
        negotiable: true,
        
        // Metadata
        userId: carData.sellerId || "admin",
        userEmail: carData.seller || "admin@jaba.com",
        status: carData.status === "available" ? "active" : (carData.status || "active"),
        listingType: "sale",
        createdAt: carData.createdAt || new Date(),
        updatedAt: new Date(),
        views: 0,
        favorites: 0,
        
        // Migration tracking
        __migrated_from__: carDoc.id,
        __migration_date__: new Date()
      }
      
      // Add to vehicleListings collection with same ID
      const vehicleDocRef = doc(collection(db, "vehicleListings"), carDoc.id)
      await setDoc(vehicleDocRef, vehicleData)
      
      migrated++
      console.log(`Migrated listing: ${vehicleData.title}`)
    }
    
    console.log(`Migration completed! Migrated ${migrated} listings`)
    
    return { 
      migrated, 
      message: `Successfully migrated ${migrated} listings from carListings to vehicleListings` 
    }
    
  } catch (error) {
    console.error("Migration failed:", error)
    throw error
  }
}

/**
 * Clean up old carListings collection after successful migration
 * WARNING: This will permanently delete the carListings collection
 */
export const cleanupOldCarListings = async () => {
  try {
    console.log("Starting cleanup of carListings collection...")
    
    const carListingsRef = collection(db, "carListings")
    const carListingsSnapshot = await getDocs(carListingsRef)
    
    if (carListingsSnapshot.empty) {
      console.log("No carListings found to cleanup")
      return { deleted: 0, message: "No carListings found to cleanup" }
    }
    
    let deleted = 0
    
    for (const carDoc of carListingsSnapshot.docs) {
      await deleteDoc(carDoc.ref)
      deleted++
      console.log(`Deleted carListing: ${carDoc.id}`)
    }
    
    console.log(`Cleanup completed! Deleted ${deleted} old carListings`)
    
    return { 
      deleted, 
      message: `Successfully deleted ${deleted} old carListings` 
    }
    
  } catch (error) {
    console.error("Cleanup failed:", error)
    throw error
  }
}

/**
 * Verify data integrity after migration
 */
export const verifyMigration = async () => {
  try {
    const [carListingsSnapshot, vehicleListingSnapshot] = await Promise.all([
      getDocs(collection(db, "carListings")),
      getDocs(collection(db, "vehicleListings"))
    ])
    
    const carListingsCount = carListingsSnapshot.size
    const vehicleListingCount = vehicleListingSnapshot.size
    
    // Count migrated items
    const migratedQuery = query(
      collection(db, "vehicleListings"), 
      where("__migrated_from__", "!=", null)
    )
    const migratedSnapshot = await getDocs(migratedQuery)
    const migratedCount = migratedSnapshot.size
    
    return {
      carListingsCount,
      vehicleListingCount,
      migratedCount,
      message: `Found ${carListingsCount} carListings, ${vehicleListingCount} vehicleListings (${migratedCount} migrated)`
    }
    
  } catch (error) {
    console.error("Verification failed:", error)
    throw error
  }
}
