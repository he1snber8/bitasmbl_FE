import { Category } from "../../categoryTypes";
import { UserModel, UserProfile } from "../../userTypes";
import { GetRequirement } from "../projectRequirementTypes";
import { ProjectImageModel, ProjectLink } from "../projectTypes";

export interface GetClientProjectModel {
  id: number;
  name?: string;
  description: string;
  status?: string;
  applications: number;
  githubRepo?: string;
  dateCreated?: Date;
  user: UserProfile; // Maps to GetUserModel in the backend
  requirements: GetClientProjectRequirement[];
  projectLinks: ProjectLink[];
  categories: Category[];
  projectImages: ProjectImageModel[];
}
export interface GetAppliedProjectsModel {
  applicationStatus?: string;
  dateApplied?: Date;
  project: GetClientProjectModel;
  coverLetter: string;
}

export interface GetClientProjectRequirement {
  requirementId: number;
  requirement: GetRequirement;
  maxApplicationLimit: number;
  currentApplications: number;
  isTestEnabled: boolean;
}
