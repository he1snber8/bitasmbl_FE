import {
  GetProjectSubmissionModel,
  GetImplementationStep,
  ProjectImageModel,
  ProjectRequirement,
  ProjectTechStack,
} from "../projectTypes";

export interface GetUserProjectModel {
  id: number;
  name?: string;
  description?: string;
  status?: string;
  dateCreated?: Date;
  applications?: number;
  githubRepo?: string;
  overview: string;
  difficulty: string;

  projectTechStacks: ProjectTechStack[];
  requirements: ProjectRequirement[];
  implementationSteps: GetImplementationStep[];
  projectImages: ProjectImageModel[];
}

export interface UserApplicationsByProject {
  projectId: number | 0;
}

export interface GetProjectApplicationModel {
  id: number;
  dateSubmitted: Date;
  projectSubmissions: GetProjectSubmissionModel[];
  projectId: number;
  project: GetUserProjectModel;
}
