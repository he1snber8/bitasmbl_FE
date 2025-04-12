import { GithubUser } from "./githubUserTypes";
import { GoogleUser } from "./googleUserTypes";
import { StandardUser } from "./standardUserTypes";

export interface BaseUser {
  id: string;
  email?: string;
  name?: string;
  username: string;
  imageUrl?: string | null;
  bio?: string;
  provider: "google" | "github" | "standard";
}

export type User = GoogleUser | GithubUser | StandardUser;
