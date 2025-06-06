import { Category } from "../categoryTypes";
import { ProjectLink, TechStack } from "../projects/projectTypes";
import {
  GetProjectApplicationModel,
  GetUserProjectModel,
} from "../projects/user-specific-projects/GetUserProjectModel";

import { UserModel } from "../userTypes";

export interface GetClientProjectModel {
  // id: number;
  // name?: string;
  // overview?: string;
  // status?: string;
  // difficulty?: string;
  // applications: number;
  // dateCreated?: string; // ISO date string from C#

  // projectApplications: GetClientProjectApplicationModel[];

  // // projectStatus: ProjectStatus;
  // projectTechStacks: (ProjectTechStack | null)[];
  // projectLinks: (ProjectLink | null)[];
  // implementationSteps: (GetProjectImplementationStepModel | null)[];
  // requirements: (GetProjectRequirementModel | null)[];
  // projectCategories: (Category | null)[];

  id: number;
  name?: string;
  overview?: string;
  status?: string | null;
  difficulty?: string;
  applications: number;
  dateCreated?: string;
  projectApplications: GetClientProjectApplicationModel[];
  projectTechStacks: ProjectTechStack[];
  projectLinks: ProjectLink[];
  implementationSteps: GetProjectImplementationStepModel[];
  requirements: GetProjectRequirementModel[];
  projectCategories: Category[];
}

export enum ProjectStatus {
  soloActive,
  teamActive,
  teamMemberWaiting,
  soloSubmitted,
  teamSubmitted,
}

export interface GetClientProjectApplicationModel {
  id: number;
  dateApplied: string;
  projectId: number;
  project: GetClientProjectModel;
  applicationMemberships: ClientApplicationMembershipModel[];
}

export interface ClientApplicationMembershipModel {
  user: UserModel;
  applicationMemberSelectedTechStacks: ApplicationMemberSelectedTechStack[];
}

export interface GetUserProjectApplicationModel {
  id: number;
  dateApplied: string;
  projectId: number;
  project: GetClientProjectModel;
  applicationMemberships: UserApplicationMembershipModel[];
}

export interface UserApplicationMembershipModel {
  user: UserModel;
  userMembership: string;
  projectApplication: GetProjectApplicationModel;
  applicationMemberSelectedTechStacks: ApplicationMemberSelectedTechStack[];
}

export interface ApplicationMemberSelectedTechStack {
  techStackId: number;
  techStack?: TechStack;
}

export interface UserSelectedTechStack {
  name: string;
  projectApplication: GetClientProjectApplicationModel;
  projectApplicationId: number;
}

export interface ProjectTechStack {
  projectId: number;
  techStackId: number;
  techStack?: TechStack;
}

export interface GetProjectImplementationStepModel {
  id: number;
  header: string;
  implementationSteps?: string[];
  terminalInstruction: GetTerminalInstruction;
  projectId: number;
}

export interface GetTerminalInstruction {
  label: string;
  command: string;
}

export interface GetImplementationStepTerminalInstructionModel {
  terminalInstruction: GetTerminalInstruction;
  projectImplementationStep: GetProjectImplementationStepModel;
}

export interface GetProjectRequirementModel {
  id: number;
  description: string;
  codeExample?: string;
  hint?: string;
  isOptional: boolean;
  projectId: number;
}
