export interface University {
  id: string;
  name: string;
  country: string;
  programs: string[]; // e.g., ["PhD","MS","MEng"]
  researchAreas: string[]; // e.g., ["ML","NLP","Vision"]
  keyFaculty?: string[]; // optional list of notable faculty / groups
  applicationDeadline: string;
  applicationFee?: string;
  tuitionPerYear: string;
  livingCostPerYear: string;
  greRequired: string;
  toeflIeltsMin: string;
  keyDocuments: string[]; // e.g., ["Transcripts","SOP","LORs"]
  scholarships: string;
  notes: string;
  // Additional strategic info
  visaType?: string;
  visaDuration?: string;
  fundingType?: Funding;
  programType?: "PhD" | "MS" | "MPhil" | "MEng" | "Mixed";
  website?: string;
  // QS World Rankings data (optional, matched by name)
  qsRank?: string; // e.g., "1", "=2", "15"
  qsScore?: string; // e.g., "100", "98.5"
  qsLogo?: string; // Logo URL from QS data
}

// TODO: Refactor and migrate funding (very bad practice for scalability)
type Funding =
  | "Fully Funded"
  | "Self-Funded"
  | "Limited Funding"
  | "Mixed"
  | "Fully Funded (PhD) / Mixed (MSc)"
  | "Self-Funded (MSc) / Limited Funding (PhD)"
  | "Limited Funding (MSc) / Fully Funded (PhD employment)"
  | "Fully Funded (via CGS or university scholarships) / Mixed"
  | "Fully Funded (many research students)"
  | "Limited Funding (MS) / Fully Funded via MEXT (PhD applicants)";

export type Priority = "High" | "Medium" | "Low";

export interface CountryInfo {
  name: string;
  visaProgram: string;
  visaDuration: string;
  jobMarketOutlook: string;
  strategicVerdict: string;
}
