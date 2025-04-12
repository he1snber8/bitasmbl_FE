import { createContext, useContext, useState, ReactNode } from "react";
import { GithubRepo } from "../interfaces/users/githubUserTypes";

interface GithubRepoContextType {
  repos: GithubRepo[];
  setRepos: (repos: GithubRepo[]) => void;
}

// Create context
const GithubRepoContext = createContext<GithubRepoContextType | undefined>(
  undefined
);

// Context provider component
export const GithubRepoProvider = ({ children }: { children: ReactNode }) => {
  const [repos, setRepos] = useState<GithubRepo[]>([]);

  return (
    <GithubRepoContext.Provider value={{ repos, setRepos }}>
      {children}
    </GithubRepoContext.Provider>
  );
};

// Custom hook for using the context
export const useGithubRepo = () => {
  const context = useContext(GithubRepoContext);
  if (!context) {
    throw new Error("useGithubRepo must be used within a GithubRepoProvider");
  }
  return context;
};
