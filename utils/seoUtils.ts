import { VehicleListing } from "@/contexts/MarketplaceContext"

/**
 * Generate SEO-friendly slug from vehicle data
 */
export function generateVehicleSlug(vehicle: VehicleListing): string {
  const parts = [
    vehicle.year,
    vehicle.make,
    vehicle.model,
    vehicle.condition?.toLowerCase().replace(/\s+/g, '-'),
    vehicle.location?.toLowerCase().replace(/\s+/g, '-')
  ].filter(Boolean)

  return parts.join('-').toLowerCase().replace(/[^a-z0-9-]/g, '').replace(/-+/g, '-')
}

/**
 * Generate comprehensive meta description for vehicle
 */
export function generateVehicleMetaDescription(vehicle: VehicleListing): string {
  const price = formatPriceForSEO(vehicle.price, vehicle.directImport)
  const features = getTopFeatures(vehicle.features, 3)
  
  let description = `${vehicle.year} ${vehicle.make} ${vehicle.model} for sale`
  
  if (vehicle.condition) {
    description += ` - ${vehicle.condition} condition`
  }
  
  if (price) {
    description += `. Price: ${price}`
  }
  
  if (vehicle.mileage) {
    description += `. Mileage: ${vehicle.mileage} km`
  }
  
  if (features.length > 0) {
    description += `. Features: ${features.join(', ')}`
  }
  
  if (vehicle.location) {
    description += `. Located in ${vehicle.location}`
  }
  
  description += '. Contact JABA Automobiles for more details.'
  
  // Ensure description is within optimal length (150-160 characters)
  if (description.length > 160) {
    description = description.substring(0, 157) + '...'
  }
  
  return description
}

/**
 * Generate SEO-friendly title for vehicle
 */
export function generateVehicleTitle(vehicle: VehicleListing): string {
  const parts = [
    vehicle.year,
    vehicle.make,
    vehicle.model
  ].filter(Boolean)
  
  let title = parts.join(' ')
  
  if (vehicle.condition) {
    title += ` - ${vehicle.condition}`
  }
  
  title += ' | JABA Automobiles'
  
  // Ensure title is within optimal length (50-60 characters)
  if (title.length > 60) {
    // Try without condition
    const shortTitle = parts.join(' ') + ' | JABA Automobiles'
    if (shortTitle.length <= 60) {
      return shortTitle
    }
    // Truncate if still too long
    return shortTitle.substring(0, 57) + '...'
  }
  
  return title
}

/**
 * Generate keywords for vehicle SEO
 */
export function generateVehicleKeywords(vehicle: VehicleListing): string[] {
  const keywords = [
    // Basic vehicle info
    vehicle.make,
    vehicle.model,
    vehicle.year,
    `${vehicle.year} ${vehicle.make}`,
    `${vehicle.year} ${vehicle.model}`,
    `${vehicle.make} ${vehicle.model}`,
    `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
    
    // Vehicle type and category
    vehicle.vehicleType,
    `${vehicle.vehicleType} for sale`,
    
    // Condition
    vehicle.condition,
    `${vehicle.condition} ${vehicle.vehicleType}`,
    
    // Technical specs
    vehicle.fuelType,
    vehicle.transmission,
    `${vehicle.fuelType} ${vehicle.vehicleType}`,
    `${vehicle.transmission} ${vehicle.vehicleType}`,
    
    // Location
    vehicle.location,
    `cars in ${vehicle.location}`,
    `${vehicle.vehicleType} in ${vehicle.location}`,
    
    // General terms
    'car for sale',
    'vehicle marketplace',
    'buy car',
    'JABA Automobiles',
    
    // Features (top 5)
    ...getTopFeatures(vehicle.features, 5),
    
    // Import type
    ...(vehicle.directImport ? ['direct import', 'imported car'] : []),
    ...(vehicle.secondHand ? ['second hand', 'used car'] : []),
  ].filter(Boolean)
  
  // Remove duplicates and return
  return [...new Set(keywords)]
}

/**
 * Format price for SEO display
 */
function formatPriceForSEO(price: number | string | undefined, isDirectImport?: boolean): string {
  if (!price) return ''
  
  if (isDirectImport) {
    if (typeof price === "string") {
      const p = price.trim()
      if (p.startsWith("$")) return p
      const n = parseFloat(p.replace(/[^0-9.-]+/g, ""))
      if (!isNaN(n)) {
        return `$${n.toLocaleString()}`
      }
      return p
    }
    if (typeof price === "number") {
      return `$${price.toLocaleString()}`
    }
  }

  const numeric = typeof price === "number" ? price : parseFloat(String(price).replace(/[^0-9.-]+/g, ""))
  if (isNaN(numeric)) return String(price)
  return `KES ${numeric.toLocaleString()}`
}

/**
 * Get top features for SEO
 */
function getTopFeatures(features: Record<string, boolean> | undefined, limit: number): string[] {
  if (!features) return []
  
  const activeFeatures = Object.entries(features)
    .filter(([_, value]) => value === true)
    .map(([name]) => name)
    .slice(0, limit)
  
  return activeFeatures
}

/**
 * Generate canonical URL for vehicle
 */
export function generateVehicleCanonicalUrl(vehicleId: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jabaautomotives.com'
  return `${siteUrl}/vehicles/${vehicleId}`
}

/**
 * Generate Open Graph image URL for vehicle
 */
export function generateVehicleOGImage(vehicle: VehicleListing): string {
  // Use first vehicle image if available, otherwise fallback to default
  if (vehicle.images && vehicle.images.length > 0) {
    return vehicle.images[0]
  }
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://jabaautomotives.com'
  return `${siteUrl}/placeholder-car.jpg`
}

/**
 * Check if vehicle should be indexed by search engines
 */
export function shouldIndexVehicle(vehicle: VehicleListing): boolean {
  // Always index active vehicles - be more permissive for SEO
  return vehicle.status === 'active'
}