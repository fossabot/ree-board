"use client";

import { useContext, useState, createContext } from "react";

interface AnonymousModeContextType {
  isAnonymous: boolean;
  setIsAnonymous: (value: boolean) => void;
}

const AnonymousModeContext = createContext<
  AnonymousModeContextType | undefined
>(undefined);

export const useAnonymousMode = () => {
  const context = useContext(AnonymousModeContext);
  if (context === undefined) {
    throw new Error(
      "useAnonymousMode must be used within a AnonymousModeProvider"
    );
  }
  return context;
};

export const AnonymousModeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isAnonymous, setIsAnonymous] = useState(false);
  return (
    <AnonymousModeContext.Provider value={{ isAnonymous, setIsAnonymous }}>
      {children}
    </AnonymousModeContext.Provider>
  );
};
