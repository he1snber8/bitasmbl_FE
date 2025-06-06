import { GithubUser } from "../users/githubUserTypes";

export interface GithubCommit {
  sha: string;
  commit: CommitInfo;
  author?: GithubUser;
  committer?: GithubUser;
  parents: ParentCommit[];
}

export interface CommitInfo {
  author: CommitAuthor;
  committer: CommitAuthor;
  message: string;
}

export interface CommitAuthor {
  name: string;
  email: string;
  date: string;
}
export interface ParentCommit {
  sha: string;
  url: string;
}

export interface GithubFileContent {
  name: string;
  path: string;
  content: string;
  download_url: string;
}
