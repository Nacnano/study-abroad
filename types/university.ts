export interface University {
  id: string;
  name: string;
  country: string;
  programs: string[];
  researchAreas: string[];
  applicationDeadline: string;
  tuitionPerYear: string;
  livingCostPerYear: string;
  greRequired: string;
  toeflIeltsMin: string;
  keyDocuments: string[];
  scholarships: string;
  notes: string;
  // Additional strategic info
  visaType?: string;
  visaDuration?: string;
  fundingType?: "Fully Funded" | "Self-Funded" | "Limited Funding" | "Mixed";
  programType?: "PhD" | "MS" | "MPhil" | "MEng" | "Mixed";
}

export type Priority = "High" | "Medium" | "Low";

export interface CountryInfo {
  name: string;
  visaProgram: string;
  visaDuration: string;
  jobMarketOutlook: string;
  strategicVerdict: string;
}
