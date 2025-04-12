import React, { createContext, useState, useContext } from "react";
import { GoogleOAuthResponse } from "../interfaces/googleTypes";

interface AuthContextProps {
  googleAuth: GoogleOAuthResponse | null;
  setGoogleAuth: (authData: GoogleOAuthResponse | null) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const GoogleAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [googleAuth, setGoogleAuth] = useState<GoogleOAuthResponse | null>(
    null
  );

  return (
    <AuthContext.Provider value={{ googleAuth, setGoogleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useGoogleAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
