// Country flags mapping
export const COUNTRY_FLAGS: Record<string, string> = {
  USA: "🇺🇸",
  Canada: "🇨🇦",
  UK: "🇬🇧",
  Switzerland: "🇨🇭",
  Germany: "🇩🇪",
  Singapore: "🇸🇬",
  Australia: "🇦🇺",
  "South Korea": "🇰🇷",
} as const;

// Default flag for unknown countries
export const DEFAULT_FLAG = "🌍";

// Funding type colors
export const FUNDING_COLORS = {
  "Fully Funded": "bg-emerald-100 text-emerald-800",
  "Limited Funding": "bg-amber-100 text-amber-800",
  "Self-Funded": "bg-rose-100 text-rose-800",
  Mixed: "bg-blue-100 text-blue-800",
} as const;

// Available countries for filtering
export const AVAILABLE_COUNTRIES = [
  "USA",
  "Canada",
  "UK",
  "Switzerland",
  "Germany",
  "Singapore",
  "Australia",
  "South Korea",
] as const;

// Available funding types
export const FUNDING_TYPES = [
  "Fully Funded",
  "Limited Funding",
  "Self-Funded",
  "Mixed",
] as const;

// Available priorities
export const PRIORITIES = ["High", "Medium", "Low"] as const;

/**
 * Get country flag by country name
 */
export function getCountryFlag(country: string): string {
  return COUNTRY_FLAGS[country] || DEFAULT_FLAG;
}
