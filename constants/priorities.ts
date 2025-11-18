import { Priority } from "@/types/university";

// Priority configuration
export const PRIORITY_CONFIG = {
  High: {
    icon: "🔶",
    label: "High Priority",
    shortLabel: "HIGH",
    bgColor: "bg-red-50 dark:bg-red-900/30",
    hoverBgColor: "hover:bg-red-100 dark:hover:bg-red-900/50",
    textColor: "text-red-900 dark:text-red-300",
    borderColor: "border-red-200 dark:border-red-800",
    badgeColor:
      "bg-red-100 text-red-900 border-red-300 dark:bg-red-900/40 dark:text-red-200 dark:border-red-700",
    timeRange: "< 1 month",
  },
  Medium: {
    icon: "⭐",
    label: "Medium Priority",
    shortLabel: "MEDIUM",
    bgColor: "bg-yellow-50 dark:bg-yellow-900/30",
    hoverBgColor: "hover:bg-yellow-100 dark:hover:bg-yellow-900/50",
    textColor: "text-yellow-900 dark:text-yellow-300",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    badgeColor:
      "bg-yellow-100 text-yellow-900 border-yellow-300 dark:bg-yellow-900/40 dark:text-yellow-200 dark:border-yellow-700",
    timeRange: "1-3 months",
  },
  Low: {
    icon: "🟢",
    label: "Low Priority",
    shortLabel: "LOW",
    bgColor: "bg-green-50 dark:bg-green-900/30",
    hoverBgColor: "hover:bg-green-100 dark:hover:bg-green-900/50",
    textColor: "text-green-900 dark:text-green-300",
    borderColor: "border-green-200 dark:border-green-800",
    badgeColor:
      "bg-green-100 text-green-900 border-green-300 dark:bg-green-900/40 dark:text-green-200 dark:border-green-700",
    timeRange: "> 3 months",
  },
} as const satisfies Record<
  Priority,
  {
    icon: string;
    label: string;
    shortLabel: string;
    bgColor: string;
    hoverBgColor: string;
    textColor: string;
    borderColor: string;
    badgeColor: string;
    timeRange: string;
  }
>;

// Priority thresholds for urgency indicators
export const URGENCY_THRESHOLDS = {
  VERY_URGENT: 7, // days
  URGENT: 30, // days
  MODERATE: 90, // days
} as const;

// Urgency color mapping
export const URGENCY_COLORS = {
  VERY_URGENT: "text-red-700 dark:text-red-400",
  URGENT: "text-orange-700 dark:text-orange-400",
  MODERATE: "text-yellow-700 dark:text-yellow-400",
  NORMAL: "text-green-700 dark:text-green-400",
} as const;

/**
 * Get urgency color based on days remaining
 */
export function getUrgencyColor(daysRemaining: number | null): string {
  if (daysRemaining === null || daysRemaining < 0) {
    return URGENCY_COLORS.NORMAL;
  }

  if (daysRemaining <= URGENCY_THRESHOLDS.VERY_URGENT) {
    return URGENCY_COLORS.VERY_URGENT;
  } else if (daysRemaining <= URGENCY_THRESHOLDS.URGENT) {
    return URGENCY_COLORS.URGENT;
  } else if (daysRemaining <= URGENCY_THRESHOLDS.MODERATE) {
    return URGENCY_COLORS.MODERATE;
  } else {
    return URGENCY_COLORS.NORMAL;
  }
}

/**
 * Check if deadline is very urgent (within 7 days)
 */
export function isVeryUrgent(daysRemaining: number | null): boolean {
  return (
    daysRemaining !== null &&
    daysRemaining > 0 &&
    daysRemaining <= URGENCY_THRESHOLDS.VERY_URGENT
  );
}

/**
 * Format days remaining as human-readable text
 */
export function formatDaysRemaining(days: number): string {
  if (days === 1) return "Tomorrow!";
  if (days === 0) return "Today!";
  if (days < 0) return "Past deadline";
  return `${days} days left`;
}
