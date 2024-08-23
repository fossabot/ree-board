"use client";

import React, { useState } from "react";
import { addPost, removePost } from "@/lib/signal/postSignals";
import { PostType } from "@/db/schema";
import { createPost } from "@/lib/db/post";
import { PlusIcon } from "@heroicons/react/24/outline";
import { useAddPostForm } from "@/components/board/BoardProvider";

interface AddPostFormProps {
  postType: PostType;
  boardID: string;
}

export default function AddPostForm({ postType, boardID }: AddPostFormProps) {
  const { openFormId, setOpenFormId } = useAddPostForm();
  const [content, setContent] = useState("");

  const formId = `${boardID}-${postType}`;
  const isAdding = openFormId === formId;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    const newPost = {
      id: Date.now(),
      content,
      type: postType,
    };

    addPost(newPost);

    try {
      const createdPost = await createPost({
        content,
        type: postType,
      });
      addPost(createdPost);
    } catch (error) {
      console.error("Failed to add post:", error);
    }

    setContent("");
  };

  if (!isAdding) {
    return (
      <button
        onClick={() => setOpenFormId(formId)}
        className="flex items-center justify-center w-full p-2 text-gray-600 hover:bg-gray-200 rounded-md transition-colors duration-200 ease-in-out"
      >
        <PlusIcon className="h-5 w-5 mr-2" />
        <span>Add a post</span>
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-2 bg-white p-2 rounded-md shadow-md transition-all duration-200 ease-in-out"
    >
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter a title for this card..."
        className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 resize-none"
        rows={3}
      />
      <div className="mt-2 flex items-center">
        <button
          type="submit"
          className="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors duration-200 ease-in-out"
        >
          Add Card
        </button>
        <button
          type="button"
          onClick={() => setOpenFormId("")}
          className="ml-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 ease-in-out"
        >
          ✕
        </button>
      </div>
    </form>
  );
}
