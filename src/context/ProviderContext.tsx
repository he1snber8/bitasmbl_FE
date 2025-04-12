import React, { createContext, useContext, useState } from "react";

// Create a context for provider management
const AuthProviderContext = createContext<{
  provider: string | null;
  setProvider: React.Dispatch<React.SetStateAction<string | null>>;
}>({
  provider: "",
  setProvider: () => {},
});

export const useAuthProviderContext = () => useContext(AuthProviderContext);

export const AuthProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [provider, setProvider] = useState<string | null>(null);

  // useEffect(() => {
  //   setProvider("standard");
  // }, []);

  return (
    <AuthProviderContext.Provider value={{ provider, setProvider }}>
      {children}
    </AuthProviderContext.Provider>
  );
};
