import { createContext, ReactNode, useContext, useState } from "react";
import { User, UserContextType } from "../interfaces/userTypes";
import { StandardUser } from "../interfaces/users/standardUserTypes";

// Create the context with an empty default value
const StandardUserContext = createContext<UserContextType | undefined>(
  undefined
);

// Create a provider component
export const StandardUserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [userData, setStandardUser] = useState<StandardUser | null>(null);

  return (
    <StandardUserContext.Provider
      value={{ userData, setStandardUser: setStandardUser }}
    >
      {children}
    </StandardUserContext.Provider>
  );
};

// Hook for consuming the context
export const useStandardUserContext = (): UserContextType => {
  const context = useContext(StandardUserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
