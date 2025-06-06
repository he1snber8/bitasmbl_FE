import {
  GetProjectApplicationModel,
  GetUserProjectModel,
} from "./projects/user-specific-projects/GetUserProjectModel";
import {
  UserApplicationMembershipModel,
  GetClientProjectApplicationModel,
} from "./PROJECTS2/getClientProjectModel";
import { GithubUser } from "./users/githubUserTypes";
import { StandardUser } from "./users/standardUserTypes";

export interface SocialLink {
  platform: string;
  urlValue: string;
}

export interface User {
  id: string;
  userName?: string;
  email?: string;
  imageUrl?: string;
  bio?: string;
}

export interface UserProfile extends User {
  dateJoined: Date;
  lastLogin: Date;
  xp: number;
  applicationMemberships: UserApplicationMembershipModel[];
  skills: string[];
  userSocials?: SocialLink[];
  balance: number;
}

export interface UserProfileResponse {
  message: string;
  userModel: UserProfile;
}

export interface UserModel {
  id?: string;
  userName?: string;
  email?: string;
  imageUrl?: string;
  bio?: string;
}

export interface UserUpdateModel {
  username?: string;
  imageUrl?: string;
  bio?: string;

  password?: string;
  userSocials?: SocialLink[];
  skills?: string[];
  // balance?: number;
}

export interface RegisterUserModel {
  userName: string;
  email: string;
  password?: string;
  registrationType?: string;
}

export interface LoginResponse {
  message: string;
  userModel: StandardUser;
}

export interface RegisterResponse {
  message?: string;
  userModel: User;
  error?: string;
}

export interface RegisterRequest {
  userName: string;
  email: string;
  password: string;
}

export interface LoginRequest {
  email?: string;
  username?: string;
  password?: string;
  loginType?: string;
}

export interface UserContextType {
  userData: StandardUser | null;
  setStandardUser: (userData: StandardUser | null) => void;
}

export interface PasswordRecoveryRequest {
  email: string;
}

export interface PasswordRecoveryResponse {
  message: string; // Adjust based on the API response
}

export interface ResetPasswordRequest {
  email: string;
  token: string;
  newPassword: string;
  confirmPassword: string;
}
