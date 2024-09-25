"use client";

import AddPostForm from "@/components/board/AddPostForm";
import type { PostType } from "@/db/schema";
import { authenticatedDeletePost, authenticatedUpdatePostContent } from "@/lib/actions/authenticatedDBActions";
import { postSignal, removePost, updatePost } from "@/lib/signal/postSignals";
import { toast } from "@/lib/signal/toastSignals";
import { useSignals } from "@preact/signals-react/runtime";
import PostCard from "./PostCard";

interface BoardColumnProps {
  boardID: string;
  title: string;
  postType: PostType;
  viewOnly?: boolean;
}

export default function BoardColumn({
  boardID,
  title,
  postType,
  viewOnly = false,
}: BoardColumnProps) {
  useSignals();

  const handlePostDelete = async (id: string) => {
    try {
      await authenticatedDeletePost(id);
      removePost(id);
    } catch (error) {
      toast.error("Failed to delete post");
      console.error("Failed to delete post:", error);
    }
  };

  const handlePostUpdate = async (id: string, newContent: string) => {
    try {
      await authenticatedUpdatePostContent(id, newContent);
      updatePost({ id, content: newContent  });
    } catch (error) {
      toast.error("Failed to update post");
      console.error("Failed to update post:", error);
    }
  }

  return (
    <div className="h-[calc(100vh-4rem)] w-0.25 flex flex-col bg-gray-100 rounded-lg shadow-md mx-2">
      <h3 className="font-bold text-lg p-3 bg-gray-200 rounded-t-lg">
        {title}
      </h3>
      <div className="flex-grow overflow-y-auto p-2 gap-2">
        <AddPostForm postType={postType} boardID={boardID} />
        {postSignal.value
          .filter((post) => post.type === postType)
          .map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              type={post.type}
              initialContent={post.content}
              onDelete={viewOnly ? undefined : () => handlePostDelete(post.id)}
              viewOnly={viewOnly}
              onUpdate={handlePostUpdate}
            />
          ))}
      </div>
    </div>
  );
}
