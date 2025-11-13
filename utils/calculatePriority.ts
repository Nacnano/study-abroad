import { Priority } from "@/types/university";

/**
 * Calculate priority based on the deadline string
 * High: less than 1 month
 * Medium: 1-3 months
 * Low: more than 3 months
 */
export function calculatePriority(applicationDeadline: string): Priority {
  const days = getDaysUntilDeadline(applicationDeadline);

  if (days === null) return "Low";

  const months = days / 30;

  if (months < 1) {
    return "High";
  } else if (months >= 1 && months <= 3) {
    return "Medium";
  } else {
    return "Low";
  }
}

/**
 * Get the number of days until the deadline
 */
export function getDaysUntilDeadline(
  applicationDeadline: string
): number | null {
  const now = new Date();

  // Parse the deadline string
  // Format examples: "Dec 1 - Dec 15, 2025", "Dec 3, 2025", "Nov 2025"
  const deadlineStr = applicationDeadline.toLowerCase();

  // Extract the earliest date from ranges (e.g., "Dec 1 - Dec 15, 2025" -> "Dec 1, 2025")
  let dateToCheck = applicationDeadline;
  if (applicationDeadline.includes(" - ")) {
    const parts = applicationDeadline.split(" - ");
    dateToCheck = parts[0].trim();
    // Add year if not present
    if (!dateToCheck.includes(",")) {
      const yearMatch = applicationDeadline.match(/\d{4}/);
      if (yearMatch) {
        dateToCheck = `${dateToCheck}, ${yearMatch[0]}`;
      }
    }
  }

  // Try to parse the date
  let deadlineDate: Date | null = null;

  // Try parsing as a full date first
  deadlineDate = new Date(dateToCheck);

  // If invalid, try to extract month and year
  if (isNaN(deadlineDate.getTime())) {
    const monthMatch = deadlineStr.match(
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/
    );
    const yearMatch = deadlineStr.match(/\d{4}/);

    if (monthMatch && yearMatch) {
      const monthStr = monthMatch[0];
      const year = parseInt(yearMatch[0]);

      // Default to 1st of the month
      deadlineDate = new Date(`${monthStr} 1, ${year}`);
    }
  }

  // If we still can't parse, return null
  if (!deadlineDate || isNaN(deadlineDate.getTime())) {
    return null;
  }

  // Calculate the difference in days
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
}
