import { createContext, useState, ReactNode } from "react";
import { GithubUser } from "../interfaces/users/githubUserTypes";

interface GithubUserContextType {
  userData: GithubUser | null; // Initially null, populated after fetch
  setGithubUserData: (data: GithubUser | null) => void; // Function to update userData
}

interface GithubUserProviderProps {
  children: ReactNode; // Expecting React components as children
}

// Define the initial context, which can be null until it's populated.
export const GithubUserContext = createContext<
  GithubUserContextType | undefined
>(undefined);

export const GithubUserProvider = ({ children }: GithubUserProviderProps) => {
  const [userData, setGithubUserData] = useState<GithubUser | null>(null); // Initially null

  return (
    <GithubUserContext.Provider value={{ userData, setGithubUserData }}>
      {children}
    </GithubUserContext.Provider>
  );
};
