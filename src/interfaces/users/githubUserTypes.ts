import { UserModel, UserProfile, UserProfileResponse } from "../userTypes";
import { BaseUser } from "./baseUserType";

export interface GithubUser extends BaseUser {
  provider: "github";
  login: string;
  avatar_url: string; // Maps to `avatar_url`
  repos: any; // User's repositories
  followers: number;
  following: number;
  public_repos: number;
  public_gists: number;
  created_at: string;
  repos_url: string;
  updated_at: string;
  location?: string;
  twitter_username?: string | null;
  hireable?: boolean | null;
}

export interface GithubRepo {
  id: number;
  name: string;
  html_url: string;
  url: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
  visibility: string;
  owner: GithubUser;
  contributions?: ContributionHeatmap; // Optional heatmap data
  open_issues_count?: number; // Track open issues count
  created_at: string; // ISO format for easy comparison and display
  updated_At: string;
}

export interface ContributionHeatmap {
  // Here, I am assuming the heatmap is an array of weekly contributions,
  // which GitHub API typically provides in the user's contributions data
  weeks: Array<{
    date: string; // Week start date
    count: number; // Number of contributions in that week
  }>;
}

export interface GetGithubUserResponse {
  // user: UserProfileResponse;
  accessToken: string;
}

export class GithubRepoWithHeatmap implements GithubRepo {
  id: number;
  name: string;
  html_url: string;
  url: string;
  description: string | null;
  language: string;
  stargazers_count: number;
  forks_count: number;
  private: boolean;
  visibility: string;
  owner: GithubUser;
  contributions?: ContributionHeatmap;
  open_issues_count?: number;
  created_at: string;
  updated_At: string;

  constructor(repoData: GithubRepo, contributions?: ContributionHeatmap) {
    this.id = repoData.id;
    this.name = repoData.name;
    this.html_url = repoData.html_url;
    this.url = repoData.url;
    this.description = repoData.description;
    this.language = repoData.language;
    this.stargazers_count = repoData.stargazers_count;
    this.forks_count = repoData.forks_count;
    this.private = repoData.private;
    this.visibility = repoData.visibility;
    this.owner = repoData.owner;
    this.contributions = contributions;
    this.open_issues_count = repoData.open_issues_count;
    this.created_at = repoData.created_at;
    this.updated_At = repoData.updated_At;
  }
}
