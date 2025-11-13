/**
 * Scholarship type definition
 */
export interface Scholarship {
  name: string;
  country: string;
  targetDegree: string;
  workExpRequired: boolean;
  coverage: string[];
  keyConditions: string[];
  returnRequirement: boolean;
  deadlineNote: string;
  forFreshGrads: boolean;
}
