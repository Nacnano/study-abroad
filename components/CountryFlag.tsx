import Image from "next/image";
import { getFlagUrl } from "@/constants/ui";

interface CountryFlagProps {
  country: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
}

/**
 * CountryFlag component - displays a flag image from Flagcdn CDN
 * Uses high-quality flag images instead of emoji for consistent rendering
 *
 * @param country - Country name (e.g., "USA", "UK", "Canada")
 * @param width - Width in pixels (default: 32)
 * @param height - Height in pixels (default: 24, maintains 4:3 aspect ratio)
 * @param className - Additional CSS classes
 * @param priority - Whether to prioritize loading this image
 */
export function CountryFlag({
  country,
  width = 32,
  height = 24,
  className = "",
  priority = false,
}: CountryFlagProps) {
  // Calculate the CDN size format (e.g., "32x24")
  const size = `${width}x${height}`;

  // Get URL for the flag image
  const flagUrl = getFlagUrl(country, size, "png");

  return (
    <Image
      src={flagUrl}
      width={width}
      height={height}
      alt={`${country} flag`}
      className={`inline-block ${className}`}
      priority={priority}
      unoptimized // Flagcdn already provides optimized images at exact sizes
      style={{
        objectFit: "cover",
        display: "inline-block",
      }}
    />
  );
}
