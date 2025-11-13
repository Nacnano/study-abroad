import { Priority } from "@/types/university";

// Constants
const DAYS_PER_MONTH = 30;
const HIGH_PRIORITY_THRESHOLD_MONTHS = 1;
const MEDIUM_PRIORITY_THRESHOLD_MONTHS = 3;
const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

/**
 * Calculate priority based on the deadline string
 * High: less than 1 month
 * Medium: 1-3 months
 * Low: more than 3 months
 * @param applicationDeadline - The application deadline string
 * @returns Priority level (High, Medium, or Low)
 */
export function calculatePriority(applicationDeadline: string): Priority {
  const days = getDaysUntilDeadline(applicationDeadline);

  if (days === null || days < 0) return "Low";

  const months = days / DAYS_PER_MONTH;

  if (months < HIGH_PRIORITY_THRESHOLD_MONTHS) {
    return "High";
  } else if (months <= MEDIUM_PRIORITY_THRESHOLD_MONTHS) {
    return "Medium";
  } else {
    return "Low";
  }
}

/**
 * Get the number of days until the deadline
 * @param applicationDeadline - The application deadline string
 * @returns Number of days until deadline, or null if parsing fails
 */
export function getDaysUntilDeadline(
  applicationDeadline: string
): number | null {
  const deadlineDate = parseDeadlineDate(applicationDeadline);

  if (!deadlineDate) return null;

  const now = new Date();
  const diffTime = deadlineDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / MILLISECONDS_PER_DAY);

  return diffDays;
}

/**
 * Parse deadline string into a Date object
 * Handles formats: "Dec 1 - Dec 15, 2025", "Dec 3, 2025", "Nov 2025"
 * @param deadline - The deadline string to parse
 * @returns Parsed Date object or null if parsing fails
 */
function parseDeadlineDate(deadline: string): Date | null {
  const dateToCheck = extractEarliestDate(deadline);

  // Try direct parsing first
  let date = new Date(dateToCheck);

  // If invalid, try extracting month and year
  if (!isValidDate(date)) {
    date = parseMonthYearFormat(deadline);
  }

  return isValidDate(date) ? date : null;
}

/**
 * Extract the earliest date from a date range
 * @param deadline - The deadline string (may contain a range)
 * @returns The earliest date string
 */
function extractEarliestDate(deadline: string): string {
  let dateToCheck = deadline;

  if (deadline.includes(" - ")) {
    const parts = deadline.split(" - ");
    dateToCheck = parts[0].trim();

    // Add year if not present in the first part
    if (!dateToCheck.includes(",")) {
      const yearMatch = deadline.match(/\d{4}/);
      if (yearMatch) {
        dateToCheck = `${dateToCheck}, ${yearMatch[0]}`;
      }
    }
  }

  return dateToCheck;
}

/**
 * Parse deadline in "Month Year" format
 * @param deadline - The deadline string
 * @returns Parsed Date object or invalid Date
 */
function parseMonthYearFormat(deadline: string): Date {
  const deadlineStr = deadline.toLowerCase();
  const monthMatch = deadlineStr.match(
    /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)[a-z]*/
  );
  const yearMatch = deadlineStr.match(/\d{4}/);

  if (monthMatch && yearMatch) {
    const monthStr = monthMatch[0];
    const year = parseInt(yearMatch[0], 10);
    return new Date(`${monthStr} 1, ${year}`);
  }

  return new Date("Invalid");
}

/**
 * Check if a Date object is valid
 * @param date - The date to check
 * @returns True if the date is valid
 */
function isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
