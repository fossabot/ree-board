"use client";

import AddPostForm from "@/components/board/AddPostForm";
import type { PostType } from "@/db/schema";
import {
  authenticatedDeletePost,
  authenticatedUpdatePostContent,
} from "@/lib/actions/authenticatedDBActions";
import { postSignal, removePost, updatePost } from "@/lib/signal/postSignals";
import { toast } from "@/lib/signal/toastSignals";
import { useSignals } from "@preact/signals-react/runtime";
import { AnimatePresence, motion } from "framer-motion";
import { useRef } from "react";
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
  const columnRef = useRef<HTMLDivElement>(null);

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
      updatePost({ id, content: newContent });
    } catch (error) {
      toast.error("Failed to update post");
      console.error("Failed to update post:", error);
    }
  };

  return (
    <div className="w-full flex flex-col bg-gray-50 rounded-lg shadow-md mx-2">
      <div className="bg-gray-100 rounded-t-lg p-4">
        <h3 className="font-bold text-xl text-center mb-4">{title}</h3>
        {!viewOnly && (
          <AddPostForm postType={postType} boardID={boardID} />
        )}
      </div>
      <div ref={columnRef} className="flex-grow overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {postSignal.value
            .filter((post) => post.type === postType)
            .map((post) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <PostCard
                  id={post.id}
                  type={post.type}
                  initialContent={post.content}
                  onDelete={viewOnly ? undefined : () => handlePostDelete(post.id)}
                  viewOnly={viewOnly}
                  onUpdate={handlePostUpdate}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
