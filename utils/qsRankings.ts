import qsRankingsData from "@/data/top-universities-scraper_2025.json";
import { QSRankingData, QSRankingMap } from "@/types/qsRanking";

/**
 * Parse and create a map of QS Rankings data by university name
 * Normalizes university names for easier matching
 */
export function loadQSRankings(): QSRankingMap {
  const rankingsMap = new Map<string, QSRankingData>();

  (qsRankingsData as QSRankingData[]).forEach((ranking) => {
    // Store by exact title
    rankingsMap.set(ranking.title, ranking);

    // Also store by normalized name for easier matching
    const normalizedName = normalizeUniversityName(ranking.title);
    rankingsMap.set(normalizedName, ranking);
  });

  return rankingsMap;
}

/**
 * Normalize university name for matching
 * Removes common variations and abbreviations
 */
export function normalizeUniversityName(name: string): string {
  return name
    .toLowerCase()
    .replace(/\s+/g, " ") // Normalize whitespace
    .replace(/\(.*?\)/g, "") // Remove parentheses and content
    .replace(/[,-]/g, "") // Remove commas and hyphens
    .trim();
}

/**
 * Find QS ranking data for a university
 * Tries exact match first, then normalized name matching
 */
export function findQSRanking(
  universityName: string,
  rankingsMap: QSRankingMap
): QSRankingData | undefined {
  // Try exact match first
  const exact = rankingsMap.get(universityName);
  if (exact) return exact;

  // Try normalized match
  const normalized = normalizeUniversityName(universityName);
  return rankingsMap.get(normalized);
}

/**
 * Get ranking display string (handles special cases like "=2" for tied ranks)
 */
export function getRankDisplay(ranking: QSRankingData): string {
  return ranking.rank_display || ranking.rank;
}

/**
 * Get overall score as a number
 */
export function getOverallScore(ranking: QSRankingData): number {
  return parseFloat(ranking.overall_score) || 0;
}

// Load rankings once at module level
export const qsRankings = loadQSRankings();

/**
 * Get QS ranking for a university by name
 */
export function getQSRanking(
  universityName: string
): QSRankingData | undefined {
  return findQSRanking(universityName, qsRankings);
}
