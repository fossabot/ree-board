import React from "react";
import { postSignal } from "@/lib/signal/postSignals";
import AddPostForm from "@/components/AddPostForm";
import { PostType } from "@/db/schema";
import PostCard from "./PostCard";

export default function BoardSection({
  boardID,
  title,
  postType,
}: {
  boardID: string;
  title: string;
  postType: PostType;
}) {
  return (
    <div className="h-[calc(100vh-4rem)] w-0.25 flex flex-col bg-gray-100 rounded-lg shadow-md mx-2">
      <h3 className="font-bold text-lg p-3 bg-gray-200 rounded-t-lg">
        {title}
      </h3>
      <div className="flex-grow overflow-y-auto p-2">
        <AddPostForm postType={postType} boardID={boardID}/>
        {postSignal.value
          .filter((post) => post.type === postType)
          .map((post) => (
            <PostCard
              key={0}
              postContent={post.content}
            />
          ))}
      </div>
    </div>
  );
}
