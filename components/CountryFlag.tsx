import { getFlagUrl, getFlagSrcSet } from "@/constants/ui";

interface CountryFlagProps {
  country: string;
  width?: number;
  className?: string;
  priority?: boolean;
}

/**
 * CountryFlag component - displays a flag image from Flagcdn CDN
 * Uses Flagcdn's fixed-width format (w20, w40, etc.) with 4:3 aspect ratio
 *
 * @param country - Country name (e.g., "USA", "UK", "Canada")
 * @param width - Width in pixels: 20, 40, 80, 160, 320, 640, 1280, or 2560 (default: 20)
 * @param className - Additional CSS classes
 * @param priority - Whether to prioritize loading this image
 */
export function CountryFlag({
  country,
  width = 20,
  className = "",
  priority = false,
}: CountryFlagProps) {
  // Flagcdn uses fixed widths: 20, 40, 80, 160, 320, 640, 1280, 2560
  // Height is automatically calculated to maintain 4:3 aspect ratio
  const height = Math.round((width * 3) / 4);

  // Get URL for the flag image
  const flagUrl = getFlagUrl(country, width, "png");
  const srcSet = getFlagSrcSet(country, width, "png");

  return (
    <img
      src={flagUrl}
      srcSet={srcSet}
      width={width}
      height={height}
      alt={`${country} flag`}
      className={`inline-block ${className}`}
      loading={priority ? "eager" : "lazy"}
      style={{
        objectFit: "cover",
        display: "inline-block",
      }}
    />
  );
}
