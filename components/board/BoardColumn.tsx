"use client";

import type { PostType } from "@/db/schema";
import { authenticatedDeletePost } from "@/lib/actions/authenticatedDBActions";
import { postSignal, removePost } from "@/lib/signal/postSignals";
import { toast } from "@/lib/signal/toastSignals";
import { useSignals } from "@preact/signals-react/runtime";
import dynamic from "next/dynamic";
import { Draggable, Droppable } from "react-beautiful-dnd";
import PostCard from "./PostCard";

const AddPostForm = dynamic(() => import("@/components/board/AddPostForm"));

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

  return (
    <div className="w-0.25 flex flex-col bg-gray-100 rounded-sm shadow-md mx-2">
      <h3 className="font-bold text-lg p-3 bg-gray-200 rounded-t-lg">
        {title}
      </h3>
      <div className="flex flex-grow overflow-y-auto p-2 gap-2">
        <AddPostForm postType={postType} boardID={boardID} />
        <Droppable droppableId={boardID}>
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {postSignal.value
                .filter((post) => post.type === postType)
                .map((post, index) => (
                  <Draggable key={post.id} draggableId={post.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <PostCard
                          key={post.id}
                          id={post.id}
                          type={post.type}
                          initialContent={post.content}
                          onDelete={
                            viewOnly
                              ? undefined
                              : () => handlePostDelete(post.id)
                          }
                          viewOnly={viewOnly}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
            </div>
          )}
        </Droppable>
      </div>
    </div>
  );
}
