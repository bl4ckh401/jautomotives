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
