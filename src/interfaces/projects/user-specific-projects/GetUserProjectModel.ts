import { User } from "../../userTypes";
import { ProjectImageModel } from "../projectTypes";

export interface GetUserProjectModel {
  id: number;
  name?: string;
  description?: string;
  status?: string;
  dateCreated?: Date;
  applications?: number;
  githubRepo?: string;
  projectApplications: GetProjectApplicationModel[];
  projectImages: ProjectImageModel[];
}

export interface UserApplicationsByProject {
  projectId: number | 0;
}

export interface GetProjectApplicationModel {
  id: number;
  coverLetter?: string;
  applicationStatus?: string;
  projectId: number;
  principalId: number;
  quizScore: number;
  applicant: User; // Maps to GetProjectApplicationModel in the backend
  selectedAndAppliedRequirements: string[];
}
