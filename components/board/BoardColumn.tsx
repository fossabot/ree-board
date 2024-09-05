"use client"

import React, { useEffect } from "react";
import { postSignal, postSignalInitial } from "@/lib/signal/postSignals";
import AddPostForm from "@/components/board/AddPostForm";
import type { PostType } from "@/db/schema";
import PostCard from "./PostCard";
import { useSignals } from "@preact/signals-react/runtime";

export default function BoardColumn({
  boardID,
  title,
  postType,
}: {
  boardID: string;
  title: string;
  postType: PostType;
}) {
  useSignals();

  useEffect(() => {
    if(postSignal.value.length === 0) {
      postSignalInitial(boardID);
    }
  }, [boardID])

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
