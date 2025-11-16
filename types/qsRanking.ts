/**
 * QS World University Rankings data types
 * Source: Top Universities scraper data (2025)
 */

export interface QSIndicator {
  indicator_id: string;
  indicator_name: string;
  rank: string;
  score: string;
}

export interface QSScores {
  "Research & Discovery"?: QSIndicator[];
  "Learning Experience"?: QSIndicator[];
  Employability?: QSIndicator[];
  "Global Engagement"?: QSIndicator[];
  Sustainability?: QSIndicator[];
}

export interface QSRankingData {
  score_nid: string;
  nid: string;
  advanced_profile: number;
  core_id: string;
  title: string;
  path: string;
  region: string;
  country: string;
  city: string;
  logo: string;
  overall_score: string;
  rank_display: string;
  rank: string;
  stars: string;
  dagger: boolean;
  redact: boolean;
  isShortlisted: number;
  scores: QSScores;
}

export type QSRankingMap = Map<string, QSRankingData>;
