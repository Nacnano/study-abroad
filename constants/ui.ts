// Country code mapping for flag CDN (supports both short and full country names)
export const COUNTRY_CODES: Record<string, string> = {
  // Short names (used in university data)
  USA: "us",
  Canada: "ca",
  UK: "gb",
  Switzerland: "ch",
  Germany: "de",
  Singapore: "sg",
  Australia: "au",
  "South Korea": "kr",
  Netherlands: "nl",
  France: "fr",
  Japan: "jp",
  China: "cn",
  "Hong Kong": "hk",
  "New Zealand": "nz",
  Thailand: "th",
  // Full names (used in countryInfo)
  "United States": "us",
  "United Kingdom": "gb",
} as const;

// Legacy: Country flags emoji mapping (deprecated, use getFlagUrl instead)
export const COUNTRY_FLAGS: Record<string, string> = {
  // Short names (used in university data)
  USA: "🇺🇸",
  Canada: "🇨🇦",
  UK: "🇬🇧",
  Switzerland: "🇨🇭",
  Germany: "🇩🇪",
  Singapore: "🇸🇬",
  Australia: "🇦🇺",
  "South Korea": "🇰🇷",
  // Full names (used in countryInfo)
  "United States": "🇺🇸",
  "United Kingdom": "🇬🇧",
} as const;

// Default flag for unknown countries
export const DEFAULT_FLAG = "🌍";
export const DEFAULT_COUNTRY_CODE = "un"; // United Nations flag as fallback

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
 * Get country code for flag CDN
 */
export function getCountryCode(country: string): string {
  return COUNTRY_CODES[country] || DEFAULT_COUNTRY_CODE;
}

/**
 * Get flag image URL from Flagcdn CDN using fixed-width format
 * @param country - Country name
 * @param width - Width in pixels (20, 40, 80, 160, 320, 640, 1280, 2560)
 * @param format - Image format: "png", "webp", "svg", "jpeg"
 * @returns CDN URL for the flag image
 */
export function getFlagUrl(
  country: string,
  width: number = 20,
  format: "png" | "webp" | "svg" | "jpeg" = "png"
): string {
  const code = getCountryCode(country);

  if (format === "svg") {
    return `https://flagcdn.com/${code}.svg`;
  }

  return `https://flagcdn.com/w${width}/${code}.${format}`;
}

/**
 * Get flag image srcset for responsive images (2x for retina displays)
 * @param country - Country name
 * @param width - Base width in pixels (20, 40, 80, 160, 320, 640, 1280, 2560)
 * @param format - Image format: "png", "webp", "svg", "jpeg"
 * @returns srcset string for responsive images
 */
export function getFlagSrcSet(
  country: string,
  width: number = 20,
  format: "png" | "webp" | "svg" | "jpeg" = "png"
): string {
  const code = getCountryCode(country);
  const width2x = width * 2;

  return `https://flagcdn.com/w${width2x}/${code}.${format} 2x`;
}

/**
 * @deprecated Use getFlagUrl instead
 * Get country flag emoji by country name
 */
export function getCountryFlag(country: string): string {
  return COUNTRY_FLAGS[country] || DEFAULT_FLAG;
}
