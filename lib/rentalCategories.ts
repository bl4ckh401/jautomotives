export const RENTAL_CATEGORIES = [
  "wedding",
  "office",
  "chauffeur",
  "vip",
  "corporate",
  "long-term",
  "airport",
  "self-drive",
  "event",
] as const

export type RentalCategory = typeof RENTAL_CATEGORIES[number]

export function formatRentalCategory(cat: RentalCategory) {
  return cat.replace(/-/g, " ").replace(/\b\w/g, (x) => x.toUpperCase())
}
