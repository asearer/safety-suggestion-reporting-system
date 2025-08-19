import React, { createContext, useContext, useState, ReactNode } from "react";

interface AppContextProps {
  user: { id: number; name: string; email: string } | null;
  setUser: (user: { id: number; name: string; email: string } | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<{
    id: number;
    name: string;
    email: string;
  } | null>(null);
  const [token, setToken] = useState<string | null>(null);

  return (
    <AppContext.Provider value={{ user, setUser, token, setToken }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextProps => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
