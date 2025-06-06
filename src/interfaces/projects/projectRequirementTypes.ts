export interface GetRequirement {
  id?: number; // Matches backend Requirement.Id
  description: string; // Matches backend Requirement.Name
  codeExample: string;
  hint: string;
}

export interface ProjectRequirement {
  name: string;
  requirementId?: number;
  maxApplicationLimit: number;
  currentApplications: number;
}

export interface GetProjectRequirementTest {
  question: string;
  answers: string[]; // ["Option A", "Option B", "Option C"]
  correctAnswer: string; // e.g., "Option A"
}
