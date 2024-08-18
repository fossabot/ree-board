import React from "react";
import { postsSignal } from "@/lib/signal/post";
import AddPostForm from "@/components/AddPostForm";
import { PostType } from "@/db/schema";

export default function BoardSection({
  title,
  postType,
}: {
  title: string;
  postType: PostType;
}) {
  return (
    <div className="h-[calc(100vh-4rem)] w-0.25 flex flex-col bg-gray-100 rounded-lg shadow-md mx-2">
      <h3 className="font-bold text-lg p-3 bg-gray-200 rounded-t-lg">{title}</h3>
      <div className="flex-grow overflow-y-auto p-2">
        {postsSignal.value
          .filter(post => post.type === postType)
          .map(post => (
            <div key={post.id} className="mb-2 bg-white p-2 rounded-lg shadow hover:bg-gray-50 cursor-pointer">
              {post.content}
            </div>
          ))}
        <AddPostForm postType={postType} />
      </div>
    </div>
  );
}
