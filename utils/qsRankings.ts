import qsRankingsData from "@/data/top-universities-scraper_2025.json";
import { QSRankingData, QSRankingMap } from "@/types/qsRanking";

/**
 * Alias mappings for universities with naming variations
 */
const universityAliases: Record<string, string> = {
  // Common variations with "The" prefix
  universityoftokyo: "theuniversityoftokyo",
  universityofmelbourne: "theuniversityofmelbourne",
  universityofedinburgh: "theuniversityofedinburgh",
  universityofmanchester: "theuniversityofmanchester",
  universityofsydney: "theuniversityofsydney",
  universityofhongkong: "theuniversityofhongkong",

  // Acronym variations - map to simple form
  tudelft: "delftuniversityoftechnology",
  tuberlin: "technischeuniversitätberlin",
  lmumunich: "ludwigmaximiliansuniversitätmünchen",

  // Special name formats
  universitycollegelondon: "ucl",
  epfl: "epflécolepolytechniquefédéraledelausanne",
  écolepolytechniquefédéraledelausanne:
    "epflécolepolytechniquefédéraledelausanne",

  // University variations with different word order
  nanyangtechnologicaluniversity: "nanyangtechnologicaluniversitysingapore",
  hongkonguniversityofscienceandtechnology:
    "thehongkonguniversityofscienceandtechnology",
  chineseuniversityofhongkong: "thechineseuniversityofhongkong",
  unswsydney: "theuniversityofnewsouthwales",
  universityofnewsouthwales: "theuniversityofnewsouthwales",

  // Institute variations
  karlsruheinstituteoftechnology: "kitkarlsruheinstituteoftechnology",
  kit: "kitkarlsruheinstituteoftechnology",

  // Special cases
  ituniversityofcopenhagen: "universityofcopenhagen",
  universityofmontreal: "universitédemontréal",
  psluniversity: "universitépsl",
  "parissciences&lettres": "universitépsl",

  // Universities not in QS 2025 data
  // KAIST is not present in the provided QS dataset
};

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

    // Store with "the" removed for matching universities that include/exclude it
    const withoutThe = normalizedName.replace(/^the/, "");
    if (withoutThe !== normalizedName) {
      rankingsMap.set(withoutThe, ranking);
    }
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
    .replace(/\s+/g, "") // Normalize whitespace
    .replace(/\(.*?\)/g, "") // Remove parentheses and content
    .replace(/[,\-–—.]/g, "") // Remove commas, hyphens, dashes, and periods
    .replace(/&/g, "and") // Normalize ampersand
    .trim();
}

/**
 * Find QS ranking data for a university
 * Tries multiple matching strategies
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
  let match = rankingsMap.get(normalized);
  if (match) return match;

  // Try without "the" prefix
  const withoutThe = normalized.replace(/^the/, "");
  match = rankingsMap.get(withoutThe);
  if (match) return match;

  // Try with "the" prefix
  const withThe = "the" + normalized;
  match = rankingsMap.get(withThe);
  if (match) return match;

  // Try alias mappings
  if (universityAliases[normalized]) {
    match = rankingsMap.get(universityAliases[normalized]);
    if (match) return match;
  }

  // Try partial matching for acronyms and special cases
  // Extract significant words (longer than 2 chars)
  const words = universityName
    .toLowerCase()
    .replace(/\(.*?\)/g, "")
    .split(/[\s,\-–—.]+/)
    .filter((word) => word.length > 2);

  // If it looks like an acronym (short name), try fuzzy matching
  if (universityName.length <= 10 || words.length <= 2) {
    for (const [key, value] of rankingsMap.entries()) {
      const keyNormalized = key.toLowerCase().replace(/[^a-z0-9]/g, "");
      const searchNormalized = normalized.replace(/[^a-z0-9]/g, "");

      // Check if the search term is contained in the key or vice versa
      if (
        keyNormalized.includes(searchNormalized) ||
        searchNormalized.includes(keyNormalized)
      ) {
        // Additional validation: check if it has common words
        const keyWords = key
          .toLowerCase()
          .split(/[\s,\-–—.]+/)
          .filter((w) => w.length > 2);
        const matchCount = words.filter((word) =>
          keyWords.some((kw) => kw.includes(word) || word.includes(kw))
        ).length;

        if (matchCount >= Math.min(words.length, 2)) {
          return value;
        }
      }
    }
  }

  return undefined;
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
