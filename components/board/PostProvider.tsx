"use client";

import type { Post } from "@/db/schema";
import { postSignalInitial } from "@/lib/signal/postSignals";
import React, { createContext, useContext, useState } from "react";

interface AddPostFormContextType {
  openFormId: string | null;
  setOpenFormId: (id: string | null) => void;
}

interface PostProviderProps {
  children: React.ReactNode;
  initialPosts: Post[];
}

const AddPostFormContext = createContext<AddPostFormContextType | undefined>(
  undefined
);

export const PostProvider: React.FC<PostProviderProps> = ({
  children,
  initialPosts,
}) => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);

  postSignalInitial(initialPosts);

  return (
    <AddPostFormContext.Provider value={{ openFormId, setOpenFormId }}>
      {children}
    </AddPostFormContext.Provider>
  );
};

export const useAddPostForm = () => {
  const context = useContext(AddPostFormContext);
  if (context === undefined) {
    throw new Error("useAddPostForm must be used within a PostProvider");
  }
  return context;
};
