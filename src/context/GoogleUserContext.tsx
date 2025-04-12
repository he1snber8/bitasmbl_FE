import { GoogleUserResponse } from "../interfaces/googleTypes";
import { createContext, ReactNode, useState } from "react";
import { GoogleUser } from "../interfaces/users/googleUserTypes";

interface GoogleUserContextType {
  userData: GoogleUser | null; // Initially null, populated after fetch
  setGoogleUserData: (data: GoogleUser | null) => void; // Function to update userData
}

interface GoogleUserProviderProps {
  children: ReactNode; // Expecting React components as children
}

// Define the initial context, which can be null until it's populated.
export const GoogleUserContext = createContext<
  GoogleUserContextType | undefined
>(undefined);

export const GoogleUserProvider = ({ children }: GoogleUserProviderProps) => {
  const [userData, setGoogleUserData] = useState<GoogleUser | null>(null); // Initially null

  return (
    <GoogleUserContext.Provider value={{ userData, setGoogleUserData }}>
      {children}
    </GoogleUserContext.Provider>
  );
};
