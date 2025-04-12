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

export interface ProjectRequirement {
  name: string;
  requirementId?: number;
  maxApplicationLimit: number;
  isTestEnabled?: boolean | false;
}

export interface ProjectLink {
  urlName: string;
  urlValue: string;
}

export interface GetRequirement {
  id: number;
  name: string;
}

export interface ApplyToProjectRequest {
  coverLetter?: string;
  projectId: number;
  requirementIds: number[];
  correctAnswers: number; // Number of correct answers
  totalQuestions: number;
  selectedAndAppliedRequirements: string[];
}

export interface ApplyToProjectResponse {
  message?: string;
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
