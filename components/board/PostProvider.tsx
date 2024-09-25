"use client";

import { PostType, type Post } from "@/db/schema";
import { memberSignalInitial } from "@/lib/signal/memberSingals";
import {
  postSignal,
  postSignalInitial,
  updatePost,
} from "@/lib/signal/postSignals";
import { useEffectOnce } from "@/lib/utils/effect";
import React, { createContext, useContext, useState } from "react";
import type { DropResult } from "react-beautiful-dnd";
import { DragDropContext } from "react-beautiful-dnd";
import type { MemberInfo } from "./MemberManageModalComponent";
import { authenticatedUpdatePostType } from "@/lib/actions/authenticatedDBActions";
interface AddPostFormContextType {
  openFormId: string | null;
  setOpenFormId: (id: string | null) => void;
}

interface PostProviderProps {
  children: React.ReactNode;
  initialPosts: Post[];
  initialMembers: MemberInfo[];
}

const AddPostFormContext = createContext<AddPostFormContextType | undefined>(
  undefined
);

export const PostProvider: React.FC<PostProviderProps> = ({
  children,
  initialPosts,
  initialMembers,
}) => {
  const [openFormId, setOpenFormId] = useState<string | null>(null);

  useEffectOnce(() => {
    postSignalInitial(initialPosts);
    memberSignalInitial(initialMembers);
  });

  const handleDnD = async (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    const item = postSignal.value.find(
      (post) => post.id === result.draggableId
    );
    if (item) {
      const newType =
        PostType[result.destination.droppableId as keyof typeof PostType];
      if (item.type !== newType) {
        item.type = newType;
        updatePost(item);
        await authenticatedUpdatePostType(item.id, newType);
      }
    }
  };

  return (
    <AddPostFormContext.Provider value={{ openFormId, setOpenFormId }}>
      <DragDropContext onDragEnd={handleDnD}>{children}</DragDropContext>
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
