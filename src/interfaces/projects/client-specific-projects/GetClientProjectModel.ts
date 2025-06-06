import { Category } from "../../categoryTypes";
import { GetClientProjectApplicationModel } from "../../PROJECTS2/getClientProjectModel";
import { UserModel, UserProfile } from "../../userTypes";
import { GetRequirement } from "../projectRequirementTypes";
import {
  GetImplementationStep,
  ProjectImageModel,
  ProjectLink,
  ProjectRequirement,
  ProjectTechStack,
} from "../projectTypes";
// import { GetProjectApplicationModel } from "../user-specific-projects/GetUserProjectModel";

export interface ClientProjectResponse {
  id: number;
  name?: string;
  overview?: string;
  status?: string;
  difficulty?: string;
  applications: number;
  dateCreated?: Date;
  projectTechStacks: ProjectTechStack[];
  implementationSteps: GetImplementationStep[];
  requirements: GetRequirement[];
  projectLinks: ProjectLink[];
  // categories: Category[];
  projectImages: ProjectImageModel[];
  projectApplications: GetClientProjectApplicationModel[];
}

export interface ClientProjectsRequest {
  page: number | 1;
  pageSize: number | 8;
}

export interface AppliedProjectsResponse {
  applicationStatus?: string;
  dateApplied?: Date;
  project: ClientProjectResponse;
  coverLetter: string;
}

export interface ClientProjectRequirementResponse {
  requirementId: number;
  requirement: GetRequirement;
  maxApplicationLimit: number;
  currentApplications: number;
  isTestEnabled: boolean;
}
