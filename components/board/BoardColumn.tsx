"use client";

import AddPostForm from "@/components/board/AddPostForm";
import type { PostType } from "@/db/schema";
import { postSignal } from "@/lib/signal/postSignals";
import { useSignals } from "@preact/signals-react/runtime";
import React from "react";
import PostCard from "./PostCard";

interface BoardColumnProps {
  boardID: string;
  title: string;
  postType: PostType;
}

export default function BoardColumn({
  boardID,
  title,
  postType,
}: BoardColumnProps) {
  useSignals();

  return (
    <div className="h-[calc(100vh-4rem)] w-0.25 flex flex-col bg-gray-100 rounded-lg shadow-md mx-2">
      <h3 className="font-bold text-lg p-3 bg-gray-200 rounded-t-lg">
        {title}
      </h3>
      <div className="flex-grow overflow-y-auto p-2">
        <AddPostForm postType={postType} boardID={boardID} />
        {postSignal.value
          .filter((post) => post.type === postType)
          .map((post) => (
            <PostCard key={post.id} content={post.content} />
          ))}
      </div>
    </div>
  );
}
