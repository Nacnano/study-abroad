/**
 * Scholarship-related UI constants and helper functions
 */

/**
 * Strategic note about scholarship return requirements
 */
export const SCHOLARSHIP_STRATEGY_NOTE = {
  title: "⚠️ Critical Strategic Note",
  warning:
    "Scholarships requiring work experience often include mandatory return-to-home-country clauses. This conflicts with post-study work visa opportunities.",
  recommendations: {
    title: "For Long-Term International Career:",
    options: [
      "Target fully-funded PhD programs (no return requirement)",
      "Or scholarships without return clauses (Fulbright TGS, MEXT, Gates Cambridge, ETH ESOP)",
    ],
  },
} as const;

/**
 * Section configurations for scholarship categories
 */
export const SCHOLARSHIP_SECTIONS = {
  freshGrads: {
    icon: "🎓",
    title: "For Fresh Graduates",
    subtitle: "No work experience required",
    gradient: "from-emerald-600 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    borderColor: "border-emerald-200",
  },
  experienced: {
    icon: "💼",
    title: "For Experienced Professionals",
    subtitle: "Requires 2+ years work experience",
    gradient: "from-blue-600 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
  },
} as const;

/**
 * Comparison table column headers
 */
export const COMPARISON_COLUMNS = [
  { key: "name", label: "Scholarship", align: "left" },
  { key: "country", label: "Country", align: "left" },
  { key: "workExp", label: "Work Exp?", align: "center" },
  { key: "returnReq", label: "Return Req?", align: "center" },
  { key: "bestFor", label: "Best For", align: "left" },
] as const;

/**
 * Helper function to get the appropriate "Best For" text
 */
export function getBestForText(returnRequirement: boolean): string {
  return returnRequirement
    ? "Career development in Thailand"
    : "International career flexibility";
}

/**
 * Helper function to format boolean values for display
 */
export function formatBooleanCell(
  value: boolean,
  type: "workExp" | "returnReq"
): { text: string; colorClass: string } {
  if (type === "workExp") {
    return value
      ? { text: "✓ Yes", colorClass: "text-amber-600" }
      : { text: "✗ No", colorClass: "text-emerald-600" };
  }
  // returnReq
  return value
    ? { text: "✓ Yes", colorClass: "text-red-600 font-semibold" }
    : { text: "✗ No", colorClass: "text-emerald-600" };
}
