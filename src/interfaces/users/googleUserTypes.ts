import { BaseUser } from "./baseUserType";

export interface GoogleUser extends BaseUser {
  provider: "google";
  familyName: string;
  givenName: string;
  verifiedEmail: boolean;
  hd?: string; // Hosted domain (for Google Workspace users)
}
