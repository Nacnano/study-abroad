import { CountryInfo } from "@/types/country";

export const countryInfo: Record<string, CountryInfo> = {
  USA: {
    name: "United States",
    visaProgram: "F-1 OPT + STEM Extension",
    visaDuration: "3 years (1+2)",
    jobMarketOutlook:
      "Excellent: Largest AI/ML market, highest salaries. Long-term PR difficult (H-1B lottery).",
    strategicVerdict:
      "Highest-risk, highest-reward. Unmatched job market, but now facing significant political [7] and bureaucratic instability. Proposed end of 'Duration of Status' is a critical new risk factor.", // Updated
  },
  Canada: {
    name: "Canada",
    visaProgram: "Post-Graduation Work Permit (PGWP)",
    visaDuration: "3 years (for Master's)",
    jobMarketOutlook:
      "Excellent: Growing AI market, clear path to PR. New PGWP rules do NOT affect MS/PhD grads.",
    strategicVerdict:
      "Most balanced path, offering the highest stability. World-class education with the clearest, most *protected* pathway  to a 3-year work permit and permanent residency for MS/PhD graduates.", // Updated
  },
  UK: {
    name: "United Kingdom",
    visaProgram: "Graduate Route",
    visaDuration: "18 months (MS) / 3 years (PhD)",
    jobMarketOutlook:
      "Good: Strong AI market (London, Cambridge). Visa stability is now a major issue for MS students.",
    strategicVerdict:
      "Prestige path with increasing risk. PhDs (3-year visa) are secure. MS path is high-risk: the visa is confirmed to be cut to 18 months for the 2026-27 intake , making it far less stable than Canada or Germany.", // Updated
  },
  Switzerland: {
    name: "Switzerland",
    visaProgram: "Job Search Permit (L-Permit)",
    visaDuration: "6 months",
    jobMarketOutlook:
      "Worst: Extremely challenging for non-EU graduates. Employers prefer EU citizens.",
    strategicVerdict:
      "Critical Mismatch. World-class education just became 3x more expensive (to ~4,400 CHF/yr). This high cost is paired with the worst job prospects. A path for funded PhDs only.", // Updated
  },
  Germany: {
    name: "Germany",
    visaProgram: "Job Seeker Visa",
    visaDuration: "18 months",
    jobMarketOutlook:
      "Excellent: Strong industrial demand, clear path to EU Blue Card.",
    strategicVerdict:
      "Highest ROI (with caveat). The 18-month job seeker visa  is exceptional. However, the 'no tuition' benefit is ending: top schools like TUM now charge significant non-EU fees (~€8-12k/yr).", // Updated
  },
  Netherlands: {
    name: "Netherlands",
    visaProgram: "Orientation Year (Zoekjaar)",
    visaDuration: "1 year",
    jobMarketOutlook:
      "Good: Strong tech market.[54] AI/ML is highly competitive, requires MS+, and favors Dutch speakers.[56, 57]",
    strategicVerdict:
      "Strong program, moderate risk. The 1-year 'Orientation Year' permit  is excellent. However, the AI/ML job market is highly competitive for non-EU/non-Dutch speakers.",
  },
  Singapore: {
    name: "Singapore",
    visaProgram: "Employment Pass (EP)",
    visaDuration: "Tied to job offer",
    jobMarketOutlook:
      "Excellent market but difficult visa: Booming AI hub, but high salary threshold (S$5,600/mo).[46]",
    strategicVerdict:
      "High-cost, high-reward. Booming AI hub with a transparently difficult visa. The S$5,600/mo minimum (which scales with age ) filters for only the highest-earning graduates.", // Updated
  },
  Australia: {
    name: "Australia",
    visaProgram: "Temporary Graduate Visa (485)",
    visaDuration: "2-3 years (research = 3)",
    jobMarketOutlook: "Good: Stable visa, good quality of life, path to PR.",
    strategicVerdict:
      "Stable and attractive path with clear post-study work opportunities.",
  },
  "South Korea": {
    name: "South Korea",
    visaProgram: "Engineer Status (E-7)",
    visaDuration: "Tied to job (1-5 years)",
    jobMarketOutlook:
      "Good: Strong tech market, requires cultural/linguistic adaptation.",
    strategicVerdict:
      "Strong, fully-funded programs (KAIST [127]). Cultural/linguistic adaptation is important for job market.",
  },
  Japan: {
    name: "Japan",
    visaProgram: "Designated Activities (Job-Hunting)",
    visaDuration: "1 year",
    jobMarketOutlook:
      "High Demand: Massive tech talent shortage. AI/ML is in high demand.",
    strategicVerdict:
      "High-friction, high-need. A 1-year job-hunting visa  opens the door to a market with a severe tech talent shortage. Success is almost entirely dependent on linguistic adaptation (N2-level Japanese).",
  },
  China: {
    name: "China",
    visaProgram: "K Visa / Z Visa",
    visaDuration: "Tied to job",
    jobMarketOutlook:
      "High Demand (Top-Tier): 'Talent war' for high-end AI specialists. Saturated general market.",
    strategicVerdict:
      "High-opportunity, high-ambiguity. A 'talent war'  for top AI researchers. New 'K visa' aims to attract S&T talent. Success depends on being at the top of the talent pool.",
  },
};
