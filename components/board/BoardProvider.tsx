"use client";

import React, { createContext, useState, useContext } from "react";

interface AddPostFormContextType {
  openFormId: string | null;
  setOpenFormId: (id: string | null) => void;
}

const AddPostFormContext = createContext<AddPostFormContextType | undefined>(
  undefined
);

export const BoardProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);

  return (
    <AddPostFormContext.Provider value={{ openFormId, setOpenFormId }}>
      {children}
    </AddPostFormContext.Provider>
  );
};

export const useAddPostForm = () => {
  const context = useContext(AddPostFormContext);
  if (context === undefined) {
    throw new Error("useAddPostForm must be used within a BoardProvider");
  }
  return context;
};
