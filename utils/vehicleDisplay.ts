/**
 * Utility functions for displaying vehicle information
 */

/**
 * Formats vehicle title, hiding make when it's "Other"
 */
export function formatVehicleTitle(year: string | number, make: string, model: string): string {
  const makeText = make?.toLowerCase() === 'other' ? '' : make;
  const parts = [year, makeText, model].filter(Boolean);
  return parts.join(' ').trim();
}

/**
 * Formats make and model, hiding make when it's "Other"
 */
export function formatMakeModel(make: string, model: string): string {
  const makeText = make?.toLowerCase() === 'other' ? '' : make;
  const parts = [makeText, model].filter(Boolean);
  return parts.join(' ').trim();
}

/**
 * Gets display text for make, returns empty string if "Other"
 */
export function getDisplayMake(make: string): string {
  return make?.toLowerCase() === 'other' ? '' : make;
}

/**
 * Formats alt text for images, handling "Other" make
 */
export function formatVehicleAlt(year: string | number, make: string, model: string): string {
  return formatVehicleTitle(year, make, model) || 'Vehicle image';
}

/**
 * Formats phone number to include Kenyan country code (+254)
 * Converts numbers starting with 0 to +254 format
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // If number starts with 254, add + prefix
  if (cleanPhone.startsWith('254')) {
    return `+${cleanPhone}`;
  }
  
  // If number starts with 0, replace with +254
  if (cleanPhone.startsWith('0')) {
    return `+254${cleanPhone.slice(1)}`;
  }
  
  // If number doesn't start with 254 or 0, assume it's a local number and add +254
  if (cleanPhone.length >= 9) {
    return `+254${cleanPhone}`;
  }
  
  // Return original if too short or doesn't match expected patterns
  return phone;
}
