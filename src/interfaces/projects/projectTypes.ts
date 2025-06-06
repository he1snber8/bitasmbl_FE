import {
  GetImplementationStepTerminalInstructionModel as GetImplementationStepTerminalInstruction,
  GetTerminalInstruction,
} from "../PROJECTS2/getClientProjectModel";

export interface CreateProjectModel {
  name: string;
  description: string;
  githubRepo?: string;
  projectRequirements: ProjectRequirement[];
  projectLinks: ProjectLink[];
  categoryIds: number[];
  creationCost: number;
}

export interface CreateProjectResponse {
  projectId: number;
  success?: string;
  error?: string;
}

// export interface ProjectRequirement {
//   name: string;
//   requirementId?: number;
//   maxApplicationLimit: number;
//   isTestEnabled?: boolean | false;
// }

export interface ProjectRequirement {
  id: number;
  description: string;
  codeExample?: string;
  hint?: string;
  isOptional: boolean;

  projectId: number;
}

export interface ProjectLink {
  urlName: string;
  urlValue: string;
}

export interface GetRequirement {
  id: number;
  description: string;
  codeExample: string;
  hint: string;
  isOptional: boolean;
}

export interface ApplyToProjectRequest {
  // coverLetter?: string;
  projectId?: number;
  projectApplicationId?: number;
  collaboratorId?: string;
  techStackRequirementIds: number[];
}

export interface SubmitProjectRequest {
  projectApplicationId: number;
  answer: string;
  reason: string;
  recommendation: string;
  isValid?: boolean;
}

export interface GetProjectSubmissionModel {
  projectApplicationId: number;
  answer: string;
  reason: string;
  recommendation: string;
  isValid?: boolean;
}

export interface ApplyToProjectResponse {
  message?: string;
}

export interface ProjectTechStack {
  project: string;
  techStack: TechStack;
}

export interface TechStack {
  id: number;
  name: string;
}

export interface GetImplementationStep {
  header: string;
  implementationStep: string;
  implementationStepTerminalInstructions?:
    | GetImplementationStepTerminalInstruction[]
    | [];
}

export interface ProjectImageModel {
  imageUrl: string;
}

export interface UpdateProjectRequest {
  id: number;
  name?: string;
  description?: string;
  status?: string;
}
